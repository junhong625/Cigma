package com.cigma.cigma.repository;

import com.cigma.cigma.dto.response.TeamGetResponse;
import com.cigma.cigma.entity.Team;
import com.cigma.cigma.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    Optional<Team> findByTeamName(String teamName);

    @Query(value = "SELECT t FROM Team t WHERE t.teamLeader.userIdx = :userId or t.members LIKE %:userEmail%")
    List<TeamGetResponse> findAllByTeamLeader_UserIdxOrMembers(Long userId, String userEmail);

}
