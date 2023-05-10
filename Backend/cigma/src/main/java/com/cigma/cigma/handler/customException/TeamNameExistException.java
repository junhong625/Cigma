package com.cigma.cigma.handler.customException;

public class TeamNameExistException extends Exception {
    public TeamNameExistException(String message) {
        super(message);
    }
}
