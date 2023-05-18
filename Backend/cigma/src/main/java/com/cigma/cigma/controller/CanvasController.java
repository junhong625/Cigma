package com.cigma.cigma.controller;

import com.cigma.cigma.common.CustomResponseEntity;
import com.cigma.cigma.dto.request.CanvasJoinRequest;
import com.cigma.cigma.handler.ResponseHandler;
import com.cigma.cigma.service.CanvasServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/canvas")
@RequiredArgsConstructor
@Slf4j
public class CanvasController {

    private final CanvasServiceImpl canvasService;

    @PostMapping()
    public CustomResponseEntity<? extends Object> openCanvas(@RequestBody CanvasJoinRequest request) throws Exception {

        return ResponseHandler.generateResponse(true, "캔버스 접속", HttpStatus.OK, canvasService.openCanvas(request));
    }

    @DeleteMapping()
    public CustomResponseEntity<? extends Object> closeCanvas(@RequestBody CanvasJoinRequest request) throws Exception {
        canvasService.closeCanvas(request);
        return ResponseHandler.generateResponse(true, "캔버스 종료", HttpStatus.OK, null);
    }
}
