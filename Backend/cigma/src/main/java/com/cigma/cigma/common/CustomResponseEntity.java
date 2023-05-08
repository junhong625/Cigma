package com.cigma.cigma.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
@Builder
public class CustomResponseEntity<T> {
    private final boolean isSuccess;
    private final String message;
    private final HttpStatus status;
    private final Object data;
}
