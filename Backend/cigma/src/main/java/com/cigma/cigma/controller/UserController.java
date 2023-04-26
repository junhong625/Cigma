package com.cigma.cigma.controller;

import com.cigma.cigma.handler.ResponseHandler;
import com.cigma.cigma.dto.request.UserCreateRequest;
import com.cigma.cigma.service.UserService;
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

    private final UserService userService;

    @PostMapping()
    public ResponseEntity<Object> signUp(@ModelAttribute UserCreateRequest userCreateRequest) {
        try {
            return ResponseHandler.generateResponse(true, "Create", HttpStatus.CREATED, userService.signUp(userCreateRequest));
        } catch (Exception e) {
            return ResponseHandler.generateResponse(false, "Exist Email", HttpStatus.BAD_REQUEST, "이미 등록된 이메일입니다.");
        }
    }
}
