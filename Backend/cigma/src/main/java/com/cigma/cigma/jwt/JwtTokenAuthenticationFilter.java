package com.cigma.cigma.jwt;

import com.cigma.cigma.handler.JwtResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.SignatureException;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";

    public static final String REFRESH_HEADER = "Refresh";

    private final TokenProvider tokenProvider;
    private final RedisTemplate redisTemplate;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("jwtFilter 진입 : =============================");
        String jwt = resolveAccessToken(request);
        ObjectMapper objectMapper = new ObjectMapper();
        String type = "access";
        log.info("jwt 확인 : " + jwt);
        try {
            // 토큰이 있고 유효한 경우
            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt, "access")) {

                String isBlackList = (String) redisTemplate.opsForValue().get(jwt);

                log.info("블랙리스트 여부 : " + isBlackList);

                // 블랙 리스트에 해당 토큰이 존재하지 않는 경우
                if (ObjectUtils.isEmpty(isBlackList)) {
                    // 인증 정보 생성
                    Authentication authentication = tokenProvider.getAuthentication(jwt);
                    // jwt에 담긴 정보를 context에 저장
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
            filterChain.doFilter(request, response);

        } catch (ExpiredJwtException e) {
            log.info("refresh Token을 통한 access Token 갱신이 필요합니다.");
            type = "refresh";
//            response.setStatus(452);
//            String msg = objectMapper.writeValueAsString(new JwtResponse(HttpStatus.UNAUTHORIZED, "Expired accessToken. Plz send Refresh Token."));
//            response.getWriter().print(msg);
            String refreshJwt = resolveRefreshToken(request);
            log.info("refresh 토큰 : " + refreshJwt);
            // refresh 토큰이 있고
            // 기존에 발급한 refresh 토큰이 맞다면
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            if (StringUtils.hasText(refreshJwt)) {
                try {
                    // refresh 토큰의 유효성 검사
                    if (tokenProvider.validateToken(refreshJwt, "refresh")) {
                        Authentication authentication = tokenProvider.getAuthentication(refreshJwt); // 인증정보
                        Long date = System.currentTimeMillis();
                        String authorities = authentication.getAuthorities().stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.joining(","));
                        response.setStatus(HttpStatus.OK.value());
                        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
                        String accessToken = objectMapper.writeValueAsString(new Token(tokenProvider.createAccessToken(userPrincipal, authorities, date), null));
                        // accessToken 반환
                        response.getWriter().print(accessToken);
                    }
                    // refresh 토큰이 만료/잘못된 경우
                } catch (ExpiredJwtException ex) {
                    response.setStatus(452);
                    String msg = objectMapper.writeValueAsString(new JwtResponse(HttpStatus.UNAUTHORIZED, "RefreshToken is valid. But expire. Plz login again."));
                    response.getWriter().print(msg);
                }
                // refresh 토큰이 없는 경우
            } else {
                response.setStatus(HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS.value());
                String msg = objectMapper.writeValueAsString(new JwtResponse(HttpStatus.UNAUTHORIZED, "Expired accessToken. And refreshToken not exists"));
                response.getWriter().print(msg);
            }
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            logger.info("잘못된 " + type + " JWT 서명입니다.");
            response.setStatus(452);
            String msg = objectMapper.writeValueAsString(new JwtResponse(HttpStatus.UNAUTHORIZED, "RefreshToken is valid. But expire. Plz login again."));
            response.getWriter().print(msg);
        } catch (UnsupportedJwtException e) {
            logger.info("지원되지 않는 " + type + " JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            logger.info(type + "JWT 토큰이 잘못되었습니다.");
        }
    }

    private String resolveAccessToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(7);
        }
        return null;
    }

    private String resolveRefreshToken(HttpServletRequest request) {
        String refreshToken = request.getHeader(REFRESH_HEADER);
        if (StringUtils.hasText(refreshToken) && refreshToken.startsWith(BEARER_PREFIX)) {
            return refreshToken.substring(7);
        }
        return null;
    }
}
