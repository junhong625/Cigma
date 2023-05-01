package com.cigma.cigma;

import com.cigma.cigma.properties.JwtProperties;
import com.cigma.cigma.properties.RedisProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@EnableConfigurationProperties({JwtProperties.class, RedisProperties.class})
public class CigmaApplication {

	public static void main(String[] args) {
		SpringApplication.run(CigmaApplication.class, args);
	}

}
