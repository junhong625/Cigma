package com.cigma.cigma.service;

import com.cigma.cigma.common.SecurityUtils;
import com.cigma.cigma.dto.request.CanvasJoinRequest;
import com.cigma.cigma.dto.response.CanvasGetResponse;
import com.cigma.cigma.dto.response.PodsGetResponse;
import com.cigma.cigma.dto.response.ProjectGetResponse;
import com.cigma.cigma.dto.response.TeamGetResponse;
import com.cigma.cigma.handler.customException.AllCanvasUsingException;

//import com.mysql.cj.xdevapi.Client;
//import io.kubernetes.client.openapi.ApiClient;
//import io.kubernetes.client.openapi.Configuration;
//import io.kubernetes.client.openapi.apis.CoreV1Api;
//import io.kubernetes.client.openapi.models.V1Pod;
//import io.kubernetes.client.openapi.models.V1PodList;
//import io.kubernetes.client.proto.V1;
//import io.kubernetes.client.util.ClientBuilder;
//import io.kubernetes.client.util.Config;
//import io.kubernetes.client.util.KubeConfig;
import com.cigma.cigma.handler.customException.FullCanvasException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.FileInputStream;
import java.io.FileReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class CanvasServiceImpl implements CanvasService{
    private final RedisTemplate redisTemplate;
    private final ProjectServiceImpl projectService;
    private final TeamServiceImpl teamService;

    @Override
    public PodsGetResponse closeCanvas(CanvasJoinRequest request) throws Exception {
        return null;
    }

    @Override
    public CanvasGetResponse openCanvas(CanvasJoinRequest request) throws Exception {
        log.info("=================Open Canvas================");
        int port;
        String containerId;
        ProjectGetResponse project = projectService.getProject(request.getPjtIdx());
        TeamGetResponse team = teamService.getTeam(project.getTeamIdx());
        // 접속하려는 pjt가 해당 유저의 pjt가 맞는지 확인
        projectService.checkAuthorization(project.getProjectIdx());
        log.info("Authorization OK");
        // folder 이름
        String name = team.getTeamName() + "_" + project.getProjectName();
        // 현재 누가 이미 캔버스에 접속했는지 확인
        Object isUsing = isUsingCanvas(name);
        // 누가 접속하지 않았다면
        if (isUsing == null) {
            log.info("Not Using Canvas!");
            // canvas 개수 확인
            Long cnt = Long.parseLong(countCanvas());
            log.info("현재 " + cnt + "개로 canvas 생성 가능");
            // 폴더 생성
            String folderName = createFolder(name); // /canvas/teamName_projectName/workspace/project
            log.info("Create Folder! : " + folderName);
            // 접속 가능한 port 찾기(범위 8000~9000)
            port = randomPort();
            log.info("Find Empty Port! : " + port);
            // canvas 생성하고
            Map<String, Object> response = createContainer(port, team.getTeamName(), project.getProjectName());
            log.info("add connect List!");
            // 정상적으로 생성 됐을 경우
            if (Integer.parseInt(response.get("status").toString()) == 200) {
                // canvas 개수 + 1
                setRedis("canvasCnt", cnt + 1);
                // containerId 가져오기
                containerId = response.get("containerId").toString();
                // containerId {port : containerId} 형식으로 redis에 저장해두기
                setRedis(port, containerId);
            } else {
                // 오류 처리 필요
                throw new Exception();
            }
        } else {
            // isUsing이 해당 팀프로젝트의 port 번호
            port = Integer.parseInt(isUsing.toString());
            // port를 key로 redis에 조회하면 containerId 조회 가능
            containerId = getRedis(port).toString();
        }
        // canvas에 참여 처리
        joinCanvas(containerId, SecurityUtils.getUserPrincipal().getUserIdx());

        return CanvasGetResponse.builder()
                .name(name)
                .port(port)
                .build();
    }
    // 접속자 등록
    public void joinCanvas(String containerId, Long userIdx) {
        String connectors = String.valueOf(getRedis(containerId));
        if (connectors == "null") {
            setRedis(containerId, userIdx);
        } else {
            boolean flag = true;
            for (String connector : connectors.split(",")) {
                if (!connector.equals(userIdx.toString())) {
                    flag = false;
                }
            }
            if (flag) {
                connectors += userIdx.toString();
                setRedis(containerId, connectors);
            }
        }
    }


    // 팀원 중 누군가가 접속했는지 확인
    public Object isUsingCanvas(String name) {
        return getRedis(name);
    }

    public String countCanvas() throws FullCanvasException {
        Object cnt = getRedis("canvasCnt");
        log.info("canvas 개수 : " + cnt.toString());
        if (Integer.parseInt(cnt.toString()) >= 10) {
            throw new FullCanvasException();
        }
        return (String) cnt;
    }

    public int randomPort() {
        int port;
        while (true) {
            Random random = new Random();
            port = (random.nextInt(100) + 700) * 10;
            if (getRedis(port) != null) {
                break;
            }
        }
        for (int i = 0; i < 3; i++) {
            setRedis(port+i, "");
        }
        return port;
    }

    public Object getRedis(Object key) {
        return redisTemplate.opsForValue().get(String.valueOf(key));
    }

    public void setRedis(Object key, Object value) {
        redisTemplate.opsForValue().set(String.valueOf(key), String.valueOf(value));
    }

    public Map<String, Object> createContainer(int port, String teamName, String projectName) throws Exception {
        RestTemplate restTemplate = new RestTemplate();

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 요청 바디 설정
        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("port", String.valueOf(port));
        requestBody.add("teamName", teamName);
        requestBody.add("projectName", projectName);

        // 요청 엔티티 생성
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        // CURL 요청 보내기
        ResponseEntity<String> responseEntity = restTemplate.exchange("http://host.docker.internal:3000/", HttpMethod.POST, requestEntity, String.class);

        // 응답 결과 출력
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = objectMapper.readValue(responseEntity.getBody(), Map.class);
        log.info("status : " + map.get("status"));
        log.info("containerId : " + map.get("containerId"));
        return map;

    }

    // 처음 프로젝트를 사용하는 것이라면
    public String createFolder(String name) throws Exception {
        String folderPath = "/canvas/" + name + "/workspace/project";
        Path path = Paths.get(folderPath);
        Files.createDirectories(path);
        return folderPath;
//        File folder = new File(folderPath);
//
//        if (folder.mkdirs()) {
//            log.info("폴더 생성!");
//            return folderPath;
//        } else {
//            log.info("폴더가 이미 존재합니다!");
//            return folderPath;
//        }
    }
}
