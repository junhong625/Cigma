package com.cigma.cigma.service;

import com.cigma.cigma.common.SecurityUtils;
import com.cigma.cigma.dto.request.TeamMateRequest;
import com.cigma.cigma.dto.request.TeamCreateRequest;
import com.cigma.cigma.dto.response.TeamGetResponse;
import com.cigma.cigma.entity.Team;
import com.cigma.cigma.entity.User;
import com.cigma.cigma.handler.customException.*;
import com.cigma.cigma.jwt.UserPrincipal;
import com.cigma.cigma.repository.TeamRepository;
import com.cigma.cigma.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeamServiceImpl implements TeamService{
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;


    @Override
    public void save(Team team) {
        teamRepository.save(team);
    }

    @Override
    public TeamGetResponse createTeam(TeamCreateRequest teamCreateRequest) {
        UserPrincipal userPrincipal = SecurityUtils.getUserPrincipal();
        Optional<User> user = userRepository.findById(userPrincipal.getUserIdx());

        log.info(userPrincipal.getUserEmail() + " " + userPrincipal.getPassword() + " " + userPrincipal.getUserIdx());
//                teammates = teammates.substring(1, teammates.length()-1);  // 리스트로 보내준 [A,B,C,..] 를 앞 뒤 [] 자름
//                String[] mates = teammates.split(",");  // 위에서 자른 문자열을 다시 , 를 기준으로 split
        Team team = Team.builder()
                .teamLeader(user.get())
                .members("")
                .teamName(teamCreateRequest.getTeamName())
                .build();
//                team.setTeamLeader(user.get());
//                team.setTeamMate(teammates);
//                team.setTeamName(teamCreateRequest.getTeamName());
//                team.setTeamImage(teamCreateRequest.getTeamImage());
        return new TeamGetResponse(teamRepository.save(team));
    }

    @Override
    public Optional<Team> findById(Long teamIdx) {
        return teamRepository.findById(teamIdx);
    }

    @Override
    public TeamGetResponse getTeam(Long teamIdx) {
        Team team = teamRepository.findById(teamIdx).get();
        return new TeamGetResponse(team);
    }

    @Override
    public void deleteById(Long teamIdx) {
        teamRepository.deleteById(teamIdx);
    }

    @Override
    public TeamGetResponse addTeamMate(Long teamIdx, TeamMateRequest teamMateRequest) throws Exception{
        // 팀원 추가를 요청한 유저
        UserPrincipal requestUser = SecurityUtils.getUserPrincipal();
        String userEmail = teamMateRequest.getUserEmail();
        log.info("teamIdx : " + teamIdx);
        log.info("userEmail: " + userEmail);
        // 추가할 유저
        Optional<User> user = userRepository.findByUserEmail(userEmail);
//        log.info("추가할 유저 : " + user.get().getUserEmail());
        // 유저를 추가할 팀
        Optional<Team> team = teamRepository.findById(teamIdx);
        // 발생 가능한 Exception 처리
        if (requestUser.getUserIdx() != team.get().getTeamLeader().getUserIdx()) {
            throw new AuthorizationServiceException("팀원 추가, 삭제는 팀장에게만 부여된 권한입니다.");
        }
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("없는 유저입니다.");
        }
        if (team.isEmpty()) {
            throw new TeamNotFoundException("존재하지 않는 팀입니다.");
        }
        String members = team.get().getMembers();
        if (members.contains(userEmail) || userEmail.equals(team.get().getTeamLeader().getUserEmail())) {
            throw new UserAlreadyIncludeException("이미 추가된 유저입니다.");
        }
        log.info("members : " + members);
        log.info("포함 여부 : " + userEmail.equals(team.get().getTeamLeader().getUserEmail()));
        log.info("userEmail : " + userEmail + "/ teamLeader : " + team.get().getTeamLeader().getUserEmail());
        // 무료 계정 팀 최대인원 4명
        // 팀장을 빼고 가능한 팀당 인원 : 4 - 1 = 3
        if (members.split(",").length == 3) {
            throw new TeamMateFullException("팀원이 가득찼습니다.");
        }
        // members 존재 여부에 따른 member 추가
        members = members.isBlank() ? members + userEmail : members + String.format(",%s", userEmail);
        TeamCreateRequest teamCreateRequest = new TeamCreateRequest(team.get());
        teamCreateRequest.setMembers(members);
        return new TeamGetResponse(teamRepository.save(teamCreateRequest.toEntity()));
    }

    @Override
    public TeamGetResponse popTeamMate(Long teamIdx, TeamMateRequest teamMateRequest) throws Exception {
        String userEmail = teamMateRequest.getUserEmail();
        // 뺄 유저
        Optional<User> user = userRepository.findByUserEmail(userEmail);
        // 뺄 팀
        Optional<Team> team = teamRepository.findById(teamIdx);
        String members = team.get().getMembers();
        // 발생 가능한 Exception 처리
        if (team.isEmpty()) {
            throw new TeamNotFoundException("존재하지 않는 팀입니다.");
        }
        if (members.isBlank()) {
            throw new TeamMateNullException("팀원이 없습니다.");
        }
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("없는 유저입니다.");
        }
        if (!members.contains(userEmail)) {
            throw new UserNotIncludeException("팀에 속해있지 않은 유저입니다.");
        }
        members = members.replace(userEmail, "");
        String newTeamMate = "";
        for (String member: members.split(",")) {
            if (!member.isBlank()) {
                if (!newTeamMate.isBlank()) {
                    newTeamMate += ",";
                }
                newTeamMate += member;
            }
        }
        TeamCreateRequest teamCreateRequest = new TeamCreateRequest(team.get());
        teamCreateRequest.setMembers(newTeamMate);
        return new TeamGetResponse(teamRepository.save(teamCreateRequest.toEntity()));
    }

    @Override
    public Optional<Team> findByTeamLeader(User user) {
        return teamRepository.findByTeamLeader(user);
    }
}
