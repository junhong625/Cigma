package com.cigma.cigma.handler.customException;

public class AllCanvasUsingException extends Exception{
    public AllCanvasUsingException() {
        super("모든 Canvas가 사용중입니다.");
    }
}
