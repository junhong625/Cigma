package com.cigma.cigma.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;

@Data
@AllArgsConstructor
public class TeamCreateRequest {
    private String members;
    private String teamName;
    private String teamImage;
}
