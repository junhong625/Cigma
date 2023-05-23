package com.cigma.cigma.config;

//import com.cigma.cigma.jwt.JwtFilter;
import com.cigma.cigma.jwt.JwtTokenAuthenticationFilter;
import com.cigma.cigma.jwt.TokenProvider;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private TokenProvider tokenProvider;
    private RedisTemplate redisTemplate;

    // TokenProvider 주입
    public JwtSecurityConfig(TokenProvider tokenProvider, RedisTemplate redisTemplate) {
        this.tokenProvider = tokenProvider;
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        // JwtFilter를 통해 Security 로직에 필터를 등록
        JwtTokenAuthenticationFilter customFilter = new JwtTokenAuthenticationFilter(tokenProvider, redisTemplate);
        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
