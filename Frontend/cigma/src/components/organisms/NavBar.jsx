import React from 'react';
import '../../styles/organisms/NavBar.scss';
import NavItem from '../atoms/NavItem';
function NavBar() {
    return (
        <nav>
            <NavItem itemText={'Logo 들어갈 자리'}></NavItem>
            <NavItem itemText={'test'}></NavItem>
        </nav>
    );
}

export default NavBar;
