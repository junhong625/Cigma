package com.cigma.cigma.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "image")
public class ImageProperties {
    private BasePath basePath;
    private DefaultPath defaultPath;
}
