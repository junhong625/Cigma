package com.cigma.cigma.service;

import com.cigma.cigma.dto.request.TeamMateRequest;
import com.cigma.cigma.dto.request.TeamCreateRequest;
import com.cigma.cigma.dto.response.TeamGetResponse;
import com.cigma.cigma.entity.Team;
import com.cigma.cigma.entity.User;

import java.util.Optional;

public interface TeamService {
    void save(Team team);

    TeamGetResponse createTeam(TeamCreateRequest teamCreateRequest);

    void deleteById(Long teamIdx);

    Optional<Team> findById(Long teamIdx);

    Optional<Team> findByTeamLeader(User user);

    TeamGetResponse getTeam(Long teamIdx);

    TeamGetResponse addTeamMate(Long teamIdx, TeamMateRequest teamMateRequest) throws Exception;

    TeamGetResponse popTeamMate(Long teamIdx, TeamMateRequest teamMateRequest) throws Exception;
}
