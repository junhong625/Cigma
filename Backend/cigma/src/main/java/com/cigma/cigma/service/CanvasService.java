package com.cigma.cigma.service;

import com.cigma.cigma.dto.request.CanvasJoinRequest;
import com.cigma.cigma.dto.response.CanvasGetResponse;
import com.cigma.cigma.dto.response.PodsGetResponse;

public interface CanvasService {
    PodsGetResponse getPods() throws Exception;

    CanvasGetResponse joinCanvas(CanvasJoinRequest request) throws Exception;

    PodsGetResponse createPod(String name) throws Exception;

    void deletePod(String name) throws Exception;
}
