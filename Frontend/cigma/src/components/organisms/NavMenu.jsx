import React from 'react';
import '../../styles/organisms/NavMenu.scss';
import NavItem from '../atoms/NavItem';
import { NavLink } from 'react-router-dom';
/**
 *
 * @returns 단일NavItem 컴포넌트를 한번에 묶어서 NavMenu 컴포넌트 생성
 */
function NavMenu() {
    return (
        <div className="menu">
            <NavLink to="/download">
                <NavItem itemText={'Download'} />
            </NavLink>
            <NavLink to="/docs/intro" target="_blank">
                <NavItem itemText={'Docs'} />
            </NavLink>
            <NavItem itemText={'Github'}></NavItem>
            <NavItem itemText={'Contact'} />
        </div>
    );
}

export default NavMenu;
