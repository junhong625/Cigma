package com.cigma.cigma.handler;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
@Builder
public class JwtResponse {
    private HttpStatus status;
    private String message;
}
