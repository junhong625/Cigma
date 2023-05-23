package com.cigma.cigma;

import com.cigma.cigma.dto.request.UserCreateRequest;
import com.cigma.cigma.dto.request.UserLoginRequest;
import com.cigma.cigma.dto.response.UserLoginResponse;
import com.cigma.cigma.handler.customException.UserNotIncludeException;
import com.cigma.cigma.service.CanvasServiceImpl;
import com.cigma.cigma.service.UserServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
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
	@Autowired
	CanvasServiceImpl canvasService;

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
//		UserCreateRequest userCreateRequest = new UserCreateRequest(userEmail, userPass, userName);
//		userService.signUp(userCreateRequest);
	}

	@Test
	@DisplayName("로그인 테스트")
	void loginTest() {
		UserLoginRequest userLoginRequest = new UserLoginRequest(userEmail, userPass);
		UserLoginResponse response = userService.login(userLoginRequest);
		accessToken = response.getAccessToken();
	}

	@Test
	@DisplayName("teamMate Test")
	void teamMateTest() {
		String a = "test@test.com, test2@test.com, test3@test.com";
		String email = "test2@test.com";
//		a += String.format(", %s", email);
		a = a.replace(email, "");
		String[] b = a.split(",");
		String members = "";
		for (String c : b) {
			if (!c.isBlank()) {
				if (!members.isBlank()) {
					members += ", ";
				}
				members += c.strip();
			}
		}
		System.out.println(members);
	}

	@Test
	@DisplayName("Test mkdirs")
	void mkdirs() {
		String folderPath = "/Users/ahnjunhong/k3s/project";

		File folder = new File(folderPath);

		System.out.println(folder.mkdirs());
	}

	@Test
	@DisplayName("check Response fastAPI")
	public void check() throws JsonProcessingException {
		RestTemplate restTemplate = new RestTemplate();
		// 요청 헤더 설정
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		// 요청 바디 설정
		MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
//		requestBody.add("port", String.valueOf(port));
//		requestBody.add("teamName", teamName);
//		requestBody.add("projectName", projectName);

		// 요청 엔티티 생성
		HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

		// CURL 요청 보내기
		ResponseEntity<String> responseEntity = restTemplate.exchange("http://127.0.0.1:8000/", HttpMethod.GET, requestEntity, String.class);
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> map = objectMapper.readValue(responseEntity.getBody(), Map.class);
		System.out.println(map.get("status"));
		System.out.println(map.get("port"));
	}

	@Test
	@DisplayName("팀원 검증 테스트")
	public void checkMembersTest() {
		if (3 != 4) {
			// 팀원에 포함됐는지 체크
			String[] members = new String[]{"ajh1", "ajh2", "ajh3"};
			for (String member : members) {
				if (member.equals("ajh1")) {
					System.out.println(true);
				} else {
					System.out.println(false);
				}
			}
		}
	}

	@Test
	@DisplayName("문자열 테스트")
	public void charTest() {
		String connectors = "";
		connectors = connectors.substring(0, connectors.length() - 1);
	}
}
