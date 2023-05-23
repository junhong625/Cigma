package com.cigma.cigma.service;

import com.cigma.cigma.dto.request.TeamMateRequest;
import com.cigma.cigma.dto.request.TeamUpdateRequest;
import com.cigma.cigma.dto.response.ProjectGetResponse;
import com.cigma.cigma.dto.response.TeamGetResponse;
import com.cigma.cigma.entity.Team;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface TeamService {

    TeamGetResponse createTeam(TeamUpdateRequest teamUpdateRequest);

    void deleteById(Long teamIdx);

    Optional<Team> findById(Long teamIdx);

    TeamGetResponse getTeam(Long teamIdx);

    TeamGetResponse addTeamMate(Long teamIdx, TeamMateRequest teamMateRequest) throws Exception;

    TeamGetResponse popTeamMate(Long teamIdx, TeamMateRequest teamMateRequest) throws Exception;

    TeamGetResponse changeName(Team team, String teamName) throws Exception;

    TeamGetResponse changeImage(Team team, MultipartFile multipartFile) throws Exception;

    void checkExist(String teamName) throws Exception;

    List<ProjectGetResponse> getMyTeamProjects(Long teamIdx, Boolean isDrop);
}
