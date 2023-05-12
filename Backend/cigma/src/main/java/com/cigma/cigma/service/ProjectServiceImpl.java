package com.cigma.cigma.service;

import com.cigma.cigma.common.SecurityUtils;
import com.cigma.cigma.dto.request.ProjectCreateRequest;
import com.cigma.cigma.dto.request.ProjectPatchRequest;
import com.cigma.cigma.dto.response.ProjectGetResponse;
import com.cigma.cigma.entity.Project;
import com.cigma.cigma.entity.Team;
import com.cigma.cigma.handler.customException.ProjectExistException;
import com.cigma.cigma.handler.customException.ProjectNotFoundException;
import com.cigma.cigma.handler.customException.TeamNotFoundException;
import com.cigma.cigma.jwt.UserPrincipal;
import com.cigma.cigma.properties.ImageProperties;
import com.cigma.cigma.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectServiceImpl implements ProjectService{
    private final ProjectRepository projectRepository;
    private final TeamServiceImpl teamService;
    private final ImageProperties imageProperties;
    private final S3ServiceImpl s3Service;

    @Override
    public ProjectGetResponse insertTrashCan(Long pjtIdx) throws Exception{
        checkAuthorization(pjtIdx);
        ProjectPatchRequest projectPatchRequest = new ProjectPatchRequest(projectRepository.findById(pjtIdx).get());
        projectPatchRequest.setInTrashCan(true);
        return new ProjectGetResponse(projectRepository.save(projectPatchRequest.toEntity()));
    }

    @Override
    public ProjectGetResponse restoreProject(Long pjtIdx) throws Exception{
        checkAuthorization(pjtIdx);
        ProjectPatchRequest projectPatchRequest = new ProjectPatchRequest(projectRepository.findById(pjtIdx).get());
        projectPatchRequest.setInTrashCan(false);
        return new ProjectGetResponse(projectRepository.save(projectPatchRequest.toEntity()));
    }

    @Override
    public ProjectGetResponse changeName(Long pjtIdx, ProjectPatchRequest projectPatchRequest) throws Exception {
        log.info("권한 체크");
        checkAuthorization(pjtIdx);
        log.info("이름 변경 작업");
        String projectName = projectPatchRequest.getProjectName();
        ProjectPatchRequest request = new ProjectPatchRequest(projectRepository.findById(pjtIdx).get());
        request.setProjectName(projectName);
        log.info("프로젝트 저장");
        return new ProjectGetResponse(projectRepository.save(request.toEntity()));
    }

    @Override
    public ProjectGetResponse changeImage(Long pjtIdx, ProjectPatchRequest projectPatchRequest) throws Exception {
        checkAuthorization(pjtIdx);
        MultipartFile projectImage = projectPatchRequest.getProjectImage();
        ProjectPatchRequest request = new ProjectPatchRequest(projectRepository.findById(pjtIdx).get());
        request.setProjectImageUrl(s3Service.save(projectImage, "project", pjtIdx));
        return new ProjectGetResponse(projectRepository.save(request.toEntity()));
    }

    @Override
    public ProjectGetResponse getProject(Long pjtIdx) throws TeamNotFoundException {
        ProjectGetResponse projectGetResponse = new ProjectGetResponse(projectRepository.findById(pjtIdx).get());
        // 해당 프로젝트를 조회할 권한이 있는지 체크
        teamService.checkAuthorization(projectGetResponse.getTeamIdx());
        return projectGetResponse;
    }

    @Override
    public ProjectGetResponse save(ProjectCreateRequest projectCreateRequest) throws Exception {
        // 권한 체크
        Long teamIdx = projectCreateRequest.getTeamIdx();
        teamService.checkAuthorization(teamIdx);
        // 해당 팀에서 생성한 플젝 존재 여부 체크
        checkExist(teamIdx);
        Team team = teamService.findTeam(teamIdx);
        String projectName = projectCreateRequest.getProjectName();
        // 도커 컨테이너 연결 후 연결된 컨테이너에서 실행된 URL 생성 필요
        // port 번호 관리 필요
        // 제외될 port 번호 관리 필요
        String projectUrl = projectCreateRequest.getProjectUrl();
        Project project = new Project(team, "asdasd", projectName, imageProperties.getDefaultPath().getProject(), false);
        project = projectRepository.save(project);
        return new ProjectGetResponse(project);
    }

    @Override
    public void deleteById(Long id) throws Exception {
        checkAuthorization(id);
        projectRepository.deleteById(id);
    }

    public void checkAuthorization(Long pjtIdx) throws Exception {
        Project project;
        try {
            project = projectRepository.findById(pjtIdx).get();
        } catch (Exception e) {
            throw new ProjectNotFoundException("존재하지 않는 프로젝트입니다.");
        }
        teamService.checkAuthorization(project.getTeam().getTeamIdx());
    }

    // 팀에서 생성한 프로젝트가 있는지 확인
    public void checkExist(Long teamIdx) throws Exception {
        // 팀에서 생성한 프로젝트가 있을 경우
        if (!projectRepository.findAllByTeam_TeamIdx(teamIdx).isEmpty()) {
            throw new ProjectExistException("이미 팀에서 생성한 프로젝트가 존재합니다.");
        }
    }
}
