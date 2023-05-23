import React from 'react';
import '../../styles/organisms/NavBar.scss';
import NavItem from '../atoms/NavItem';
import NavLogo from '../atoms/NavLogo';
import NavMenu from './NavMenu';
import { NavLink } from 'react-router-dom';

/**
 *
 * @returns StartPage에서 사용되는 네비게이션 바. 로고 + 중간메뉴 + 로그인버튼
 */
function NavBar() {
    return (
        <nav>
            <NavLogo />
            <NavMenu />
            <div className="navBar">
            <NavLink to="/login">
                <NavItem itemText={'Login'}></NavItem>
            </NavLink>
            </div>
            
        </nav>
    );
}

export default NavBar;
