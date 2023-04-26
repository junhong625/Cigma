package com.cigma.cigma.service;

import com.cigma.cigma.dto.request.UserLoginRequest;
import com.cigma.cigma.dto.response.UserLoginResponse;
import com.cigma.cigma.jwt.TokenProvider;
import com.cigma.cigma.repository.UserRepository;
import com.cigma.cigma.dto.request.UserCreateRequest;
import com.cigma.cigma.dto.response.UserCreateResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;

    @Override
    public UserCreateResponse signUp(UserCreateRequest userCreateRequest) {

        // email(아이디) 유일성 검사
        if (userRepository.findByUserEmail(userCreateRequest.getUserEmail()).isPresent()) {
            throw new RuntimeException("이미 등록된 email 입니다.");
        }
        // 등록되지 않은 이메일일 경우 회원가입 진행
        return new UserCreateResponse(userRepository.save(userCreateRequest.toEntity()));
    }

    @Override
    public UserLoginResponse login(UserLoginRequest userLoginRequest) {
        // 이메일, 비밀번호로 인증을 위한 authenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userLoginRequest.getUserEmail(), userLoginRequest.getUserPass());
        log.info("login controller ===================================================================================");
        try {
            // authenticationToken을 사용하여 Authentication 객체를 생성하기 위해 authenticate 메소드를 실행할 때
            // CustomUserDetailService에 loadUserByUsername 메소드가 실행되고, authentication 에 해당 정보 저장.
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            log.info("authentication 객체 생성");
            // 인증이 확인 됐으니 JWT 토큰 생성 후 응답
            return new UserLoginResponse(tokenProvider.createToken(authentication));
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
