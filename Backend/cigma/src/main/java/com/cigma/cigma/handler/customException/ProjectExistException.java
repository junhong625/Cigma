package com.cigma.cigma.handler.customException;

public class ProjectExistException extends Exception{
    public ProjectExistException(String message) {
        super(message);
    }
}
