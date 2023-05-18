package com.cigma.cigma.service;

import com.cigma.cigma.dto.request.CanvasJoinRequest;
import com.cigma.cigma.dto.response.CanvasGetResponse;
import com.cigma.cigma.dto.response.PodsGetResponse;

public interface CanvasService {
    CanvasGetResponse openCanvas(CanvasJoinRequest request) throws Exception;

    void closeCanvas(CanvasJoinRequest request) throws Exception;
}
