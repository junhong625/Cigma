package com.cigma.cigma.service;

import com.cigma.cigma.entity.Project;
import com.cigma.cigma.entity.Team;
import com.cigma.cigma.entity.User;

import java.util.Optional;

public interface ProjectService {

    void save(Project project);

    Optional<Project> findById(Long id);

    void deleteById(Long id);

}
