package com.cigma.cigma.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "jwt") // application.yml에서 jwt로 시작하는 property 가져오기
public class JwtProperties {
    private String secret;
    private String header;
    private long accessTokenValidityInSeconds;
    private long refreshTokenValidityInSeconds;
}
