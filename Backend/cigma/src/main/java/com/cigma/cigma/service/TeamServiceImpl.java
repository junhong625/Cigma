package com.cigma.cigma.service;

import com.cigma.cigma.entity.Team;
import com.cigma.cigma.entity.User;
import com.cigma.cigma.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeamServiceImpl implements TeamService{
    private final TeamRepository teamRepository;


    @Override
    public void save(Team team) {
        teamRepository.save(team);
    }

    @Override
    public Optional<Team> findById(Long teamIdx) {
        return teamRepository.findById(teamIdx);
    }

    @Override
    public void deleteById(Long teamIdx) {
        teamRepository.deleteById(teamIdx);
    }

    @Override
    public Optional<Team> findByTeamLeader(User user) {
        return teamRepository.findByTeamLeader(user);
    }
}
