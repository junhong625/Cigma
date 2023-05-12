package com.cigma.cigma.config;

import io.kubernetes.client.util.Config;
import io.kubernetes.client.util.KubeConfig;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;

public class K8sConfig extends Config {

    public K8sConfig() {
        super();
    }
}
