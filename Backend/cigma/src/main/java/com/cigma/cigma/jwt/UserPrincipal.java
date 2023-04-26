package com.cigma.cigma.jwt;

import com.cigma.cigma.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Getter
@AllArgsConstructor
public class UserPrincipal implements UserDetails {
    private Long userIdx;
    private String userEmail;
    private String userPass;
    private Collection<? extends GrantedAuthority> authorities;

    @Setter
    private Map<String, Object> attributes;

    public static UserPrincipal create(User user) {
        // 권한 저장(아직 관리자 계정을 추가할 계획이 없기에 사용자 권한 ROLL_USER로 지정)
        List<GrantedAuthority> authorityList = Collections.singletonList(new SimpleGrantedAuthority("ROLL_USER"));
        return new UserPrincipal(
                user.getUserIdx(),
                user.getUserEmail(),
                user.getUserPass(),
                authorityList,
                null
        );
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

