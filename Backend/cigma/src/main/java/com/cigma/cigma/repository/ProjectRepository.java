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
    // 휴지통에 들어가 있지 않은 팀 프로젝트를 모두 가져오는 JPA
    List<Project> findAllByTeam_TeamIdxAndInTrashCan(Long teamIdx, Boolean inTrashCan);
}
