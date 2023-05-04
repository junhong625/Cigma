package com.cigma.cigma.handler.customException;

public class UserNotIncludeException extends  Exception{
    public UserNotIncludeException() {
        super();
    }

    public UserNotIncludeException(String message) {
        super(message);
    }
}
