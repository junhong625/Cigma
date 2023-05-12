package com.cigma.cigma.service;

import com.cigma.cigma.dto.response.PodsGetResponse;
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

    // Kubernetes에서 관리 중인 Pods(컨테이너 가져오기)
    // Pods내에는 여러개의 컨테이너 존재도 가능
    @Override
    public PodsGetResponse getPort() throws Exception {
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
}
