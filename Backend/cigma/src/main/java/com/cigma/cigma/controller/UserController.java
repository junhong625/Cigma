package com.cigma.cigma.controller;

import com.cigma.cigma.dto.request.UserLoginRequest;
import com.cigma.cigma.handler.ResponseHandler;
import com.cigma.cigma.dto.request.UserCreateRequest;
import com.cigma.cigma.service.UserService;
import com.cigma.cigma.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserServiceImpl userService;

    /*
    회원가입
    ============ parameter ============

    userEmail : 이메일(아이디)
    userPass : 비밀번호
    userName : 이름

    ============= response =============

    성공 : {userIdx : ?,
           userEmail : ???,
           userName : ???}
    실패 : {data : null}

    ====================================
     */
    @PostMapping()
    public ResponseEntity<Object> signUp(@RequestBody UserCreateRequest userCreateRequest) {
        try {
            return ResponseHandler.generateResponse(true, "회원가입 성공", HttpStatus.CREATED, userService.signUp(userCreateRequest));
        } catch (Exception e) {
            return ResponseHandler.generateResponse(false, "이미 등록된 이메일입니다.", HttpStatus.BAD_REQUEST, null);
        }
    }

    /*
    로그인
    ============ parameter ============

    userEmail : 이메일(아이디)
    userPass : 비밀번호

    ============= response =============

    성공 : {accessToken : ???,
           refreshToken : ???}
    실패 : {data : null}

    ====================================
     */
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody UserLoginRequest userLoginRequest) {
        try {
            return ResponseHandler.generateResponse(true, "로그인 성공", HttpStatus.OK, userService.login(userLoginRequest));
        } catch (Exception e) {
            return ResponseHandler.generateResponse(false, "존재하지 않는 이메일이거나 비밀번호가 틀렸습니다.", HttpStatus.BAD_REQUEST, null);
        }
    }
}
