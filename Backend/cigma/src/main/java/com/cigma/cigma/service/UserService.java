package com.cigma.cigma.service;

import com.cigma.cigma.dto.request.UserCreateRequest;
import com.cigma.cigma.dto.request.UserLoginRequest;
import com.cigma.cigma.dto.response.TeamGetResponse;
import com.cigma.cigma.dto.response.UserGetResponse;
import com.cigma.cigma.dto.response.UserLoginResponse;
import com.cigma.cigma.entity.User;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

public interface UserService {
    // 회원가입
    UserGetResponse signUp(UserCreateRequest userCreateRequest);

    // 로그인
    UserLoginResponse login(UserLoginRequest userLoginRequest);

    // 로그아웃
    void logout(HttpServletRequest request) throws Exception;

    // 회원탈퇴
    void delete(HttpServletRequest request) throws Exception;

    // 비밀번호 변경
    UserGetResponse changePassword(String password);

    // 이름 변경
    UserGetResponse changeName(String name);

    // 이미지 변경
    UserGetResponse changeImage(MultipartFile multipartFile);

    Optional<User> findById(Long id);

    UserGetResponse getUser();

    List<TeamGetResponse> getMyTeams();

    UserGetResponse setDefaultImage();
}
