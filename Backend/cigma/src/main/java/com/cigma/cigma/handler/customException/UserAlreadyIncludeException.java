package com.cigma.cigma.handler.customException;

public class UserAlreadyIncludeException extends  Exception{
    public UserAlreadyIncludeException() {
        super();
    }

    public UserAlreadyIncludeException(String message) {
        super(message);
    }
}
