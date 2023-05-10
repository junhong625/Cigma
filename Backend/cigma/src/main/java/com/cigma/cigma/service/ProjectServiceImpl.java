package com.cigma.cigma.service;

import com.cigma.cigma.common.SecurityUtils;
import com.cigma.cigma.dto.request.ProjectCreateRequest;
import com.cigma.cigma.dto.request.ProjectPatchRequest;
import com.cigma.cigma.dto.response.ProjectGetResponse;
import com.cigma.cigma.entity.Project;
import com.cigma.cigma.entity.Team;
import com.cigma.cigma.handler.customException.ProjectNotFoundException;
import com.cigma.cigma.handler.customException.TeamNotFoundException;
import com.cigma.cigma.jwt.UserPrincipal;
import com.cigma.cigma.properties.ImageProperties;
import com.cigma.cigma.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
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
    public ProjectGetResponse changeName(Long pjtIdx, ProjectPatchRequest projectPatchRequest) throws ProjectNotFoundException {
        String projectName = projectPatchRequest.getProjectName();
        try {
            projectPatchRequest = new ProjectPatchRequest(projectRepository.findById(pjtIdx).get());
        } catch (Exception e) {
            throw new ProjectNotFoundException("존재하진 않는 팀입니다.");
        }
        projectPatchRequest.setProjectName(projectName);
        return new ProjectGetResponse(projectRepository.save(projectPatchRequest.toEntity()));
    }

    @Override
    public ProjectGetResponse changeImage(Long pjtIdx, ProjectPatchRequest projectPatchRequest) throws ProjectNotFoundException {
        MultipartFile projectImage = projectPatchRequest.getProjectImage();
        try {
            projectPatchRequest = new ProjectPatchRequest(projectRepository.findById(pjtIdx).get());
        } catch (Exception e) {
            throw new ProjectNotFoundException("존재하진 않는 팀입니다.");
        }
        projectPatchRequest.setProjectImageUrl(s3Service.save(projectImage, "project", pjtIdx));
        return new ProjectGetResponse(projectRepository.save(projectPatchRequest.toEntity()));
    }

    @Override
    public ProjectGetResponse getProject(Long pjtIdx) throws TeamNotFoundException {
        ProjectGetResponse projectGetResponse = new ProjectGetResponse(projectRepository.findById(pjtIdx).get());
        // 해당 프로젝트를 조회할 권한이 있는지 체크
        teamService.checkAuthorization(projectGetResponse.getTeamIdx());
        return projectGetResponse;
    }

    @Override
    public ProjectGetResponse save(ProjectCreateRequest projectCreateRequest) throws TeamNotFoundException {
        // 유저가 팀장인지 권한 체크
        Long teamIdx = projectCreateRequest.getTeamIdx();
        teamService.checkAuthorization(teamIdx);
        Team team = teamService.findTeam(teamIdx);
        String projectName = projectCreateRequest.getProjectName();
        // 도커 컨테이너 연결 후 연결된 컨테이너에서 실행된 URL 생성 필요
        // port 번호 관리 필요
        // 제외될 port 번호 관리 필요
        String projectUrl = projectCreateRequest.getProjectUrl();
            Project project = new Project(team, "asdasd", projectName, imageProperties.getDefaultPath().getProject());
        return new ProjectGetResponse(projectRepository.save(project));
    }

    @Override
    public Optional<Project> findById(Long id) {
        return projectRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        projectRepository.deleteById(id);
    }
}
