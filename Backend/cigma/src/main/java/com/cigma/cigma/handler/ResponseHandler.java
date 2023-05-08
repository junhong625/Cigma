package com.cigma.cigma.handler;

import com.cigma.cigma.common.CustomResponseEntity;
import org.springframework.http.HttpStatus;

public class ResponseHandler {
    public static CustomResponseEntity generateResponse(boolean isSuccess, String message, HttpStatus status, Object data) {
        return CustomResponseEntity.builder()
                .isSuccess(isSuccess)
                .message(message)
                .status(status)
                .data(data)
                .build();

    }
}
