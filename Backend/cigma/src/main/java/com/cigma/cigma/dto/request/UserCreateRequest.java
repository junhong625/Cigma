package com.cigma.cigma.dto.request;

import com.cigma.cigma.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Data
@AllArgsConstructor
public class UserCreateRequest {
    private String userEmail;
    private String userPass;
    private String userName;
    private String userImageUrl;

    public User toEntity() {
        return User
                .builder()
                .userEmail(userEmail)
                .userPass(userPass)
                .userName(userName)
                .userImageUrl(userImageUrl)
                .build();
    }
}
