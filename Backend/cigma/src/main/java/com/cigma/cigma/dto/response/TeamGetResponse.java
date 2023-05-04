package com.cigma.cigma.dto.response;

import com.cigma.cigma.entity.Team;
import lombok.Data;

@Data
public class TeamGetResponse {
    private Long teamIdx;
    private String teamLeader;
    private String teamName;
    private String[] teamMate;

    public TeamGetResponse(Team team) {
        teamIdx = team.getTeamIdx();
        teamLeader = team.getTeamLeader().getUserEmail();
        teamName = team.getTeamName();
        teamMate = team.getMembers().replaceAll("[\\[\\]\\ ]", "").split(",");
    }
}
