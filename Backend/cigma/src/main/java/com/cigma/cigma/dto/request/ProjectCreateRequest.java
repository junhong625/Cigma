package com.cigma.cigma.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectCreateRequest {
    private String projectUrl;

    private String projectName;
    private String projectImage;
}
