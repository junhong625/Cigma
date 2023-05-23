package com.cigma.cigma.handler.customException;

public class FullCanvasException extends Exception{
    public FullCanvasException() {
        super("Canvas가 모두 사용 중입니다.");
    }
}
