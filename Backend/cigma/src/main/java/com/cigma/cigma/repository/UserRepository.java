package com.cigma.cigma.repository;

import com.cigma.cigma.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // 이메일(아이디) 조회
    Optional<User> findByUserEmail(String userEmail);
}
