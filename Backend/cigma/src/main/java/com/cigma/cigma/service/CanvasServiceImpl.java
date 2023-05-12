package com.cigma.cigma.service;

import com.amazonaws.services.ec2.AmazonEC2Client;
import com.cigma.cigma.dto.request.CanvasJoinRequest;
import com.cigma.cigma.dto.response.CanvasGetResponse;
import com.cigma.cigma.dto.response.PodsGetResponse;
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
import lombok.extern.slf4j.Slf4j;
import okhttp3.OkHttpClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@Slf4j
public class CanvasServiceImpl implements CanvasService{
    private CoreV1Api api;

    public CanvasServiceImpl() throws Exception {
        connect();
        api = new CoreV1Api();
    }

    @Override
    public PodsGetResponse createPod(String name) throws Exception {
        try {
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
            createService(label, port);
        } catch (Exception e) {
            System.err.println("Exception when creating Pod: " + e.getMessage());
        }
        return null;
    }

    @Override
    public void deletePod(String name) throws Exception {
        System.out.println(name);
        api.deleteNamespacedPod(name, "default", null, null, null, null, null, new V1DeleteOptions());
        log.info("pod 삭제 완료");
        deleteService(name);
        log.info("service 삭제 완료");
    }

    @Override
    public CanvasGetResponse joinCanvas(CanvasJoinRequest request) throws Exception {
        String name = request.getTeamName() + "_" + request.getPjtName();
        createFolder(name);
        V1Service service = api.readNamespacedService(name + "-service", "default", null);
        return CanvasGetResponse.builder()
                .name(name)
                .port(service.getSpec().getPorts().get(0).getNodePort())
                .build();
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
    }

    public void createService(HashMap<String, String> label, int port) throws Exception {
        V1Service service = new V1Service()
                .metadata(new V1ObjectMeta().name(label.get("app") + "-service"))
                .spec(new V1ServiceSpec()
                        .selector(label)
                        .ports(
                                new ArrayList<V1ServicePort>() {{
                                    add(new V1ServicePort()
                                            .name("http")
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

    public void createFolder(String name) throws Exception {
        String host = "k8a601.p.ssafy.io";
        String username = "ubuntu";
        String privateKeyPath = "C:\\Users\\SSAFY\\Downloads\\K8A601T.pem";
        int port = 22;

        try {
            JSch jSch = new JSch();

            // SSH private key 로드
            jSch.addIdentity(privateKeyPath);
            log.info("SSH private key 로드 : " + privateKeyPath);

            // 세션 생성 및 접속
            Session session = jSch.getSession(username, host, port);
            session.setConfig("StrictHostKeyChecking", "no"); // 호스트 키 검증 비활성화
            session.connect();
            log.info("세션 생성 및 접속");

            // 명령 실행
            ChannelExec channel = (ChannelExec) session.openChannel("exec");
            channel.setCommand("cd /; sudo mkdir" + name);
            channel.connect();
            log.info("명령 실행");

            // 명령어 실행 결과 출력
            // 예를 들어, command = "cd /; mkdir test_test"의 경우, 해당 디렉토리가 생성됩니다.
            System.out.println("Command executed successfully.");

            // 연결 종료
            channel.disconnect();
            session.disconnect();
        } catch (JSchException e) {
            e.printStackTrace();
        }
    }
}
