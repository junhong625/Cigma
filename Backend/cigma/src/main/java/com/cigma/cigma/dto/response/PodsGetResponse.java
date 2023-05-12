package com.cigma.cigma.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class PodsGetResponse {
    private List<String> pods;

    public PodsGetResponse(List<String> pods) {
        this.pods = pods;
    }
}
