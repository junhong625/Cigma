package com.cigma.cigma.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // CORS 처리
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // CORS를 적용할 URL 패턴 정의
                .allowedOrigins("*") // 자원 공유를 허락할 ORIGIN 지정
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH") // 허용할 HTTP Methods 정의
                .maxAge(3000); // 설정 시간만큼 pre-flight 리퀘스트 캐싱;
    }
}
