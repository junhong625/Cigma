package com.cigma.cigma.service;

import com.cigma.cigma.dto.request.UserLoginRequest;
import com.cigma.cigma.dto.response.UserLoginResponse;
import com.cigma.cigma.jwt.Token;
import com.cigma.cigma.jwt.TokenProvider;
import com.cigma.cigma.jwt.UserPrincipal;
import com.cigma.cigma.properties.JwtProperties;
import com.cigma.cigma.repository.UserRepository;
import com.cigma.cigma.dto.request.UserCreateRequest;
import com.cigma.cigma.dto.response.UserCreateResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;
    private final JwtProperties jwtProperties;
    private final RedisTemplate redisTemplate;

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
            // 인증이 확인 됐으니 JWT 토큰 생성
            Token token = tokenProvider.createToken(authentication);
            Long refreshExpiredTime = jwtProperties.getRefreshTokenValidityInSeconds();
            // refreshToken redis에 저장
            log.info("======redis에 token 저장 시작======");
            log.info("유저 email : " + authentication.getName().toString());
            log.info("유저 토큰 : " + token.getRefreshToken());
            log.info("만료 시간 : " + refreshExpiredTime);
            log.info("=====================================");
            redisTemplate.opsForValue().set(authentication.getName().toString(), token.getRefreshToken(), refreshExpiredTime, TimeUnit.MILLISECONDS);
            log.info("redis에 token 저장 완료");

            return new UserLoginResponse(token);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void logout(String accessToken) {
        log.info("로그아웃 토큰 확인 : " + !accessToken.isEmpty());
        log.info("token 유효성 검사");
        if (tokenProvider.validateToken(accessToken, "access")) {
            log.info("token 유효성 검사 통과");
            Authentication authentication = tokenProvider.getAuthentication(accessToken);
            log.info("인증 정보 불러오기");
            log.info("redis 내에서 token 조회");
            log.info("출력테스트=============================");
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            log.info("UserID : " + userPrincipal.getUserEmail());
//            if (redisTemplate.opsForValue().get(authentication.getName()) != null) {
//                redisTemplate.delete(authentication.getName());
            if (redisTemplate.opsForValue().get(userPrincipal.getUserEmail()) != null) {
                redisTemplate.delete(userPrincipal.getUserEmail());
                log.info("token 삭제");
            } else {
                log.info("이미 만료된 token 입니다");
            }
        }
        log.info("로그아웃 성공");
        Long expiration = tokenProvider.getExpiration(accessToken);
        redisTemplate.opsForValue().set(accessToken, "logout", expiration, TimeUnit.MILLISECONDS);
    }
}
