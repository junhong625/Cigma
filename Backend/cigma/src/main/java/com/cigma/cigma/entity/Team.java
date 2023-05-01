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
    @Column(name = "team_mate", length = 100)
    private String teamMate;

    //    팀이름 : not null
    @Column(name = "team_name", length = 30, nullable = false)
    private String teamName;

    //    팀이미지 :
    @Column(name = "team_image", length = 255)
    private String teamImage;

    @Builder
    public Team(User teamLeader, String teamMate, String teamName, String teamImage) {
        this.teamLeader = teamLeader;
        this.teamMate = teamMate;
        this.teamName = teamName;
        this.teamImage = teamImage;
    }

}
