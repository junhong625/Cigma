package com.cigma.cigma.dto.request;

import com.cigma.cigma.entity.Team;
import com.cigma.cigma.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeamUpdateRequest {
    private Long teamIdx;
    private User teamLeader;
    private String members;
    private String teamName;
    private MultipartFile teamImage;
    private String teamImageUrl;

    public TeamUpdateRequest(Team team) {
        teamIdx = team.getTeamIdx();
        teamLeader = team.getTeamLeader();
        members = team.getMembers();
        teamName = team.getTeamName();
        teamImageUrl = team.getTeamImageUrl();
    }

    public Team toEntity() {
        return Team.builder()
                .teamIdx(teamIdx)
                .teamLeader(teamLeader)
                .members(members)
                .teamName(teamName)
                .teamImageUrl(teamImageUrl)
                .build();
    }
}
