package com.cigma.cigma.service;

import com.cigma.cigma.entity.Team;
import com.cigma.cigma.entity.User;

import java.util.Optional;

public interface TeamService {
    void save(Team team);

    Optional<Team> findById(Long teamIdx);

    void deleteById(Long teamIdx);

}
