package com.cigma.cigma.controller;

import com.cigma.cigma.common.CustomResponseEntity;
import com.cigma.cigma.common.SecurityUtils;
import com.cigma.cigma.dto.request.TeamMateRequest;
import com.cigma.cigma.dto.request.TeamUpdateRequest;
import com.cigma.cigma.dto.request.TeamMembersRequest;
import com.cigma.cigma.dto.request.TeamPatchRequest;
import com.cigma.cigma.entity.Team;
import com.cigma.cigma.entity.User;
import com.cigma.cigma.handler.ResponseHandler;
import com.cigma.cigma.jwt.UserPrincipal;
import com.cigma.cigma.service.TeamServiceImpl;
import com.cigma.cigma.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
@Slf4j
public class TeamController {
    private final UserServiceImpl userService;
    private final TeamServiceImpl teamService;


    // 팀생성
    @PostMapping()
    public CustomResponseEntity<? extends Object> createTeam(@RequestBody TeamUpdateRequest teamUpdateRequest) throws Exception {
        // 팀명 중복 체크
        teamService.checkDuplicate(teamUpdateRequest.getTeamName());
        try {
            return ResponseHandler.generateResponse(true, "팀생성 성공", HttpStatus.CREATED, teamService.createTeam(teamUpdateRequest));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse(false, "팀생성 실패", HttpStatus.BAD_REQUEST, null);
        }
    }

    // 팀삭제
    @DeleteMapping("/{id}")
    public CustomResponseEntity<? extends Object> deleteTeam(@PathVariable("id") Long teamIdx) throws IOException {
        try {
            UserPrincipal userPrincipal = SecurityUtils.getUserPrincipal();
            Optional<User> user = userService.findById(userPrincipal.getUserIdx());

            log.info(userPrincipal.getUserEmail() + " " + userPrincipal.getPassword() + " " + userPrincipal.getUserIdx());

            if (user.isPresent()) {
                Optional<Team> team = teamService.findById(teamIdx);

                if (user.get() == team.get().getTeamLeader()) {  // 삭제하려는 사람이 팀리더면
                    teamService.deleteById(teamIdx);  // 삭제
                    return ResponseHandler.generateResponse(true, "팀삭제 성공", HttpStatus.OK, null);
                } else {  // 삭제하려는 사람이 리더가 아니면
                    return ResponseHandler.generateResponse(false, "삭제 권한 없음", HttpStatus.UNAUTHORIZED, null);
                }
            } else {  // 존재하지 않는 유저
                return ResponseHandler.generateResponse(false, "존재하지 않는 사용자입니다", HttpStatus.BAD_REQUEST, null);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse(false, "팀삭제 실패", HttpStatus.BAD_REQUEST, null);
        }
    }

    // 팀 정보 수정(이름, 사진)
    @PatchMapping("/{id}")
    public CustomResponseEntity<Object> changeTeamInfo(@PathVariable("id") Long teamIdx, @ModelAttribute TeamUpdateRequest teamUpdateRequest) throws Exception {
        User user = userService.getUserBySecurity();
        Team team = teamService.findTeam(teamIdx);

        if (user.getUserIdx() == team.getTeamLeader().getUserIdx()) {
            if (teamUpdateRequest.getTeamName() != null && !teamUpdateRequest.getTeamName().isBlank()) {
                // 팀명 중복 체크
                teamService.checkDuplicate(teamUpdateRequest.getTeamName());
                return ResponseHandler.generateResponse(true, "팀명 변경 성공", HttpStatus.OK, teamService.changeName(team, teamUpdateRequest.getTeamName()));
            } else if (teamUpdateRequest.getTeamImage() != null && !teamUpdateRequest.getTeamImage().getContentType().isBlank()) {
                return ResponseHandler.generateResponse(true, "팀사진 변경 성공", HttpStatus.OK, teamService.changeImage(team, teamUpdateRequest.getTeamImage()));
            }
        } else {
            throw new AuthorizationServiceException("권한이 없는 유저입니다.");
        }
        throw new IOException("변경사항이 없습니다.");
    }

    // 팀 정보 조회
    @GetMapping("/{id}")
    public CustomResponseEntity<Object> getTeam(@PathVariable("id") Long teamIdx) {
        try {
            return ResponseHandler.generateResponse(true, "조회 성공", HttpStatus.OK, teamService.getTeam(teamIdx));
        } catch (Exception e) {
            return ResponseHandler.generateResponse(false, "조회 실패", HttpStatus.BAD_REQUEST, null);
        }
    }

    // 팀원 추가
    @PatchMapping("/{id}/add")
    public CustomResponseEntity<Object> addMembers(@PathVariable("id") Long teamIdx, @RequestBody TeamMateRequest teamMateRequest) throws Exception {
        return ResponseHandler.generateResponse(true, "추가 성공", HttpStatus.OK, teamService.addTeamMate(teamIdx, teamMateRequest));
    }

    // 팀원 삭제
    @PatchMapping("/{id}/pop")
    public CustomResponseEntity<Object> popMembers(@PathVariable("id") Long teamIdx, @RequestBody TeamMateRequest teamMateRequest) throws Exception {
        return ResponseHandler.generateResponse(true, "삭제 성공", HttpStatus.OK, teamService.popTeamMate(teamIdx, teamMateRequest));
    }

    // 팀에 속한 프로젝트 모두 조회
    @GetMapping("/project/{id}")
    public CustomResponseEntity<? extends Object> getMyTeamProject(@PathVariable("id") Long teamIdx) {
        return ResponseHandler.generateResponse(true, "팀 프로젝트 모두 조회", HttpStatus.OK, teamService.getMyTeamProjects(teamIdx));
    }
}
