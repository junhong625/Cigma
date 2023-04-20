import React from 'react';
import '../organisms/NavBar.scss';
import NavItem from '../atoms/NavItem';
function NavBar() {
    return (
        <nav>
            <NavItem itemText={'test'}></NavItem>
            <NavItem itemText={'test'}></NavItem>
        </nav>
    );
}

export default NavBar;
