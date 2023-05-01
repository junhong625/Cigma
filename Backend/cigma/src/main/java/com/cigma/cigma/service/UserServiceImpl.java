package com.cigma.cigma.service;

import com.cigma.cigma.common.SecurityUtils;
import com.cigma.cigma.dto.request.UserLoginRequest;
import com.cigma.cigma.dto.response.UserGetResponse;
import com.cigma.cigma.dto.response.UserLoginResponse;
import com.cigma.cigma.entity.User;
import com.cigma.cigma.jwt.Token;
import com.cigma.cigma.jwt.TokenProvider;
import com.cigma.cigma.jwt.UserPrincipal;
import com.cigma.cigma.properties.JwtProperties;
import com.cigma.cigma.repository.UserRepository;
import com.cigma.cigma.dto.request.UserCreateRequest;
import com.cigma.cigma.dto.response.UserCreateResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
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
        // email 유효성 검사
        checkDuplicateMemberEmail(userCreateRequest.getUserEmail());
        // 등록되지 않은 이메일일 경우 회원가입 진행
        return new UserCreateResponse(userRepository.save(userCreateRequest.toEntity()));
    }

    @Override
    public UserLoginResponse login(UserLoginRequest userLoginRequest) {
        // 이메일, 비밀번호로 인증을 위한 authenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userLoginRequest.getUserEmail(), userLoginRequest.getUserPass());
        log.info("login controller ===================================================================================");
        log.info(userLoginRequest.getUserEmail());
        log.info(userLoginRequest.getUserPass());
        log.info(authenticationToken.getPrincipal().toString());
        log.info(authenticationToken.getCredentials().toString());
        try {
            // authenticationToken을 사용하여 Authentication 객체를 생성하기 위해 authenticate 메소드를 실행할 때
            // CustomUserDetailService에 loadUserByUsername 메소드가 실행되고, authentication 에 해당 정보 저장.
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            log.info("authentication 객체 생성");
            // 인증이 확인 됐으니 JWT 토큰 생성
            Token token = tokenProvider.createToken(authentication);
            Long refreshExpiredTime = jwtProperties.getRefreshTokenValidityInSeconds();
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            // refreshToken redis에 저장
            log.info("======redis에 token 저장 시작======");
            log.info("유저 email : " + userPrincipal.getUserIdx());
            log.info("유저 토큰 : " + token.getRefreshToken());
            log.info("만료 시간 : " + refreshExpiredTime);
            log.info("=====================================");
            redisTemplate.opsForValue().set(userPrincipal.getUserIdx().toString(), token.getRefreshToken(), refreshExpiredTime, TimeUnit.MILLISECONDS);
            log.info("redis에 token 저장 완료");

            return new UserLoginResponse(token);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void logout(HttpServletRequest request) throws Exception {
        UserPrincipal userPrincipal = SecurityUtils.getUserPrincipal();
        try {
            log.info("출력테스트=============================");
            log.info("UserID : " + userPrincipal.getUserIdx());
            if (redisTemplate.opsForValue().get(userPrincipal.getUserIdx().toString()) != null) {
                redisTemplate.delete(userPrincipal.getUserIdx().toString());
                log.info("token 삭제");
            } else {
                log.info("이미 만료된 token 입니다");
            }
            log.info("로그아웃 성공");
            String accessToken = request.getHeader(jwtProperties.getHeader()).substring(7);
            registBlacklist(accessToken);
        } catch (Exception e){
            log.info("비정상적인 접근");
            throw new Exception("유효하지 않은 token입니다.");
        }
    }

    @Override
    public UserGetResponse getUser() {
        UserPrincipal userPrincipal = SecurityUtils.getUserPrincipal();
        Long userIdx = userPrincipal.getUserIdx();
        return new UserGetResponse(userRepository.findById(userIdx).get());
    }

    @Override
    public void delete(HttpServletRequest request) throws Exception {
        log.info("유저 삭제 시작");
        try {
            UserPrincipal userPrincipal = SecurityUtils.getUserPrincipal();
            log.info("사용자 정보 불러오기");
            // 유저 정보 db에서 삭제
            userRepository.deleteById(userPrincipal.getUserIdx());
            log.info("유저 삭제");
            // accessToken 블랙리스트에 등록
            String accessToken = request.getHeader(jwtProperties.getHeader()).substring(7);
            registBlacklist(accessToken);
            log.info("블랙리스트 등록");
            // redis에서 refreshToken 삭제
            redisTemplate.delete(userPrincipal.getUserIdx().toString());
            log.info("유저 토큰 제거");
        } catch (Exception e) {
            throw new Exception("유효하지 않은 token 입니다.");
        }
    }

    // email(아이디) 유일성 검사
    public void checkDuplicateMemberEmail(String email) {
        if (userRepository.findByUserEmail(email).isPresent()) {
            throw new RuntimeException("이미 등록된 email 입니다.");
        }
    }

    public void registBlacklist(String token) {
        Long expiration = tokenProvider.getExpiration(token);
        redisTemplate.opsForValue().set(token, "blacklist", expiration, TimeUnit.MILLISECONDS);
    }
}
