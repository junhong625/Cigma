import React from 'react'
import '../../styles/organisms/NavMenu.scss';
import NavItem from "../atoms/NavItem";
/**
 * 
 * @returns 단일NavItem 컴포넌트를 한번에 묶어서 NavMenu 컴포넌트 생성
 */
function NavMenu() {
  return (
    <div className="menu">
      <NavItem itemText={'Download'} />
      <NavItem itemText={'Docs'} />
      <NavItem itemText={'Github'} />
      <NavItem itemText={'Contact'}/>
    </div>
  )
}

export default NavMenu