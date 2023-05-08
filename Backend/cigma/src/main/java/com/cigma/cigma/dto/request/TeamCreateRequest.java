package com.cigma.cigma.dto.request;

import com.cigma.cigma.entity.Team;
import com.cigma.cigma.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;

@Data
@AllArgsConstructor
public class TeamCreateRequest {
    private Long teamIdx;
    private User teamLeader;
    private String members;
    private String teamName;
    private String teamImageUrl;

    public TeamCreateRequest(Team team) {
        teamIdx = team.getTeamIdx();
        teamLeader = team.getTeamLeader();
        members = team.getMembers();
        teamName = team.getTeamName();
    }

    public Team toEntity() {
        return Team.builder()
                .teamIdx(teamIdx)
                .teamLeader(teamLeader)
                .members(members)
                .teamName(teamName)
                .build();
    }
}
