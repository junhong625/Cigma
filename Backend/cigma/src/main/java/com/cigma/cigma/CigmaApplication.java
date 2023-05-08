package com.cigma.cigma;

import com.cigma.cigma.properties.ImageProperties;
import com.cigma.cigma.properties.JwtProperties;
import com.cigma.cigma.properties.RedisProperties;
import com.cigma.cigma.properties.S3Properties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@EnableConfigurationProperties({JwtProperties.class, RedisProperties.class, S3Properties.class, ImageProperties.class})
public class CigmaApplication {
	public static void main(String[] args) {
		SpringApplication.run(CigmaApplication.class, args);
	}

	// CORS 처리
//	@Bean
//	public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/**") // CORS를 적용할 URL 패턴 정의
//						.allowedOrigins("*") // 자원 공유를 허락할 ORIGIN 지정
//						.allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH") // 허용할 HTTP Methods 정의
//						.maxAge(3000); // 설정 시간만큼 pre-flight 리퀘스트 캐싱
//			}
//		};
//	}
}
