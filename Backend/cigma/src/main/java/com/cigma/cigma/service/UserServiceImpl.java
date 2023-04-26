package com.cigma.cigma.service;

import com.cigma.cigma.repository.UserRepository;
import com.cigma.cigma.dto.request.UserCreateRequest;
import com.cigma.cigma.dto.response.UserCreateResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserCreateResponse signUp(UserCreateRequest userCreateRequest) {
        System.out.println(passwordEncoder.encode(userCreateRequest.getUserPass()));

        // email(아이디) 유일성 검사
        System.out.println(userRepository.findByUserEmail(userCreateRequest.getUserEmail()).get());
        if (userRepository.findByUserEmail(userCreateRequest.getUserEmail()).isPresent()) {
            throw new RuntimeException("이미 등록된 email 입니다.");
        }

        return new UserCreateResponse(userRepository.save(userCreateRequest.toEntity()));
    }
}
