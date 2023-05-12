package com.cigma.cigma.service;

import com.cigma.cigma.dto.response.PodsGetResponse;

import java.io.IOException;

public interface CanvasService {
    PodsGetResponse getPort() throws Exception;

    PodsGetResponse createPod(String name) throws Exception;

    void deletePod(String name) throws Exception;
}
