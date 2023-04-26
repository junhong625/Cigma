package com.cigma.cigma.jwt;

import com.cigma.cigma.properties.JwtProperties;
import com.cigma.cigma.entity.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component // 1. Bean 생성
@Slf4j
public class TokenProvider implements InitializingBean {
    private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    private static final String AUTHORITIES_KEY = "auth";
    private static final String USER_ID = "idx";
    private final String secret;

    private final JwtProperties jwtProperties = new JwtProperties();

    private Key key;

    // 2. 의존성 주입
    public TokenProvider(
            @Value("${jwt.secret}") String secret) {
        this.secret = secret;
    }

    // 3. 주입받은 secret 값을 Base64 Decode해서 key 변수에 할당
    @Override
    public void afterPropertiesSet() throws Exception {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public Token createToken(Authentication authentication) {
        // 권한
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        log.info("expiration : " + Long.toString(jwtProperties.getAuth().getAccessTokenValidityInSeconds()));

        Date now = new Date(); // application.yml에서 설정했던 토근 만료시간
        String accessToken = createAccessToken(authentication, authorities, now);
        String refreshToken = createRefreshToken(authentication, authorities, now);
        return new Token(accessToken, refreshToken);

    }

    public String createAccessToken(Authentication authentication, String authorities, Date now) {
        return Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(new Date(now.getTime() + jwtProperties.getAuth().getAccessTokenValidityInSeconds()))
                .compact();
    }

    public String createRefreshToken(Authentication authentication, String authorities, Date now) {
        return Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(new Date(now.getTime() + jwtProperties.getAuth().getRefreshTokenValidityInSeconds()))
                .compact();
    }

    public Authentication getAuthentication(String token) {
        // 토큰을 이용해 클레임 생성
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        if (claims.get(AUTHORITIES_KEY) == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        if (claims.get(USER_ID) == null) {
            throw new RuntimeException("유저 IDX 정보가 없습니다.");
        }

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        User principal = new User(); // 클레임의 정보를 이용해 유저 객체 생성
        principal.setUserIdx(Long.parseLong(claims.get(USER_ID).toString()));
        principal.setUserName(claims.getSubject());

        log.info("token에서 id 갖고 오기 : " + principal.getUserIdx());

        // 최종적으로 Authentication 객체를 리턴
        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    // Token 파싱해보고 발생하는 Exception을 확인
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            logger.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            logger.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            logger.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            logger.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }
}
