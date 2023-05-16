package com.cigma.cigma.config;

import io.fabric8.kubernetes.client.Config;
import io.fabric8.kubernetes.client.ConfigBuilder;
import io.fabric8.kubernetes.client.DefaultKubernetesClient;
import io.fabric8.kubernetes.client.KubernetesClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class K3sConfig {

    @Bean
    public KubernetesClient kubernetesClient() {
        // k3s API 서버 URL 및 인증 정보를 구성합니다.
        Config config = new ConfigBuilder()
                .withMasterUrl("https://127.0.0.1:443")
                .withOauthToken("K103e214ca89e0b63176b529cf973c760a9313e8df2b8880660bb4e22919da3b28a::server:46f187721f35e22dc0a85381bf1adf09")
                .build();

        // KubernetesClient 인스턴스를 생성하여 반환합니다.
        return new DefaultKubernetesClient(config);
    }
}