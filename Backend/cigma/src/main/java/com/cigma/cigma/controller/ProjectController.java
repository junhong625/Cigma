package com.cigma.cigma.controller;

import com.cigma.cigma.common.CustomResponseEntity;
import com.cigma.cigma.common.SecurityUtils;
import com.cigma.cigma.dto.request.ProjectCreateRequest;
import com.cigma.cigma.dto.request.ProjectPatchRequest;
import com.cigma.cigma.entity.Project;
import com.cigma.cigma.entity.Team;
import com.cigma.cigma.entity.User;
import com.cigma.cigma.handler.ResponseHandler;
import com.cigma.cigma.handler.customException.ProjectNotFoundException;
import com.cigma.cigma.handler.customException.TeamNotFoundException;
import com.cigma.cigma.jwt.UserPrincipal;
import com.cigma.cigma.properties.ImageProperties;
import com.cigma.cigma.repository.ProjectRepository;
import com.cigma.cigma.service.ProjectServiceImpl;
import com.cigma.cigma.service.TeamServiceImpl;
import com.cigma.cigma.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.awt.*;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/project")
@RequiredArgsConstructor
@Slf4j
public class ProjectController {
    private final ProjectServiceImpl projectService;

    // 프로젝트 생성
    @PostMapping()
    public CustomResponseEntity<? extends Object> createProject(@RequestBody ProjectCreateRequest projectCreateRequest) throws Exception {
        return ResponseHandler.generateResponse(true, "프로젝트 생성 성공", HttpStatus.CREATED, projectService.save(projectCreateRequest));
    }

    // 프로젝트 삭제
    @DeleteMapping("{id}")
    public CustomResponseEntity<? extends Object> deleteProject(@PathVariable("id") Long projectIdx) throws Exception {
        projectService.deleteById(projectIdx);
        return ResponseHandler.generateResponse(true, "프로젝트 삭제", HttpStatus.OK, null);
    }

    // 프로젝트 이름 수정
    @PatchMapping("/{id}")
    public CustomResponseEntity<? extends Object> changeProjectName(@PathVariable("id") Long projectIdx, @RequestBody ProjectPatchRequest projectPatchRequest) throws Exception {
        return ResponseHandler.generateResponse(true, "프로젝트 이름 변경", HttpStatus.OK, projectService.changeName(projectIdx, projectPatchRequest));
    }

    // 프로젝트 사진 수정
    @PatchMapping("/{id}/image")
    public CustomResponseEntity<? extends Object> changeProjectImage(@PathVariable("id") Long projectIdx, @RequestBody ProjectPatchRequest projectPatchRequest) throws Exception {
        return ResponseHandler.generateResponse(true, "프로젝트 사진 변경", HttpStatus.OK, projectService.changeImage(projectIdx, projectPatchRequest));
    }

    // 프로젝트 조회
    @GetMapping("/{id}")
    public CustomResponseEntity<? extends Object> getProject(@PathVariable("id") Long projectIdx) throws TeamNotFoundException {
        return ResponseHandler.generateResponse(true, "프로젝트 조회", HttpStatus.OK, projectService.getProject(projectIdx));
    }

    // 프로젝트 휴지통에 넣기
    @PatchMapping("/{id}/trash")
    public CustomResponseEntity<? extends Object> insertTrashCan(@PathVariable("id") Long projectIdx) throws Exception {
        projectService.insertTrashCan(projectIdx);
        return ResponseHandler.generateResponse(true, "프로젝트 조회", HttpStatus.OK, null);
    }

    // 프로젝트 복원하기
    @PatchMapping("/{id}/restore")
    public CustomResponseEntity<? extends Object> restoreProject(@PathVariable("id") Long projectIdx) throws Exception {
        projectService.restoreProject(projectIdx);
        return ResponseHandler.generateResponse(true, "프로젝트 조회", HttpStatus.OK, null);
    }
}
