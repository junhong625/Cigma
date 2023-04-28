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

@Table(name = "User")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
//    유저 index : Primary Key, Auto Increment
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_idx")
    private Long userIdx;

//    유저 이름 : max length 10, not null
    @Column(name = "user_name", length = 10, nullable = false)
    private String userName;

//    유저 이메일(아이디) : max length 50, not null
    @Column(name = "user_email", length = 50, nullable = false)
    private String userEmail;

//    유저 비밀번호 : not null
    @Column(name = "user_pass", nullable = false)
    private String userPass;

//    유저 역할
//    무료 계정: 0, 유료 계정: 1, 관리자 계정: 2
    @Column(name = "is_admin", columnDefinition = "TINYINT", length = 1, insertable = false)
    @ColumnDefault("0")
    private int isAdmin;

//    생성 시간
    @CreationTimestamp
    @Column(name = "create_time")
    private Timestamp createTime;

//    수정 시간
    @UpdateTimestamp
    @Column(name = "update_time")
    private Timestamp updateTime;

}
