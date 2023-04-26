//package com.ssafy.finedUi.handler;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//import org.springframework.web.server.MethodNotAllowedException;
//import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
//
//import java.util.NoSuchElementException;
//
//@RestControllerAdvice
//public class AllExceptionHandler extends ResponseEntityExceptionHandler {
//    @ExceptionHandler(MethodNotAllowedException.class)
//    public final ResponseEntity<Object> handleMethodNotAllowedExceptions(MethodNotAllowedException e) {
//        return ResponseHandler.generateResponse(false, e.getMessage(), HttpStatus.METHOD_NOT_ALLOWED, null);
//    }
//
//    @ExceptionHandler(NullPointerException.class)
//    public final ResponseEntity<Object> handleNullPointerExceptions(NullPointerException e) {
//        return ResponseHandler.generateResponse(false, e.getMessage(), HttpStatus.NOT_FOUND, null);
//    }
//
//    @ExceptionHandler(NoSuchElementException.class)
//    public final ResponseEntity<Object> handleNoSuchElementExceptions(NoSuchElementException e) {
//        return ResponseHandler.generateResponse(false, e.getMessage(), HttpStatus.BAD_REQUEST, null);
//    }
//
//    @ExceptionHandler(Exception.class)
//    public final ResponseEntity<Object> handleAllElementExceptions(Exception e) {
//        return ResponseHandler.generateResponse(false, e.getMessage(), HttpStatus.BAD_REQUEST, null);
//    }
//}
