package com.cigma.cigma.handler.customException;

public class ProjectNotFoundException extends Exception{
    public ProjectNotFoundException(String message) {
        super(message);
    }
}
