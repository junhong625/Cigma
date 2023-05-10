package com.cigma.cigma.dto.request;

import com.cigma.cigma.entity.Project;
import com.cigma.cigma.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectPatchRequest {
    private Long projectIdx;
    private Team team;
    private String projectUrl;
    private String projectName;
    private Timestamp createTime;
    private String projectImageUrl;
    // 변경할 이미지
    private MultipartFile projectImage;

    public ProjectPatchRequest(Project project) {
        this.projectIdx = project.getProjectIdx();
        this.team = project.getTeam();
        this.projectUrl = project.getProjectUrl();
        this.projectName = project.getProjectName();
        this.createTime = project.getCreateTime();
        this.projectImageUrl = project.getProjectImageUrl();
    }

    public Project toEntity() {
        return Project.builder().projectIdx(projectIdx)
                .team(team)
                .projectUrl(projectUrl)
                .projectName(projectName)
                .createTime(createTime)
                .projectImageUrl(projectImageUrl)
                .build();
    }
}
