package com.cigma.cigma.service;

import com.cigma.cigma.dto.request.ProjectCreateRequest;
import com.cigma.cigma.dto.request.ProjectPatchRequest;
import com.cigma.cigma.dto.response.ProjectGetResponse;
import com.cigma.cigma.entity.Project;
import com.cigma.cigma.entity.Team;
import com.cigma.cigma.entity.User;
import com.cigma.cigma.handler.customException.ProjectNotFoundException;
import com.cigma.cigma.handler.customException.TeamNotFoundException;

import java.util.List;
import java.util.Optional;

public interface ProjectService {

    ProjectGetResponse save(ProjectCreateRequest projectCreateRequest) throws Exception;

    void deleteById(Long id) throws Exception;

    ProjectGetResponse changeName(Long pjtIdx, ProjectPatchRequest projectPatchRequest) throws Exception;

    ProjectGetResponse changeImage(Long pjtIdx, ProjectPatchRequest projectPatchRequest) throws Exception;

    ProjectGetResponse getProject(Long pjtIdx) throws Exception;

    ProjectGetResponse insertTrashCan(Long pjtIdx) throws Exception;

    ProjectGetResponse restoreProject(Long pjtIdx) throws Exception;
}
