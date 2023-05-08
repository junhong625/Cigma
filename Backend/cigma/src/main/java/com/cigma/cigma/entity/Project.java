package com.cigma.cigma.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Table(name = "Project")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Project {
    //    프로젝트 index : Primary Key, Auto Increment
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_idx")
    private Long projectIdx;

    //    팀 : Team, not null
    @ManyToOne
    @JoinColumn(name = "team_idx", nullable = false)
    private Team team;

    //    프로젝트 경로 : varchar(255), not null
    @Column(name = "project_url", nullable = false)
    private String projectUrl;

    @Column(name = "project_name", length = 100, nullable = false)
    private String projectName;

    //    생성 시간
    @CreationTimestamp
    @Column(name = "create_time")
    private Timestamp createTime;

    //    수정 시간
    @UpdateTimestamp
    @Column(name = "update_time")
    private Timestamp updateTime;

    //    팀이미지 : varchar(255)
    @Column(name = "project_image_url")
    private String projectImageUrl;

    @Builder
    public Project(Team team, String projectUrl, String projectName, String projectImageUrl) {
        this.team = team;
        this.projectUrl = projectUrl;
        this.projectName = projectName;
        this.projectImageUrl = projectImageUrl;
    }
}
