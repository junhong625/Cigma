package com.cigma.cigma.service;

import com.cigma.cigma.common.SecurityUtils;
import com.cigma.cigma.dto.request.TeamMateRequest;
import com.cigma.cigma.dto.request.TeamUpdateRequest;
import com.cigma.cigma.dto.response.ProjectGetResponse;
import com.cigma.cigma.dto.response.TeamGetResponse;
import com.cigma.cigma.entity.Project;
import com.cigma.cigma.entity.Team;
import com.cigma.cigma.entity.User;
import com.cigma.cigma.handler.customException.*;
import com.cigma.cigma.jwt.UserPrincipal;
import com.cigma.cigma.properties.ImageProperties;
import com.cigma.cigma.repository.ProjectRepository;
import com.cigma.cigma.repository.TeamRepository;
import com.cigma.cigma.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeamServiceImpl implements TeamService{
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final S3ServiceImpl s3Service;
    private final UserServiceImpl userService;
    private final ImageProperties imageProperties;

    @Override
    public TeamGetResponse createTeam(TeamUpdateRequest teamUpdateRequest) {
        UserPrincipal userPrincipal = SecurityUtils.getUserPrincipal();
        Optional<User> user = userRepository.findById(userPrincipal.getUserIdx());

        log.info(userPrincipal.getUserEmail() + " " + userPrincipal.getPassword() + " " + userPrincipal.getUserIdx());
        Team team = Team.builder()
                .teamLeader(user.get())
                .members("")
                .teamName(teamUpdateRequest.getTeamName())
                .teamImageUrl(imageProperties.getDefaultPath().getTeam())
                .build();
        return new TeamGetResponse(teamRepository.save(team));
    }

    @Override
    public Optional<Team> findById(Long teamIdx) {
        return teamRepository.findById(teamIdx);
    }

    @Override
    public TeamGetResponse getTeam(Long teamIdx) {
        return new TeamGetResponse(findTeam(teamIdx));
    }

    @Override
    public TeamGetResponse changeName(Team team, String teamName) throws TeamNotFoundException {
        // 유저 수정 권한 체크
        checkTeamLeaderAuthorization(team.getTeamIdx());
        TeamUpdateRequest teamUpdateRequest = new TeamUpdateRequest(team);
        teamUpdateRequest.setTeamName(teamName);
        return new TeamGetResponse(teamRepository.save(teamUpdateRequest.toEntity()));
    }

    @Override
    public TeamGetResponse changeImage(Team team, MultipartFile multipartFile) throws TeamNotFoundException {
        // 유저 수정 권한 체크
        checkTeamLeaderAuthorization(team.getTeamIdx());
        TeamUpdateRequest teamUpdateRequest = new TeamUpdateRequest(team);
        teamUpdateRequest.setTeamImageUrl(s3Service.save(multipartFile, "team", teamUpdateRequest.getTeamIdx()));
        return new TeamGetResponse(teamRepository.save(teamUpdateRequest.toEntity()));
    }

    public Team findTeam(Long teamIdx) {
        Team team = teamRepository.findById(teamIdx).get();
        return team;
    }

    @Override
    public void deleteById(Long teamIdx) {
        teamRepository.deleteById(teamIdx);
    }

    @Override
    public void checkExist(String teamName) throws TeamNameExistException {
        // 이미 존재하는 팀명이라면
        if (teamRepository.findByTeamName(teamName).isPresent()) {
            throw new TeamNameExistException("이미 존재하는 팀명입니다.");
        }
        // 존재하지 않는 팀명일 경우
    }

    @Override
    public TeamGetResponse addTeamMate(Long teamIdx, TeamMateRequest teamMateRequest) throws Exception{
        // 유저 수정 권한 체크
        checkTeamLeaderAuthorization(teamIdx);
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
//        // 유저 이메일 구분 처리
//        userEmail = "\"" + teamMateRequest.getUserEmail() + "\"";
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
        // 무료 계정 팀 최대인원 6명
        // 팀장을 빼고 가능한 팀당 인원 : 6 - 1 = 3
        if (members.split(",").length == 5) {
            throw new TeamMateFullException("팀원이 가득찼습니다.");
        }
        // members 존재 여부에 따른 member 추가
        members = members.isBlank() ? members + userEmail : members + String.format(",%s", userEmail);
        TeamUpdateRequest teamUpdateRequest = new TeamUpdateRequest(team.get());
        teamUpdateRequest.setMembers(members);
        return new TeamGetResponse(teamRepository.save(teamUpdateRequest.toEntity()));
    }

    @Override
    public TeamGetResponse popTeamMate(Long teamIdx, TeamMateRequest teamMateRequest) throws Exception {
        // 유저 수정 권한 체크
        checkTeamLeaderAuthorization(teamIdx);
        // 뺄 유저
        String userEmail = teamMateRequest.getUserEmail();
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
        String newTeamMate = "";
        for (String member: members.split(",")) {
            if (!member.equals(userEmail)) {
                newTeamMate += member + ",";
            }
        }
        // teamMate에서 마지막 , 제거 처리
        try {
            newTeamMate = newTeamMate.substring(0, newTeamMate.length() - 1);
        } catch (Exception e) {
            newTeamMate = "";
        }
        TeamUpdateRequest teamUpdateRequest = new TeamUpdateRequest(team.get());
        teamUpdateRequest.setMembers(newTeamMate);
        return new TeamGetResponse(teamRepository.save(teamUpdateRequest.toEntity()));
    }

    // 팀 수정 권한이 있는 팀장인지 확인
    public void checkTeamLeaderAuthorization(Long teamIdx) throws TeamNotFoundException {
        UserPrincipal userPrincipal = SecurityUtils.getUserPrincipal();
        Team team;
        try {
            team = findTeam(teamIdx);
        } catch (Exception e) {
            throw new TeamNotFoundException("존재하지 않는 팀입니다");
        }
        if (userPrincipal.getUserIdx() != team.getTeamLeader().getUserIdx()) {
            throw new AuthorizationServiceException("권한이 없는 유저입니다");
        }
    }

    // 팀에 속한 유저인지 확인
    public void checkTeamMembersAuthorization(Long teamIdx) throws Exception {
        User user = userService.getUserBySecurity();
        Team team;
        try {
            team = findTeam(teamIdx);
        } catch (Exception e) {
            throw new TeamNotFoundException("존재하지 않는 팀입니다.");
        }
        boolean isInclude = false;
        // 팀장인지 아닌지 체크
        if (user.getUserIdx() != team.getTeamLeader().getUserIdx()) {
            // 팀원에 포함됐는지 체크
            log.info("members : " + team.getMembers());
            for (String member : team.getMembers().replaceAll("[\\[\\] \"]", "").split(",")) {
                log.info(member + " == " + user.getUserEmail());
                if (member.equals(user.getUserEmail().toString())) {
                    isInclude = true;
                }
            }
            if (!isInclude) {
                throw new UserNotIncludeException("팀에 속해있지 않은 유저입니다.");
            }
        }
    }

    @Override
    public List<ProjectGetResponse> getMyTeamProjects(Long teamIdx, Boolean isDrop) {
        List<Project> projectList = projectRepository.findAllByTeam_TeamIdxAndInTrashCan(teamIdx, isDrop);
        List<ProjectGetResponse> response = new ArrayList<>();
        for (Project project : projectList) {
            response.add(new ProjectGetResponse(project));
        }
        return response;
    }
}
