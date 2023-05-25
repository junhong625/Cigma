package com.cigma.cigma.jwt;

import com.cigma.cigma.properties.JwtProperties;
import com.cigma.cigma.entity.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
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
    private static final String USER_IDX = "idx";

    private final JwtProperties jwtProperties;
    private StringRedisTemplate stringRedisTemplate = new StringRedisTemplate();
    private final RedisTemplate redisTemplate;

    private Key key;

    // 2. 의존성 주입
    public TokenProvider(JwtProperties jwtProperties, RedisTemplate redisTemplate) {
        this.jwtProperties = jwtProperties;
        this.redisTemplate = redisTemplate;
    }

    // 3. 주입받은 secret 값을 Base64 Decode해서 key 변수에 할당
    @Override
    public void afterPropertiesSet() throws Exception {
        byte[] keyBytes = Decoders.BASE64.decode(jwtProperties.getSecret());
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public Token createToken(Authentication authentication) {
        // 권한
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        log.info("유저 이메일 : " + userPrincipal.getUserEmail());
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        log.info("expiration : " + Long.toString(jwtProperties.getAccessTokenValidityInSeconds()));

        Long date = System.currentTimeMillis(); // application.yml에서 설정했던 토근 만료시간
        String accessToken = createAccessToken(userPrincipal, authorities, date);
        String refreshToken = createRefreshToken(userPrincipal, authorities, date);
        log.info("accessToken : " + accessToken);
        log.info("refreshToken : " + refreshToken);
        return new Token(accessToken, refreshToken);

    }

    public String createAccessToken(UserPrincipal userPrincipal, String authorities, Long date) {
        return Jwts.builder()
                .setSubject(userPrincipal.getUserIdx().toString())
                .claim(AUTHORITIES_KEY, authorities)
                .claim(USER_IDX, userPrincipal.getUserIdx())
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(new Date(date + jwtProperties.getAccessTokenValidityInSeconds()))
                .compact();
    }

    public String createRefreshToken(UserPrincipal userPrincipal, String authorities, Long date) {
        return Jwts.builder()
                .setSubject("refresh" + userPrincipal.getUserIdx().toString())
                .claim(AUTHORITIES_KEY, authorities)
                .claim(USER_IDX, userPrincipal.getUserIdx())
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(new Date(date + jwtProperties.getRefreshTokenValidityInSeconds()))
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
        log.info("claim 생성");
        if (claims.get(AUTHORITIES_KEY) == null) {
            log.info("권한 정보가 없는 토큰입니다.");
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        if (claims.get(USER_IDX) == null) {
            log.info("유저 idx 정보가 없습니다.");
            throw new RuntimeException("유저 IDX 정보가 없습니다.");
        }
        log.info("권한, 유저 정보 유효성 확인");

        // claim에서 권한정보 가져오기
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        User user = new User(); // 클레임의 정보를 이용해 유저 객체 생성
        user.setUserIdx(Long.parseLong(claims.get(USER_IDX).toString()));
        user.setUserEmail(claims.getSubject());

        log.info("token에서 id 갖고 오기 : " + user.getUserIdx());

        UserPrincipal userPrincipal = UserPrincipal.create(user, authorities);
        // 최종적으로 Authentication 객체를 리턴
        return new UsernamePasswordAuthenticationToken(userPrincipal, token, authorities);
    }

    // Token 파싱해보고 발생하는 Exception을 확인
    // 정상적인 Token인지 확인
    public boolean validateToken(String token, String type) {
//        try {
            log.info(type + " Token : " + token);
            JwtParser jwtParser = Jwts.parserBuilder().setSigningKey(key).build();
            log.info(String.valueOf(jwtParser.parseClaimsJws(token).getBody().getExpiration()));
            jwtParser.parseClaimsJws(token);
            log.info("token parsing 완료");
            log.info("token 존재 여부 " + redisTemplate.hasKey(token));
            if (redisTemplate.hasKey(token)) {
                log.info("해당 토큰 logout 처리됨");
                return false;}
            log.info("토큰 유효함");
            return true;
//        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
//            logger.info("잘못된 " + type + " JWT 서명입니다.");
//        } catch (ExpiredJwtException e) {
//            logger.info("만료된 " + type + " JWT 토큰입니다.");
////            throw new JwtException("만료된 " + type + " JWT 토큰입니다.");
//        } catch (UnsupportedJwtException e) {
//            logger.info("지원되지 않는 " + type + " JWT 토큰입니다.");
//        } catch (IllegalArgumentException e) {
//            logger.info(type + "JWT 토큰이 잘못되었습니다.");
//        }
//        return false;
    }

    // JWT 토큰 복호화해서 가져오기
    private Claims parseClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(key)
                    .build().parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    // 정상적인 refreshToken 인지 판단
    public boolean checkRedisToken(String refreshToken) {
        // redis에 저장된 refresh와 검사
        Claims claims = parseClaims(refreshToken);
        String userId = claims.get(USER_IDX).toString();
        String redisRefreshToken = stringRedisTemplate.opsForValue().get(userId);
        if (redisRefreshToken != null && redisRefreshToken.equals(refreshToken)) {
            return true;
        }
        return false;
    }

    public Long getExpiration(String accessToken) {
        try {
            // accessToken 남은 유효시간
            Date expiration = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody().getExpiration();
            Long now = new Date().getTime();

            // accessToken의 현재 남은 시간 반환
            return (expiration.getTime() - now);
        } catch (SignatureException e) {
            throw new JwtException("유효하지 않은 accessToken 입니다.");
        }
    }
}
