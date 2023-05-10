package com.cigma.cigma.repository;

import com.cigma.cigma.entity.Project;
import com.cigma.cigma.entity.Team;
import com.cigma.cigma.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByTeam_TeamIdx(Long teamIdx);
}
