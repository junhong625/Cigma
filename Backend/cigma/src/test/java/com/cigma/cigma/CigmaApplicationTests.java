package com.cigma.cigma;

import com.cigma.cigma.controller.UserController;
import com.cigma.cigma.dto.request.UserCreateRequest;
import com.cigma.cigma.dto.request.UserLoginRequest;
import com.cigma.cigma.dto.response.UserLoginResponse;
import com.cigma.cigma.service.UserServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
class CigmaApplicationTests {
	@InjectMocks
	BCryptPasswordEncoder passwordEncoder;
	@Autowired
	RedisTemplate<String, String> redisTemplate;
	@Autowired
	UserServiceImpl userService;

	final String userEmail = "test";
	final String userPass = "test";
	final String userName = "테스트 계정";
	String accessToken;

	@Test
	@DisplayName("passwordEncoder 테스트")
	void passwordEncoderTest() {
		System.out.println(passwordEncoder.encode("ssafy"));
	}

	@Test
	@DisplayName("로그인 테스트")
	void TimeTest() {
		System.out.println("accessToken 유효시간 : " + Duration.ofMinutes(30).toMillis());
		System.out.println("refreshToken 유효시간 : " + Duration.ofDays(14).toMillis());
	}

	@Test
	@DisplayName("Redis에 저장되는지 테스트")
	void redisExpireTest() throws InterruptedException {
		final String key = "a";
		final String value = "1";
		final ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
		valueOperations.set(key, value);
		final Boolean expire = redisTemplate.expire(key, 5, TimeUnit.MILLISECONDS);
		Thread.sleep(6000);
		final String s = valueOperations.get(key);
		assertThat(expire).isTrue();
		assertThat(s).isNull();
	}

	@Test
	@DisplayName("회원가입 테스트")
	void signupTest() {
		UserCreateRequest userCreateRequest = new UserCreateRequest(userEmail, userPass, userName);
		userService.signUp(userCreateRequest);
	}

	@Test
	@DisplayName("로그인 테스트")
	void loginTest() {
		UserLoginRequest userLoginRequest = new UserLoginRequest(userEmail, userPass);
		UserLoginResponse response = userService.login(userLoginRequest);
		accessToken = response.getAccessToken();
	}

	@Test
	@DisplayName("로그아웃 테스트")
	void logoutTest() {
		loginTest();
		userService.logout(accessToken);
	}
}

