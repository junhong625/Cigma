package com.cigma.cigma.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseHandler {
    public static ResponseEntity<Object> generateResponse(Boolean isSuccess, String message, HttpStatus status, Object data) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("isSuccess", isSuccess);
        map.put("message", message);
        map.put("status", status);
        map.put("data", data);
        System.out.println(map);
        return new ResponseEntity<Object>(map, status);
    }
}
