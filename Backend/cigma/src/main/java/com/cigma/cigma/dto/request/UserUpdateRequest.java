package com.cigma.cigma.dto.request;

import com.cigma.cigma.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequest {
    private Long userIdx;
    private String userEmail;
    private String userName;
    private String userPass;
    private int isAdmin;
    private MultipartFile userImage;
    private String userImageUrl;
    private Timestamp createTime;

    public UserUpdateRequest(User user) {
        userIdx = user.getUserIdx();
        userEmail = user.getUserEmail();
        userName = user.getUserName();
        userPass = user.getUserPass();
        isAdmin = user.getIsAdmin();
        userImageUrl = user.getUserImageUrl();
        createTime = user.getCreateTime();
    }

    public User toEntity() {
        return User.builder()
                .userIdx(userIdx)
                .userEmail(userEmail)
                .userName(userName)
                .userPass(userPass)
                .isAdmin(isAdmin)
                .userImageUrl(userImageUrl)
                .createTime(createTime)
                .build();
    }
}
