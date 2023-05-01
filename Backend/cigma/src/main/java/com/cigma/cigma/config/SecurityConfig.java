package com.cigma.cigma.config;

import com.cigma.cigma.jwt.JwtAccessDeniedHandler;
import com.cigma.cigma.jwt.JwtAuthenticationEntryPoint;
import com.cigma.cigma.jwt.TokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity // 기본적인 Web 보안을 활성화 하겠다는 의미
@EnableGlobalMethodSecurity(prePostEnabled = true) // @PreAuthorize 어노테이션을 메소드 단위로 추가하기 위해 사용
public class SecurityConfig extends WebSecurityConfigurerAdapter { // 추가적인 설정을 위해 extends
    private final TokenProvider tokenProvider;
    private final RedisTemplate redisTemplate;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    // TokenProvider, JwtAuthenticationEntryPoint, JwtAccessDeniedHandler 주입
    public SecurityConfig(
            TokenProvider tokenProvider,
            JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
            RedisTemplate redisTemplate,
            JwtAccessDeniedHandler jwtAccessDeniedHandler
    ) {
        this.tokenProvider = tokenProvider;
        this.redisTemplate = redisTemplate;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
    }

    // 비밀번호 암호화를 위한 Encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // 토큰을 사용하기 때문

                // Exception 핸들링을 위한 설정들
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                // 세선을 사용하지 않음
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                // 로그인, 회원가입은 토큰이 없는 상태이기 때문에 permitall 설정
                .and()
                .authorizeRequests()  // HttpServletRequest 를 사용하는 요청들에 대한 접근제한을 설정
                // 모든 URI 인증없이 허용
                .antMatchers("/**").permitAll()
//                .antMatchers("/api/user", "/api/user/signup").permitAll() // 입력된 URI에 대한 요청은 인증없이 전급을 허용하겠다는 의미
                .anyRequest().authenticated()          // 나머지 요청들은 모두 인정되어야한다는 의미

                // JwtSecurity Config 적용
                .and()
                .apply(new JwtSecurityConfig(tokenProvider, redisTemplate));
    }
}
