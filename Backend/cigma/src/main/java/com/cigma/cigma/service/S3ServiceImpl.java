package com.cigma.cigma.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.cigma.cigma.common.SecurityUtils;
import com.cigma.cigma.jwt.UserPrincipal;
import com.cigma.cigma.properties.ImageProperties;
import com.cigma.cigma.properties.S3Properties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.io.InputStream;

@Service
@Slf4j
@RequiredArgsConstructor
public class S3ServiceImpl implements S3Service{
    private final S3Properties s3Properties;
    private final ImageProperties imageProperties;
    private final AmazonS3Client amazonS3Client;
    private String basePath;

    // S3에 이미지 저장
    @Override
    public String save(MultipartFile multipartFile, String type) {
        UserPrincipal userPrincipal = SecurityUtils.getUserPrincipal();
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType("image/png");
        objectMetadata.setContentLength(multipartFile.getSize());

        switch (type) {
            case "user" :
                basePath = imageProperties.getBasePath().getUser();
                break;
            case "team" :
                basePath = imageProperties.getBasePath().getTeam();
                break;
            case "project" :
                basePath = imageProperties.getBasePath().getProject();
                break;
        }
        log.info("base path : " + basePath);
        String key = basePath + userPrincipal.getUserIdx().toString() + ".png";
        // S3 bucket에 이미지 업로드
        upload(key, objectMetadata, multipartFile);
        return getUrl(s3Properties.getBucket(), key);
    }

    public void upload(String key, ObjectMetadata objectMetadata, MultipartFile multipartFile) {
        try (InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3Client.putObject(new PutObjectRequest(s3Properties.getBucket(), key, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String getUrl(String bucket, String key) {
        return amazonS3Client.getUrl(bucket, key).toString();
    }
}
