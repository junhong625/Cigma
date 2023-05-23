package com.cigma.cigma.jwt;

import com.cigma.cigma.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Getter
@AllArgsConstructor
@Builder
public class UserPrincipal implements UserDetails {
    private Long userIdx;
    private String userEmail;
    private String userPass;
    private Collection<? extends GrantedAuthority> authorities;

    @Setter
    private Map<String, Object> attributes;

    public static UserPrincipal create(User user) {
        // 권한 저장(아직 관리자 계정을 추가할 계획이 없기에 사용자 권한 ROLL_USER로 지정)
        List<GrantedAuthority> authorities = new ArrayList<>();
        switch (user.getIsAdmin()) {
            case 0:
                authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLL_FREE"));
                break;
            case 1:
                authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLL_PAID"));
                break;
            case 2:
                authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLL_ADMIN"));
                break;
        }
        return UserPrincipal.builder()
                .userIdx(user.getUserIdx())
                .userEmail(user.getUserEmail())
                .userPass(user.getUserPass())
                .authorities(authorities)
                .attributes(null).build();
    }
    public static UserPrincipal create(User user, Collection<? extends GrantedAuthority> authorities) {
        // 권한 저장(아직 관리자 계정을 추가할 계획이 없기에 사용자 권한 ROLL_USER로 지정)
        return UserPrincipal.builder()
                .userIdx(user.getUserIdx())
                .userEmail(user.getUserEmail())
                .userPass(user.getUserPass())
                .authorities(authorities)
                .attributes(null).build();
    }

    @Override
    public String getPassword() {
        return this.userPass;
    }

    @Override
    public String getUsername() {
        return this.userEmail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

