package com.cigma.cigma.service;

import com.cigma.cigma.dto.request.UserCreateRequest;
import com.cigma.cigma.dto.response.UserCreateResponse;

public interface UserService {
    UserCreateResponse signUp(UserCreateRequest userCreateRequest);
}
