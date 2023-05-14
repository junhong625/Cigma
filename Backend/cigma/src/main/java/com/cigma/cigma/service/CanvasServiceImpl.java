package com.cigma.cigma.service;

import com.amazonaws.services.ec2.AmazonEC2Client;
import com.cigma.cigma.common.SecurityUtils;
import com.cigma.cigma.dto.request.CanvasJoinRequest;
import com.cigma.cigma.dto.response.CanvasGetResponse;
import com.cigma.cigma.dto.response.PodsGetResponse;
import com.cigma.cigma.dto.response.ProjectGetResponse;
import com.cigma.cigma.dto.response.TeamGetResponse;
import com.cigma.cigma.entity.Project;
import com.cigma.cigma.handler.customException.AllCanvasUsingException;
import com.cigma.cigma.jwt.UserPrincipal;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import io.kubernetes.client.custom.IntOrString;
import io.kubernetes.client.openapi.ApiClient;
import io.kubernetes.client.openapi.ApiException;
import io.kubernetes.client.openapi.Configuration;
import io.kubernetes.client.openapi.apis.CoreV1Api;
import io.kubernetes.client.openapi.models.*;
import io.kubernetes.client.util.Config;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.OkHttpClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cglib.core.VisibilityPredicate;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class CanvasServiceImpl implements CanvasService{
    private CoreV1Api api;
    private final RedisTemplate redisTemplate;
    private final ProjectServiceImpl projectService;
    private final TeamServiceImpl teamService;

    @Override
    public PodsGetResponse createPod(String name) throws Exception {
        try {
            connect();
            // Pod의 이름이 중복되지 않는지 체크 필요
            //
            ////////////////////////////////////
            // 미 사용중인 port 번호 찾는 로직 필요
            int port = 80;
            //
            ////////////////////////////////////
            V1ContainerPort v1ContainerPort = new V1ContainerPort().containerPort(port).protocol("TCP");
            // service 생성 시 필요한 label 생성
            HashMap<String, String> label = new HashMap<>() {{
                put("app", name);}};
            // Pod 객체 생성
            V1Pod pod = new V1Pod()
                    .metadata(new V1ObjectMeta().name(name)
                            .labels(label))
                    .spec(new V1PodSpec()
                            .containers(
                                    new ArrayList<V1Container>() {{
                                        add(new V1Container()
                                                .name(name + "-container")
                                                // Cigma ide image 설정 필요
                                                .image("nginx")
                                                .ports(
                                                        new ArrayList<V1ContainerPort>() {{
                                                            add(v1ContainerPort);
                                                        }}
                                                ));
                                    }}
                            ));

            log.info("pod 객체 생성");
            V1Pod createdPod = api.createNamespacedPod("default", pod, null, null, null, null);

            log.info("Pod created: " + createdPod.getMetadata().getName());
//            createService(label, port);
        } catch (Exception e) {
            System.err.println("Exception when creating Pod: " + e.getMessage());
        }
        return null;
    }

    @Override
    public void deletePod(String name) throws Exception {
        connect();
        System.out.println(name);
        api.deleteNamespacedPod(name, "default", null, null, null, null, null, new V1DeleteOptions());
        log.info("pod 삭제 완료");
        deleteService(name);
        log.info("service 삭제 완료");
    }

    @Override
    public CanvasGetResponse joinCanvas(CanvasJoinRequest request) throws Exception {
        log.info("=================join Canvas================");
        connect();
        ProjectGetResponse project = projectService.getProject(request.getPjtIdx());
        TeamGetResponse team = teamService.getTeam(project.getTeamIdx());
        // 접속하려는 pjt가 해당 유저의 pjt가 맞는지 확인
        projectService.checkAuthorization(project.getProjectIdx());
        log.info("Authorization OK");
        // folder 이름
        String name = team.getTeamName() + "_" + project.getProjectName();
        // 현재 누가 이미 캔버스에 접속했는지 확인
        // 누가 접속하지 않았다면
        if (!isUsingCanvas(name)) {
            log.info("Using Canvas!");
            // 폴더 생성
            String folderName = createFolder(name);
            log.info("Create Folder! : " + folderName);
            // 접속 가능한 pod 찾기
            String podName = findingPod(name);
            log.info("Find Empty Pod! : " + podName);
            // 바인딩
            binding(podName, folderName, name);
            log.info("Binding OK!");
            // 해당 바인딩에 서비스 생성
            createService(new HashMap<String, String>() {{
                put("app", podName);}}, name);
            // redis에 해당 key : 서비스 이름, value : 접속한 유저들의 idx 리스트
            redisTemplate.opsForValue().set(name, new ArrayList<>());
            log.info("add connect List!");
        }
        // nodePort 조회할 service
        V1Service service = api.readNamespacedService(name, "default", null);
        log.info("get Service!");
        // 유저 정보
        UserPrincipal userPrincipal = SecurityUtils.getUserPrincipal();
        // redis에 유저의 서비스 접속 여부 표시
        ArrayList<Integer> connectMembers = (ArrayList<Integer>) redisTemplate.opsForValue().get(name);
        connectMembers.add(userPrincipal.getUserIdx().intValue());
        redisTemplate.opsForValue().set(name,connectMembers);
        log.info("add connect List Redis!");
        return CanvasGetResponse.builder()
                .name(name)
                .port(service.getSpec().getPorts().get(0).getNodePort())
                .build();
    }

    public boolean isUsingCanvas(String name) {
        if (redisTemplate.opsForValue().get(name) != null) {
            return true;
        }
        return false;
    }

    public String  findingPod(String name) throws Exception{
        String[] podList = new String[]{"cigma-canvas-1", "cigma-canvas-2", "cigma-canvas-3", "cigma-canvas-4", "cigma-canvas-5"};
        for (int i = 0; i < podList.length; i++) {
            // 사용 중이지 않은 pod를 발견할 경우
            log.info("pod : " + podList[i]);
            if (redisTemplate.opsForValue().get(podList[i]) == null) {
                //  해당 pod 사용 중으로 변경
                redisTemplate.opsForValue().set(podList[i], name);
                return podList[i];
            }
        }
        // 모든 pod가 사용 중일 경우
        throw new AllCanvasUsingException();
    }

    public void binding(String podName, String folderName, String canvasName) throws Exception{
        // pod 조회
        V1Pod pod = api.readNamespacedPod(podName, "default", null);
        log.info("pod 조회");
        // pod 내부의 컨테이너에 바인딩 설정
        V1PodSpec spec = pod.getSpec();
        if (spec != null & spec.getContainers() != null) {
            for (V1Container container : spec.getContainers()) {
                log.info("pod 내부 container : " + container.getName());
                // 컨테이너에 바인딩 설정
                container.setVolumeMounts(Collections.singletonList(
                        new V1VolumeMount()
                                .name(folderName)
                                .mountPath("/" + canvasName)));
                log.info("바인딩 설정");
            }
        }
        // 바인딩 반영
        V1Pod updatedPod = api.replaceNamespacedPod(podName, "default", pod, null, null, null, null);
        log.info("바인딩 반영");
    }

    // Kubernetes에서 관리 중인 Pods(컨테이너 가져오기)
    // Pods내에는 여러개의 컨테이너 존재도 가능
    @Override
    public PodsGetResponse getPods() throws Exception {
        List<String> pods = new ArrayList<>();
        V1PodList list = api.listNamespacedPod("default", null, null, null, null, null, null, null, null, null, null);
        for (V1Pod item : list.getItems()) {
            System.out.println(item.getMetadata().getName());
            System.out.println(item.getSpec().getContainers().get(0).getPorts());
            pods.add(item.getMetadata().getName());
        }
        return new PodsGetResponse(pods);
    }

    public void connect() throws Exception {
        ApiClient client = Config.defaultClient();
        Configuration.setDefaultApiClient(client);
        api = new CoreV1Api();
    }

    public void createService(HashMap<String, String> label, String serviceName) throws Exception {
        int port = 5000;
        V1Service service = new V1Service()
                .metadata(new V1ObjectMeta().name(serviceName))
                .spec(new V1ServiceSpec()
                        .selector(label)
                        .ports(
                                new ArrayList<V1ServicePort>() {{
                                    add(new V1ServicePort()
                                            .protocol("TCP")
                                            .port(port)
                                            .targetPort(new IntOrString(port)));
                                }}
                        )
                        .type("LoadBalancer"));

        // Service 생성 요청
        V1Service createdService = api.createNamespacedService("default", service, null, null, null, null);

        log.info("Service created: " + createdService.getMetadata().getName());
    }

    public void deleteService(String name) throws Exception{
        V1Service deletedServcie = api.deleteNamespacedService(name + "-service", "default", null, null, null, null, null, null);
    }

    public String createFolder(String name) throws Exception {
        String folderPath = "/canvas/" + name;
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
//         외부에서 접속시!
//        String host = "k8a601.p.ssafy.io";
//        String username = "ubuntu";
//        String privateKeyPath = "~/k3s/config/K8A601T.pem";
//        int port = 22;
//
//        try {
//            log.info("폴더 생성 시작");
//            JSch jSch = new JSch();
//
//            // SSH private key 로드
//            jSch.addIdentity(privateKeyPath);
//            log.info("SSH private key 로드 : " + privateKeyPath);
//
//            // 세션 생성 및 접속
//            Session session = jSch.getSession(username, host, port);
//            session.setConfig("StrictHostKeyChecking", "no"); // 호스트 키 검증 비활성화
//            session.connect();
//            log.info("세션 생성 및 접속");
//
//            // 명령 실행
//            ChannelExec channel = (ChannelExec) session.openChannel("exec");
//            channel.setCommand("sudo mkdir -p /k3s/project/" + name);
//            channel.connect();
//            log.info("명령 실행");
//
//            // 명령어 실행 결과 출력
//            // 예를 들어, command = "cd /; mkdir test_test"의 경우, 해당 디렉토리가 생성됩니다.
//            System.out.println("Command executed successfully.");
//
//            // 연결 종료
//            channel.disconnect();
//            session.disconnect();
//            return "/k3s/project/" + name;
//        } catch (JSchException e) {
//            throw new Exception();
//        }
//    }
}
