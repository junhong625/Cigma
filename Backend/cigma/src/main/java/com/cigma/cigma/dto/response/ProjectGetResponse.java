package com.cigma.cigma.dto.response;

import com.cigma.cigma.entity.Project;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProjectGetResponse {
    private Long projectIdx;
    private Long teamIdx;
    private String projectUrl;
    private String projectName;
    private String projectImageUrl;
    private Boolean inTrashCan;

    public ProjectGetResponse(Project project) {
        this.projectIdx = project.getProjectIdx();
        this.teamIdx = project.getTeam().getTeamIdx();
        this.projectUrl = project.getProjectUrl();
        this.projectName = project.getProjectName();
        this.projectImageUrl = project.getProjectImageUrl();
        this.inTrashCan = project.getInTrashCan().booleanValue();
    }
}
