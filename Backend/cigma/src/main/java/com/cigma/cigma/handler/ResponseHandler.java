package com.cigma.cigma.handler;

import com.cigma.cigma.common.CustomResponseEntity;
import org.springframework.http.HttpStatus;

public class ResponseHandler {
    public static CustomResponseEntity generateResponse(boolean isSuccess, String message, HttpStatus status, Object data) {
        return new CustomResponseEntity(status, isSuccess, message, data);

    }
}
