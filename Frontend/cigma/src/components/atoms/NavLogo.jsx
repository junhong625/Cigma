import React from 'react';
import '../../styles/atoms/NavLogo.scss';
import logo from '../../assets/logo.svg';
import NavItem from "./NavItem";

/**
 * 
 * @returns 네비게이션 바의 로고 + NavItem(네비게이션 바 텍스트)
 */
function NavLogo() {
  return (
    <div className="logo">
      <img src={ logo} />
      <NavItem itemText={'Cigma'}/>
    </div>
  )
}

export default NavLogo