package com.cigma.cigma;

import com.cigma.cigma.dto.request.UserCreateRequest;
import com.cigma.cigma.dto.request.UserLoginRequest;
import com.cigma.cigma.dto.response.UserLoginResponse;
import com.cigma.cigma.service.CanvasServiceImpl;
import com.cigma.cigma.service.UserServiceImpl;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import io.kubernetes.client.openapi.ApiClient;
import io.kubernetes.client.openapi.ApiException;
import io.kubernetes.client.openapi.Configuration;
import io.kubernetes.client.openapi.apis.CoreV1Api;
import io.kubernetes.client.openapi.models.V1Pod;
import io.kubernetes.client.openapi.models.V1PodList;
import io.kubernetes.client.util.Config;
import io.kubernetes.client.util.KubeConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
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
	@DisplayName("connect EC2 Test")
	void connectEC2() {
		String host = "k8a601.p.ssafy.io";
		String username = "ubuntu";
		String privateKeyPath = "~/Downloads/K8A601T.pem";
		int port = 22;
		try {
			JSch jSch = new JSch();
			// SSH private key 로드
			jSch.addIdentity(privateKeyPath);
			System.out.println("SSH private key 로드 : " + privateKeyPath);

			// 세션 생성 및 접속
			Session session = jSch.getSession(username, host, port);
			session.setConfig("StrictHostKeyChecking", "no"); // 호스트 키 검증 비활성화
			session.connect();
			System.out.println("세션 생성 및 접속");

			// 명령 실행
			ChannelExec channel = (ChannelExec) session.openChannel("exec");
			channel.setCommand("sudo mkdir -p /k3s/project/" + "test");
			channel.connect();
			System.out.println("명령 실행");

			// 명령어 실행 결과 출력
			// 예를 들어, command = "cd /; mkdir test_test"의 경우, 해당 디렉토리가 생성됩니다.
			System.out.println("Command executed successfully.");

			// 연결 종료
			channel.disconnect();
			session.disconnect();
			System.out.println("/k3s/project/" + "test");
		} catch (JSchException e) {
			throw new RuntimeException(e);
		}
	}

	@Test
	@DisplayName("connect k3s")
	public void connectK3s() throws IOException, ApiException {
		ApiClient client = Config.fromConfig(KubeConfig.loadKubeConfig(new FileReader("/Users/ahnjunhong/Downloads/k3s.yaml")));
		client.setBasePath("https://k8a601.p.ssafy.io");
		client.setVerifyingSsl(false);
		Configuration.setDefaultApiClient(client);
		CoreV1Api api = new CoreV1Api();
		System.out.println("connect : k3s");
		V1PodList v1PodList = api.listNamespacedPod("default", null, null, null, null, null, null, null, null, null, null);
		for (V1Pod pod : v1PodList.getItems()) {
			System.out.println(pod.getMetadata().getName());
		}
	}
}
