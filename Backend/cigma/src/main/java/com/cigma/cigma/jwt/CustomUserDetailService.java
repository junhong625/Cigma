package com.cigma.cigma.jwt;

import com.cigma.cigma.entity.User;
import com.cigma.cigma.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // 존재하는 사용자인지 확인
        User user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("등록되지 않은 이메일입니다 : " + email));
        // 인증된 유저일 경우 유저 정보 생성 및 반환
        return UserPrincipal.create(user);
    }
}
