package com.cigma.cigma.service;

import com.cigma.cigma.dto.request.TeamMateRequest;
import com.cigma.cigma.dto.request.TeamUpdateRequest;
import com.cigma.cigma.dto.response.TeamGetResponse;
import com.cigma.cigma.entity.Team;
import com.cigma.cigma.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface TeamService {
    void save(Team team);

    TeamGetResponse createTeam(TeamUpdateRequest teamUpdateRequest);

    void deleteById(Long teamIdx);

    Optional<Team> findById(Long teamIdx);

    Optional<Team> findByTeamLeader(User user);

    TeamGetResponse getTeam(Long teamIdx);

    TeamGetResponse addTeamMate(Long teamIdx, TeamMateRequest teamMateRequest) throws Exception;

    TeamGetResponse popTeamMate(Long teamIdx, TeamMateRequest teamMateRequest) throws Exception;

    TeamGetResponse changeName(Team team, String teamName) throws Exception;

    TeamGetResponse changeImage(Team team, MultipartFile multipartFile) throws Exception;

    boolean checkDuplicate(String teamName) throws Exception;
}
