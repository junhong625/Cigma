package com.cigma.cigma.dto.request;

import com.cigma.cigma.entity.User;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Data
public class UserCreateRequest {
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private String userEmail;
    private String userPass;
    private String userName;

    public User toEntity() {
        return User
                .builder()
                .userEmail(userEmail)
                .userPass(passwordEncoder.encode(userPass))
                .userName(userName)
                .build();
    }
}
