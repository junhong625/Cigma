package com.cigma.cigma.service;

import com.cigma.cigma.dto.request.UserCreateRequest;
import com.cigma.cigma.dto.request.UserLoginRequest;
import com.cigma.cigma.dto.response.UserCreateResponse;
import com.cigma.cigma.dto.response.UserLoginResponse;

public interface UserService {
    // 회원가입
    UserCreateResponse signUp(UserCreateRequest userCreateRequest);

    // 로그인
    UserLoginResponse login(UserLoginRequest userLoginRequest);

    // 로그아웃
    void logout(String accessToken);
}
