package com.cigma.cigma.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
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

//    생성 시간
    @CreationTimestamp
    @Column(name = "create_time")
    private Timestamp createTime;

//    수정 시간
    @UpdateTimestamp
    @Column(name = "update_time")
    private Timestamp updateTime;

}
