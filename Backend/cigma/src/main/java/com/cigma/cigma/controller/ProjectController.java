package com.cigma.cigma.controller;

import com.cigma.cigma.common.CustomResponseEntity;
import com.cigma.cigma.common.SecurityUtils;
import com.cigma.cigma.dto.request.ProjectCreateRequest;
import com.cigma.cigma.dto.request.ProjectPatchRequest;
import com.cigma.cigma.entity.Project;
import com.cigma.cigma.entity.Team;
import com.cigma.cigma.entity.User;
import com.cigma.cigma.handler.ResponseHandler;
import com.cigma.cigma.jwt.UserPrincipal;
import com.cigma.cigma.service.ProjectServiceImpl;
import com.cigma.cigma.service.TeamServiceImpl;
import com.cigma.cigma.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/project")
@RequiredArgsConstructor
@Slf4j
public class ProjectController {
    private final ProjectServiceImpl projectService;
    private final TeamServiceImpl teamService;
    private final UserServiceImpl userService;


    // 프로젝트 생성
    @PostMapping()
    public CustomResponseEntity<? extends Object> createProject(HttpServletRequest request, @RequestBody ProjectCreateRequest projectCreateRequest) throws IOException {
        try {
            UserPrincipal userPrincipal = SecurityUtils.getUserPrincipal();
            Optional<User> user = userService.findById(userPrincipal.getUserIdx());

            if(user.isPresent()) {
                String projectName = projectCreateRequest.getProjectName();
                String projectImage = projectCreateRequest.getProjectImage();
                String projectUrl = projectCreateRequest.getProjectUrl();

                Optional<Team> team = teamService.findByTeamLeader(user.get());
                if(!team.isPresent()) {
                    return ResponseHandler.generateResponse(false, "해당 사용자의 팀이 존재하지않습니다", HttpStatus.BAD_REQUEST, null);
                }
                Project project = new Project(team.get(), projectUrl, projectName, projectImage);
                projectService.save(project);
                return ResponseHandler.generateResponse(true, "프로젝트 생성 성공", HttpStatus.CREATED, null);

            } else {  // 존재하지 않는 유저
                return ResponseHandler.generateResponse(false, "존재하지 않는 사용자입니다", HttpStatus.BAD_REQUEST, null);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse(false, "프로젝트 생성 실패", HttpStatus.BAD_REQUEST, null);
        }
    }

    // 프로젝트 삭제
    @DeleteMapping("{id}")
    public CustomResponseEntity<? extends Object> deleteProject(HttpServletRequest request, @PathVariable("id") Long projectIdx) throws IOException {
        try {
            UserPrincipal userPrincipal = SecurityUtils.getUserPrincipal();
            Optional<User> user = userService.findById(userPrincipal.getUserIdx());

            log.info(userPrincipal.getUserEmail() + " " + userPrincipal.getPassword() + " " + userPrincipal.getUserIdx());

            if (user.isPresent()) {
                Optional<Project> project = projectService.findById(projectIdx);
                Team team = project.get().getTeam();
                if (user.get() == team.getTeamLeader()) {  // 삭제하려는 사람이 팀리더면
                    projectService.deleteById(projectIdx);  // 삭제
                    return ResponseHandler.generateResponse(true, "프로젝트삭제 성공", HttpStatus.CREATED, null);
                } else {  // 삭제하려는 사람이 리더가 아니면
                    return ResponseHandler.generateResponse(false, "삭제 권한 없음", HttpStatus.UNAUTHORIZED, null);
                }
            } else {  // 존재하지 않는 유저
                return ResponseHandler.generateResponse(false, "존재하지 않는 사용자입니다", HttpStatus.BAD_REQUEST, null);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse(false, "프로젝트삭제 실패", HttpStatus.BAD_REQUEST, null);
        }
    }

    @PatchMapping("/{id}")
    public CustomResponseEntity<? extends Object> changeProjectName(HttpServletRequest request, @PathVariable("id") Long projectIdx, @RequestBody ProjectPatchRequest projectPatchRequest) throws IOException {
        try {
            UserPrincipal userPrincipal = SecurityUtils.getUserPrincipal();
            Optional<User> user = userService.findById(userPrincipal.getUserIdx());

            if (user.isPresent()) {
                Optional<Project> project = projectService.findById(projectIdx);
                Team team = project.get().getTeam();
                if (user.get() == team.getTeamLeader()) {  // 변경하려는 사람이 팀리더면
                    project.get().setProjectName(projectPatchRequest.getProjectName());
                    projectService.save(project.get());
                    return ResponseHandler.generateResponse(true, "플젝이름 변경 성공", HttpStatus.CREATED, null);
                } else {  // 변경하려는 사람이 리더가 아니면
                    return ResponseHandler.generateResponse(false, "변경 권한 없음", HttpStatus.UNAUTHORIZED, null);
                }
            } else {  // 존재하지 않는 유저
                return ResponseHandler.generateResponse(false, "존재하지 않는 사용자입니다", HttpStatus.BAD_REQUEST, null);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse(false, "플젝이름변경 실패", HttpStatus.BAD_REQUEST, null);
        }
    }

}
