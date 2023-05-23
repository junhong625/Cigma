package com.cigma.cigma.dto.response;

import com.cigma.cigma.entity.Team;
import com.cigma.cigma.properties.ImageProperties;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Slf4j
public class TeamGetResponse {
    private Long teamIdx;
    private String teamLeader;
    private String teamName;
    private String[] members;
    private String teamImageUrl;

    public TeamGetResponse(Team team) {
        teamIdx = team.getTeamIdx();
        teamLeader = team.getTeamLeader().getUserEmail();
        teamName = team.getTeamName();
        members = team.getMembers().replaceAll("[\\[\\] \"]", "").split(",");
        teamImageUrl = team.getTeamImageUrl();
    }
}
