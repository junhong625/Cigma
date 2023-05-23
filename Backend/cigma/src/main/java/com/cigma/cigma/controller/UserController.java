package com.cigma.cigma.controller;

import com.cigma.cigma.common.CustomResponseEntity;
import com.cigma.cigma.dto.request.UserLoginRequest;
import com.cigma.cigma.dto.request.UserUpdateRequest;
import com.cigma.cigma.dto.response.TeamGetResponse;
import com.cigma.cigma.handler.ResponseHandler;
import com.cigma.cigma.dto.request.UserCreateRequest;
import com.cigma.cigma.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

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
    실패 : {isSuccess : false}

    ====================================
     */
    @PostMapping()
    public CustomResponseEntity<Object> signUp(@RequestBody UserCreateRequest userUpdateRequest) {
        try {
            userService.signUp(userUpdateRequest);
            return ResponseHandler.generateResponse(true, "회원가입 성공", HttpStatus.CREATED, null);
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
    실패 : {isSuccess : false}

    ====================================
     */
    @PostMapping("/login")
    public CustomResponseEntity<Object> login(@RequestBody UserLoginRequest userLoginRequest) {
        try {
            return ResponseHandler.generateResponse(true, "로그인 성공", HttpStatus.OK, userService.login(userLoginRequest));
        } catch (Exception e) {
            return ResponseHandler.generateResponse(false, "존재하지 않는 이메일이거나 비밀번호가 틀렸습니다.", HttpStatus.BAD_REQUEST, null);
        }
    }

    /*
    로그아웃
    ============ header ============

    Authorization : bearer {accessToken}
    Refresh : bearer {refreshToken}

    ============= response =============

    성공 : {isSuccess : true}
    실패 : {isSuccess : false}

    ====================================
     */
    @PostMapping("/logout")
    public CustomResponseEntity<Object> logout(HttpServletRequest request) {
        try {
            userService.logout(request);
            return ResponseHandler.generateResponse(true, "로그아웃", HttpStatus.OK, null);
        } catch (Exception e) {
            return ResponseHandler.generateResponse(false, "유효하지 않은 accessToken입니다.", HttpStatus.BAD_REQUEST, null);
        }
    }

    /*
    회원탈퇴
    ============ header ============

    Authorization : bearer {accessToken}
    Refresh : bearer {refreshToken}

    ============= response =============

    성공 : {isSuccess : true}
    실패 : {isSuccess : false}

    ====================================
     */
    @DeleteMapping("/delete")
    public CustomResponseEntity<?> delete(HttpServletRequest request) {
        try {
            userService.delete(request);
            return ResponseHandler.generateResponse(true, "회원탈퇴 완료", HttpStatus.OK, null);
        } catch (Exception e) {
            return ResponseHandler.generateResponse(false, "유효하지 않은 accessToken 입니다.", HttpStatus.BAD_REQUEST, null);
        }
    }

    /*
    회원조회
    ============ header ============

    Authorization : bearer {accessToken}
    Refresh : bearer {refreshToken}

    ============= response =============

    성공 : {isSuccess : true}
    실패 : {isSuccess : false}

    ====================================
     */
    @GetMapping()
    public CustomResponseEntity<?> getUser() {
        try {
            return ResponseHandler.generateResponse(true, "조회 성공", HttpStatus.OK, userService.getUser());
        } catch (Exception e) {
            return ResponseHandler.generateResponse(false, "조회 실패", HttpStatus.BAD_REQUEST, null);
        }
    }

    /*
    유저 정보 변경
    ============ header ============

    Authorization : bearer {accessToken}
    Refresh : bearer {refreshToken}

    ============= response =============

    성공 : {isSuccess : true}
    실패 : {isSuccess : false}

    ====================================
     */
    @PatchMapping
    public CustomResponseEntity<?> changeUserPrincipal(@RequestBody UserUpdateRequest userUpdateRequest) {
        try {
//            log.info("type : " + userUpdateRequest.getUserImage().getContentType());
            // 이름 변경
            if (userUpdateRequest.getUserName() != null && !userUpdateRequest.getUserName().isBlank()) {
                log.info("이름 변경");
                return ResponseHandler.generateResponse(true, "이름 변경 성공", HttpStatus.OK, userService.changeName(userUpdateRequest.getUserName()));
            // 비밀번호 변경
            } else if (userUpdateRequest.getUserPass() != null && !userUpdateRequest.getUserPass().isBlank()) {
                log.info("비밀번호 변경");
                userService.changePassword(userUpdateRequest.getUserPass());
                return ResponseHandler.generateResponse(true, "비밀번호 변경 성공", HttpStatus.OK, null);
            } else {
                throw new IOException("변경사항이 없습니다.");
            }
        } catch (Exception e) {
            return ResponseHandler.generateResponse(false, "변경 실패 : " + e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }

    // 프로필 이미지 변경
    @PatchMapping("/image")
    public CustomResponseEntity<?> changeUserImage(@ModelAttribute UserUpdateRequest userUpdateRequest) {
        // 이미지 변경
        log.info(userUpdateRequest.getUserImage().getName());
        log.info(userUpdateRequest.getUserImage().getContentType());
        if (userUpdateRequest.getUserImage() != null && userUpdateRequest.getUserImage().getContentType().startsWith("image")){
            log.info("이미지 변경");
            return ResponseHandler.generateResponse(true, "이미지 변경 성공", HttpStatus.OK, userService.changeImage(userUpdateRequest.getUserImage()));
        } else {
            return ResponseHandler.generateResponse(false, "변경 실패", HttpStatus.BAD_REQUEST, null);
        }
    }

    // 기본 이미지로 변경
    @DeleteMapping("/image")
    public CustomResponseEntity<?> setDefaultImage() {
        return ResponseHandler.generateResponse(true, "기본 이미지로 변경", HttpStatus.OK, userService.setDefaultImage());
    }

    // 내가 속한 팀 모두 조회
    @GetMapping("/team")
    public ResponseEntity<Object> getMyTeams() {
        return ResponseHandler.generateResponse(true, "내가 속한 팀 모두 조회", HttpStatus.OK, userService.getMyTeams());
    }
}
