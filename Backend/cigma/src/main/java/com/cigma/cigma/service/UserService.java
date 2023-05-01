package com.cigma.cigma.service;

import com.cigma.cigma.dto.request.UserCreateRequest;
import com.cigma.cigma.dto.request.UserLoginRequest;
import com.cigma.cigma.dto.response.UserCreateResponse;
import com.cigma.cigma.dto.response.UserGetResponse;
import com.cigma.cigma.dto.response.UserLoginResponse;

import javax.servlet.http.HttpServletRequest;

public interface UserService {
    // 회원가입
    UserCreateResponse signUp(UserCreateRequest userCreateRequest);

    // 로그인
    UserLoginResponse login(UserLoginRequest userLoginRequest);

    // 로그아웃
    void logout(HttpServletRequest request) throws Exception;

    // 회원탈퇴
    void delete(HttpServletRequest request) throws Exception;

    UserGetResponse getUser();
}
