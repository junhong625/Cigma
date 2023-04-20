import React from 'react';
import '../../styles/organisms/NavBar.scss';
import NavItem from '../atoms/NavItem';
import NavLogo from "../atoms/NavLogo";
import NavMenu from "./NavMenu";
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
