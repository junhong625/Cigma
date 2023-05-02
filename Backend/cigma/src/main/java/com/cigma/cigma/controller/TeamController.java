package com.cigma.cigma.controller;

import com.cigma.cigma.common.SecurityUtils;
import com.cigma.cigma.dto.request.TeamCreateRequest;
import com.cigma.cigma.dto.request.TeamMembersRequest;
import com.cigma.cigma.dto.request.TeamPatchRequest;
import com.cigma.cigma.entity.Team;
import com.cigma.cigma.entity.User;
import com.cigma.cigma.handler.ResponseHandler;
import com.cigma.cigma.jwt.UserPrincipal;
import com.cigma.cigma.service.TeamServiceImpl;
import com.cigma.cigma.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
@Slf4j
public class TeamController {
    private final UserServiceImpl userService;
    private final TeamServiceImpl teamService;


    // 팀생성
    @PostMapping()
    public ResponseEntity<? extends Object> createTeam(HttpServletRequest request, @RequestBody TeamCreateRequest teamCreateRequest) throws IOException {
        try {
            UserPrincipal userPrincipal = SecurityUtils.getUserPrincipal();
            Optional<User> user = userService.findById(userPrincipal.getUserIdx());

            log.info(userPrincipal.getUserEmail() + " " + userPrincipal.getPassword() + " " + userPrincipal.getUserIdx());

            if(user.isPresent()) {
                String teammates = teamCreateRequest.getMembers();
//                teammates = teammates.substring(1, teammates.length()-1);  // 리스트로 보내준 [A,B,C,..] 를 앞 뒤 [] 자름
//                String[] mates = teammates.split(",");  // 위에서 자른 문자열을 다시 , 를 기준으로 split
                Team team = new Team(user.get(), teammates, teamCreateRequest.getTeamName(), teamCreateRequest.getTeamImage());
//                team.setTeamLeader(user.get());
//                team.setTeamMate(teammates);
//                team.setTeamName(teamCreateRequest.getTeamName());
//                team.setTeamImage(teamCreateRequest.getTeamImage());
                teamService.save(team);
                return ResponseHandler.generateResponse(true, "팀생성 성공", HttpStatus.CREATED, null);

            } else {  // 존재하지 않는 유저
                return ResponseHandler.generateResponse(false, "존재하지 않는 사용자입니다", HttpStatus.BAD_REQUEST, null);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse(false, "팀생성 실패", HttpStatus.BAD_REQUEST, null);
        }
    }

    // 팀삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<? extends Object> deleteTeam(HttpServletRequest request, @PathVariable("id") Long teamIdx) throws IOException {
        try {
            UserPrincipal userPrincipal = SecurityUtils.getUserPrincipal();
            Optional<User> user = userService.findById(userPrincipal.getUserIdx());

            log.info(userPrincipal.getUserEmail() + " " + userPrincipal.getPassword() + " " + userPrincipal.getUserIdx());

            if (user.isPresent()) {
                Optional<Team> team = teamService.findById(teamIdx);

                if (user.get() == team.get().getTeamLeader()) {  // 삭제하려는 사람이 팀리더면
                    teamService.deleteById(teamIdx);  // 삭제
                    return ResponseHandler.generateResponse(true, "팀삭제 성공", HttpStatus.CREATED, null);
                } else {  // 삭제하려는 사람이 리더가 아니면
                    return ResponseHandler.generateResponse(false, "삭제 권한 없음", HttpStatus.UNAUTHORIZED, null);
                }
            } else {  // 존재하지 않는 유저
                return ResponseHandler.generateResponse(false, "존재하지 않는 사용자입니다", HttpStatus.BAD_REQUEST, null);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse(false, "팀삭제 실패", HttpStatus.BAD_REQUEST, null);
        }
    }

    // 팀명 변경
    @PatchMapping("/{id}")
    public ResponseEntity<? extends Object> changeTeamname(HttpServletRequest request, @PathVariable("id") Long teamIdx, @RequestBody TeamPatchRequest teamPatchRequest) throws IOException {
        try {
            UserPrincipal userPrincipal = SecurityUtils.getUserPrincipal();
            Optional<User> user = userService.findById(userPrincipal.getUserIdx());

            if (user.isPresent()) {
                Optional<Team> team = teamService.findById(teamIdx);

                if (user.get() == team.get().getTeamLeader()) {  // 변경하려는 사람이 팀리더면
                    team.get().setTeamName(teamPatchRequest.getTeamName());  // 팀이름 바꿔서
                    teamService.save(team.get());  // 저장
                    return ResponseHandler.generateResponse(true, "팀이름 변경 성공", HttpStatus.CREATED, null);
                } else {  // 변경하려는 사람이 리더가 아니면
                    return ResponseHandler.generateResponse(false, "변경 권한 없음", HttpStatus.UNAUTHORIZED, null);
                }
            } else {  // 존재하지 않는 유저
                return ResponseHandler.generateResponse(false, "존재하지 않는 사용자입니다", HttpStatus.BAD_REQUEST, null);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse(false, "팀이름변경 실패", HttpStatus.BAD_REQUEST, null);
        }
    }

    @PatchMapping("members/{id}")
    public ResponseEntity<? extends Object> changeMembers(HttpServletRequest request, @PathVariable("id") Long teamIdx, @RequestBody TeamMembersRequest teamMembersRequest) throws IOException {
        try {
            UserPrincipal userPrincipal = SecurityUtils.getUserPrincipal();
            Optional<User> user = userService.findById(userPrincipal.getUserIdx());

            if (user.isPresent()) {

                Optional<Team> team = teamService.findById(teamIdx);

                if (user.get() == team.get().getTeamLeader()) {  // 변경하려는 사람이 팀리더면
                    team.get().setTeamMate(teamMembersRequest.getMembers());  // 팀원 바꿔서
                    teamService.save(team.get());  // 저장
                    return ResponseHandler.generateResponse(true, "팀원 변경 성공", HttpStatus.CREATED, null);
                } else {  // 변경하려는 사람이 리더가 아니면
                    return ResponseHandler.generateResponse(false, "변경 권한 없음", HttpStatus.UNAUTHORIZED, null);
                }
            } else {  // 존재하지 않는 유저
                return ResponseHandler.generateResponse(false, "존재하지 않는 사용자입니다", HttpStatus.BAD_REQUEST, null);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse(false, "팀원변경 실패", HttpStatus.BAD_REQUEST, null);
        }
    }

}
