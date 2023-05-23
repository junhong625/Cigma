package com.cigma.cigma.common;

import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@ToString
public class CustomResponseEntity<T> extends ResponseEntity<T> {
    private final boolean isSuccess;
    private final String message;
    private final Object data;

    public CustomResponseEntity(HttpStatus status, boolean isSuccess, String message, Object data) {
        super((T) data, null, status);
        this.isSuccess = isSuccess;
        this.message = message;
        this.data = data;
    }
}
