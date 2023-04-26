package com.cigma.cigma;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class CigmaApplication {

	public static void main(String[] args) {
		SpringApplication.run(CigmaApplication.class, args);
	}

}
