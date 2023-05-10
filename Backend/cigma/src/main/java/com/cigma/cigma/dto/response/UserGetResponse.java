package com.cigma.cigma.dto.response;

import com.cigma.cigma.entity.User;
import lombok.Data;

@Data
public class UserGetResponse {
    private Long userIdx;
    private String userEmail;
    private String userName;
    private String userImageUrl;

    public UserGetResponse(User user) {
        userIdx = user.getUserIdx();
        userEmail = user.getUserEmail();
        userName = user.getUserName();
        userImageUrl = user.getUserImageUrl();
    }
}
