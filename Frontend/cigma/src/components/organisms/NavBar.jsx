import React from 'react';
import '../../styles/organisms/NavBar.scss';
import NavItem from '../atoms/NavItem';
import NavLogo from "../atoms/NavLogo";
import NavMenu from "./NavMenu";

/**
 * 
 * @returns StartPage에서 사용되는 네비게이션 바. 로고 + 중간메뉴 + 로그인버튼
 */
function NavBar() {
    return (
        <nav>
            <NavLogo/>
            <NavMenu/>
            <NavItem itemText={'test'}></NavItem>
        </nav>
    );
}

export default NavBar;
