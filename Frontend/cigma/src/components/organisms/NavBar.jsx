import React from 'react';
import '../../styles/organisms/NavBar.scss';
import NavItem from '../atoms/NavItem';
import NavLogo from "../atoms/NavLogo";
function NavBar() {
    return (
        <nav>
            <NavLogo/>
            <NavItem itemText={'Logo 들어갈 자리'}></NavItem>
            <NavItem itemText={'test'}></NavItem>
        </nav>
    );
}

export default NavBar;
