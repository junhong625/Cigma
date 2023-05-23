package com.cigma.cigma.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Table(name = "Team")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Team {
    //    팀 index : Primary Key, Auto Increment
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_idx")
    private Long teamIdx;

    //    팀 리더 : long, not null
    @ManyToOne
    @JoinColumn(name = "team_leader", nullable = false)
    private User teamLeader;

    //    팀원 : list, not null
    @Column(name = "members", length = 100)
    private String members;

    //    팀이름 : not null
    @Column(name = "team_name", length = 30, nullable = false)
    private String teamName;

    //    팀이미지 :
    @Column(name = "team_image_url", length = 255)
    private String teamImageUrl;

    @Builder
    public Team(User teamLeader, String members, String teamName, String teamImageUrl) {
        this.teamLeader = teamLeader;
        this.members = members;
        this.teamName = teamName;
        this.teamImageUrl = teamImageUrl;
    }

}
