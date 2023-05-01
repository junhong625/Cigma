package com.cigma.cigma.common;

import com.cigma.cigma.jwt.UserPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {
    public static UserPrincipal getUserPrincipal() {
        return (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
