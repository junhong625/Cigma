package com.cigma.cigma.dto.response;

import com.cigma.cigma.entity.User;
import lombok.Builder;
import lombok.Data;

@Data
public class UserCreateResponse {
    private Long userIdx;
    private String userEmail;
    private String userName;

    @Builder
    public UserCreateResponse(User user) {
        this.userIdx = user.getUserIdx();
        this.userEmail = user.getUserEmail();
        this.userName = user.getUserName();
    }
}
