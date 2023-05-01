package com.cigma.cigma.controller;

import com.cigma.cigma.common.SecurityUtils;
import com.cigma.cigma.dto.request.TeamCreateRequest;
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

    @PostMapping()
    public ResponseEntity<? extends Object> createTeam(HttpServletRequest request, @RequestBody TeamCreateRequest teamCreateRequest) throws IOException {
        try {
            UserPrincipal userPrincipal = SecurityUtils.getUserPrincipal();
            Optional<User> user = userService.findByUserEmail(userPrincipal.getUserEmail());

            if(user.isPresent()) {
                String teammates = teamCreateRequest.getMembers();
//                teammates = teammates.substring(1, teammates.length()-1);  // 리스트로 보내준 [A,B,C,..] 를 앞 뒤 [] 자름
//                String[] mates = teammates.split(",");  // 위에서 자른 문자열을 다시 , 를 기준으로 split
                Team team = new Team();
                team.setTeamLeader(user.get());
                team.setTeamMate(teammates);
                team.setTeamName(teamCreateRequest.getTeamName());
                team.setTeamImage(teamCreateRequest.getTeamImage());
                teamService.save(team);
            }

            return ResponseHandler.generateResponse(true, "팀생성 성공", HttpStatus.CREATED, null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse(false, "팀생성 실패", HttpStatus.BAD_REQUEST, null);
        }
    }

}
