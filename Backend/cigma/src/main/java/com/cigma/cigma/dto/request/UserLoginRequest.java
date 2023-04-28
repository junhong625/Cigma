package com.cigma.cigma.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserLoginRequest {
    private String userEmail;
    private String userPass;
}
