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

    @GetMapping("/all")
    public CustomResponseEntity<? extends Object> getPods(@RequestParam String url) throws Exception {
        log.info("pod 조회 시작!!!!!!!");
        return ResponseHandler.generateResponse(true, "컨테이너 조회", HttpStatus.OK, canvasService.getPods(url));
    }

//    @PostMapping()
//    public CustomResponseEntity<? extends Object> joinCanvas(@RequestBody CanvasJoinRequest request) throws Exception {
//
//        return ResponseHandler.generateResponse(true, "캔버스 접속", HttpStatus.OK, canvasService.joinCanvas(request));
//    }

//    @PostMapping()
//    public CustomResponseEntity<? extends Object> setCanvas(@RequestBody CanvasCreateRequest request) throws Exception {
//        return ResponseHandler.generateResponse(true, "접속 Port 조회", HttpStatus.OK, canvasService.getPort(request.getName()));
//    }


    @PostMapping()
    public CustomResponseEntity<? extends Object> createPod(@RequestBody CanvasJoinRequest request) throws Exception {
        return ResponseHandler.generateResponse(true, "Pod 생성", HttpStatus.OK, canvasService.createPod(request));
    }
//
//    @DeleteMapping()
//    public CustomResponseEntity<? extends Object> deletePod(@RequestBody CanvasCreateRequest request) throws Exception {
//        canvasService.deletePod(request.getName());
//        return ResponseHandler.generateResponse(true, "Pod 삭제", HttpStatus.OK, null);
//    }
}
