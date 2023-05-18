package com.cigma.cigma.handler;

import com.cigma.cigma.common.CustomResponseEntity;
import com.cigma.cigma.handler.customException.FullCanvasException;
import com.cigma.cigma.handler.customException.ProjectNotFoundException;
import com.cigma.cigma.handler.customException.TeamMateNullException;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.MethodNotAllowedException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class AllExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(MethodNotAllowedException.class)
    public final CustomResponseEntity<Object> handleMethodNotAllowedExceptions(MethodNotAllowedException e) {
        return ResponseHandler.generateResponse(false, e.getMessage(), HttpStatus.METHOD_NOT_ALLOWED, null);
    }

    @ExceptionHandler({NullPointerException.class, UsernameNotFoundException.class, TeamMateNullException.class, ProjectNotFoundException.class})
    public final CustomResponseEntity<Object> handleNullExceptions(Exception e) {
        return ResponseHandler.generateResponse(false, e.getMessage(), HttpStatus.NOT_FOUND, null);
    }

    @ExceptionHandler({AuthorizationServiceException.class, AuthenticationException.class, JwtException.class})
    public final CustomResponseEntity<Object> handleAuthorizationServiceExceptions(AuthorizationServiceException e) {
        return ResponseHandler.generateResponse(false, e.getMessage(), HttpStatus.UNAUTHORIZED, null);
    }

    @ExceptionHandler({FullCanvasException.class})
    public final CustomResponseEntity<Object> handleConflictExceptions(Exception e) {
        return ResponseHandler.generateResponse(false, e.getMessage(), HttpStatus.CONFLICT, null);
    }

//    @ExceptionHandler({JwtException.class})
//    public final CustomResponseEntity<Object> handleJwtExceptions(JwtException e) {
//        return ResponseHandler.generateResponse(false, e.getMessage(), HttpStatus.UNAUTHORIZED, null);
//    }

    @ExceptionHandler(Exception.class)
    public final CustomResponseEntity<Object> handleAllElementExceptions(Exception e) {
        return ResponseHandler.generateResponse(false, e.getMessage(), HttpStatus.BAD_REQUEST, null);
    }
}
