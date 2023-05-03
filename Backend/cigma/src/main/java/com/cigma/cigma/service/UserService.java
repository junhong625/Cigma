package com.cigma.cigma.service;

import com.cigma.cigma.dto.request.UserCreateRequest;
import com.cigma.cigma.dto.request.UserLoginRequest;
import com.cigma.cigma.dto.response.UserCreateResponse;
import com.cigma.cigma.dto.response.UserGetResponse;
import com.cigma.cigma.dto.response.UserLoginResponse;
import com.cigma.cigma.entity.User;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

public interface UserService {
    // 회원가입
    UserCreateResponse signUp(UserCreateRequest userCreateRequest);

    // 로그인
    UserLoginResponse login(UserLoginRequest userLoginRequest);

    // 로그아웃
    void logout(HttpServletRequest request) throws Exception;

    // 회원탈퇴
    void delete(HttpServletRequest request) throws Exception;

    // 비밀번호 변경
    UserCreateResponse changePassword(String password);

    // 이름 변경
    UserCreateResponse changeName(String name);

    Optional<User> findById(Long id);

    UserGetResponse getUser();
}
