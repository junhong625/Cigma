package com.cigma.cigma;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootTest
class CigmaApplicationTests {
	@InjectMocks
	BCryptPasswordEncoder passwordEncoder;

	@Test
	@DisplayName("passwordEncoder 테스트")
	void passwordEncoderTest() {
		System.out.println(passwordEncoder.encode("ssafy"));
	}
}
