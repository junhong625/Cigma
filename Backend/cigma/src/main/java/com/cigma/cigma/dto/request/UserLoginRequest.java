package com.cigma.cigma.dto.request;

import lombok.Data;

@Data
public class UserLoginRequest {
    private String userEmail;
    private String userPass;
}
