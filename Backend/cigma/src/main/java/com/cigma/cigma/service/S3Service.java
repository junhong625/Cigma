package com.cigma.cigma.service;

import org.springframework.web.multipart.MultipartFile;

public interface S3Service {
    public String save(MultipartFile multipartFile, String type, Long idx);
}
