package com.cigma.cigma.service;

import com.cigma.cigma.entity.Team;
import com.cigma.cigma.repository.TeamRepository;
import com.cigma.cigma.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeamServiceImpl implements TeamService{
    private final TeamRepository teamRepository;

    public void save(Team team) {
        teamRepository.save(team);
    }
}
