package com.cigma.cigma.dto.response;

import com.cigma.cigma.jwt.Token;
import lombok.Data;

@Data
public class UserLoginResponse {
    private final String accessToken;
    private final String refreshToken;

    public UserLoginResponse(Token token) {
        this.accessToken = token.getAccessToken();
        this.refreshToken = token.getRefreshToken();
    }
}
