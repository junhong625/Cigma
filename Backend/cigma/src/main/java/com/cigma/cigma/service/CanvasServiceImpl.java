package com.cigma.cigma.service;

import com.cigma.cigma.common.SecurityUtils;
import com.cigma.cigma.dto.request.CanvasJoinRequest;
import com.cigma.cigma.dto.response.CanvasGetResponse;
import com.cigma.cigma.dto.response.ProjectGetResponse;
import com.cigma.cigma.dto.response.TeamGetResponse;
import com.cigma.cigma.handler.customException.FullCanvasException;
import com.cigma.cigma.jwt.UserPrincipal;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.lettuce.core.RedisNoScriptException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class CanvasServiceImpl implements CanvasService{
    private final RedisTemplate redisTemplate;
    private final ProjectServiceImpl projectService;
    private final TeamServiceImpl teamService;
    private final String canvasCnt = "canvasCnt";

    @Override
    public void closeCanvas(Long pjtIdx) throws Exception {
        log.info("=================Close Canvas===============");
        ProjectGetResponse project = projectService.getProject(pjtIdx);
        TeamGetResponse team = teamService.getTeam(project.getTeamIdx());
        UserPrincipal userPrincipal = SecurityUtils.getUserPrincipal();
        log.info("teamIdx : " + team.getTeamIdx());
        log.info("pjtIdx : " + project.getProjectIdx());
        // 접속하려는 pjt가 해당 유저의 pjt가 맞는지 확인
        projectService.checkTeamMemberAuthorization(project.getProjectIdx());
        log.info("Authorization OK");
        // 유저가 해당 캔버스에 접속해 있는지 확인
        // folder 이름
        String canvasName = team.getTeamName() + "_" + project.getProjectName();
        // folder 이름을 통해 조회한 port 번호
        Object port = getRedis(canvasName);
        if (port == null) {
            throw new RedisNoScriptException("실행되지 않은 캔버스입니다.");
        }
        // port 번호를 통해 조회한 containerId
        Object containerId = getRedis(port);
        if (containerId == null) {
            throw new RedisNoScriptException("실행되지 않은 캔버스 입니다.");
        }
        // canvas에 남은 팀원이 존재하는지 확인
        String[] members = String.valueOf(getRedis(containerId)).split(",");
        log.info("==============현재 접속 유저============");
        String newMembers = "";
        for (String member : members) {
            log.info("유저 : " + member);
            // 현재 접속 중인 유저 중 closeCanvas를 요청한 유저 삭제
            if (!member.equals(userPrincipal.getUserIdx().toString())) {
                newMembers += member + ",";
            }
        }
        try {
            log.info(newMembers);
            // newMebers에 아무도 포함되지 않을 경우 오류가 발생
            newMembers = newMembers.substring(0, newMembers.length() - 1);
        } catch (Exception e) {
            // canvas에 남은 팀원이 없다는 의미
            // container 삭제
            Map<String, Object> response = deleteContainer(String.valueOf(containerId));
            // 정상적으로 삭제 됐을 경우
            if (Integer.parseInt(response.get("status").toString()) == 200) {
                // canvas 삭제
                deleteRedis(canvasName);
                // port 삭제
                deleteRedis(port);
                // containerId redis에서 삭제
                deleteRedis(containerId);
                // 삭제 후 canvasCnt - 1
                Object canvasCnt = getRedis(CanvasServiceImpl.this.canvasCnt);
                setRedis(canvasCnt, Integer.parseInt((String) canvasCnt) + 1);
            } else {
                // 오류 처리 필요
                throw new Exception();
            }
        }
    }

    @Override
    public CanvasGetResponse openCanvas(Long pjtIdx) throws Exception {
        log.info("=================Open Canvas================");
        int port;
        String containerId;
        ProjectGetResponse project = projectService.getProject(pjtIdx);
        TeamGetResponse team = teamService.getTeam(project.getTeamIdx());
        log.info("teamIdx : " + team.getTeamIdx());
        log.info("pjtIdx : " + project.getProjectIdx());
        // 접속하려는 pjt가 해당 유저의 pjt가 맞는지 확인
        projectService.checkTeamMemberAuthorization(project.getProjectIdx());
        log.info("Authorization OK");
        // folder 이름
        String canvasName = team.getTeamName() + "_" + project.getProjectName();
        log.info("name : " + canvasName);
        // 현재 누가 이미 캔버스에 접속했는지 확인
        Object isUsing = isUsingCanvas(canvasName);
        // 누가 접속하지 않았다면
        if (isUsing == null) {
            log.info("Not Using Canvas!");
            // canvas 개수 확인
            Long cnt = Long.parseLong(countCanvas());
            log.info("현재 " + cnt.toString() + "개로 canvas 생성 가능");
            // 폴더 생성
//            String folderName = createFolder(name); // /canvas/teamName_projectName/workspace/project
//            log.info("Create Folder! : " + folderName);
            // 접속 가능한 port 찾기(범위 8000~9000)
            port = randomPort();
            log.info("Find Empty Port! : " + port);
            // canvas 생성하고
            Map<String, Object> response = createContainer(port, team.getTeamName(), project.getProjectName());
            log.info("add connect List!");
            // 정상적으로 생성 됐을 경우
            if (Integer.parseInt(response.get("status").toString()) == 200) {
                // canvas 개수 + 1
                setRedis(canvasCnt, cnt + 1);
                // canvasName : port 형식으로 저장
                setRedis(canvasName, port);
                // containerId 가져오기
                containerId = response.get("containerId").toString();
                // port : containerId 형식으로 redis에 저장해두기
                setRedis(port, containerId);
            } else {
                // 오류 처리 필요
                throw new Exception();
            }
        // 누군가 접속해있다면
        } else {
            // isUsing이 해당 팀프로젝트의 port 번호
            port = Integer.parseInt(isUsing.toString());
            // port를 key로 redis에 조회하면 containerId 조회 가능
            containerId = getRedis(port).toString();
        }
        // canvas에 참여 처리
        joinCanvas(containerId, SecurityUtils.getUserPrincipal().getUserIdx());

        return CanvasGetResponse.builder()
                .name(canvasName)
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
                if (connector.equals(userIdx.toString())) {
                    flag = false;
                }
            }
            if (flag) {
                connectors += "," + userIdx.toString();
                setRedis(containerId, connectors);
            }
        }
    }


    // 팀원 중 누군가가 접속했는지 확인
    public Object isUsingCanvas(String name) {
        return getRedis(name);
    }

    // canvas 개수 세기
    public String countCanvas() throws FullCanvasException {
        log.info("canvas 개수 세기 시작!");
        Object cnt = getRedis(canvasCnt);
        cnt = cnt != null ? cnt : 0;
//         캔버스 총 개수가 10개 되면 더 이상 생성 X
//        if (Integer.parseInt(cnt.toString()) >= 10) {
//            throw new FullCanvasException();
//        }
        log.info("canvas 개수 : " + cnt.toString());
        return cnt.toString();
    }

    // random port 부여
    public int randomPort() {
        int port;
        while (true) {
            Random random = new Random();
            port = (random.nextInt(100) + 800) * 10;
            if (getRedis(port) == null) {
                break;
            }
        }
        setRedis(port, "");
        return port;
    }

    // redis에서 조회
    public Object getRedis(Object key) {
        return redisTemplate.opsForValue().get(String.valueOf(key));
    }

    // redis에 저장
    public void setRedis(Object key, Object value) {
        redisTemplate.opsForValue().set(String.valueOf(key), String.valueOf(value));
    }

    // redis에서 삭제
    public void deleteRedis(Object key) {
        redisTemplate.opsForValue().getAndDelete(key);
    }

    // container 생성
    public Map<String, Object> createContainer(int port, String teamName, String projectName) throws Exception {
        RestTemplate restTemplate = new RestTemplate();

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 요청 바디 설정
        HashMap<String, String> requestBody = new HashMap<>();
        requestBody.put("port", String.valueOf(port));
        requestBody.put("teamName", teamName);
        requestBody.put("projectName", projectName);

        // 요청 엔티티 생성
        HttpEntity<HashMap<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        // CURL 요청 보내기
        ResponseEntity<String> responseEntity = restTemplate.exchange("http://cigmafast:3000/ide/create", HttpMethod.POST, requestEntity, String.class);

        // 응답 결과 출력
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = objectMapper.readValue(responseEntity.getBody(), Map.class);
        log.info("status : " + map.get("status"));
        log.info("containerId : " + map.get("containerId"));
        return map;

    }

    public Map<String, Object> deleteContainer(String containerId) throws JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 요청 바디 설정
        HashMap<String, String> requestBody = new HashMap<>();
        requestBody.put("containerId", containerId);

        // 요청 엔티티 생성
        HttpEntity<HashMap<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        // CURL 요청 보내기
        ResponseEntity<String> responseEntity = restTemplate.exchange("http://cigmafast:3000/ide/delete", HttpMethod.POST, requestEntity, String.class);

        // 응답 결과 출력
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = objectMapper.readValue(responseEntity.getBody(), Map.class);
        log.info("status : " + map.get("status"));
        return map;
    }

    // 처음 프로젝트를 사용하는 것이라면
    public String createFolder(String name) throws Exception {
        log.info("folder name : " + name);
        String folderPath = "/canvas/" + name + "/workspace/project";
//        Path path = Paths.get(folderPath);
//        Files.createDirectories(path);
//        return folderPath;
        File folder = new File(folderPath);

        if (folder.mkdirs()) {
            log.info("폴더 생성!");
        } else {
            log.info("폴더가 이미 존재합니다!");
        }
        return folderPath;
    }
}
