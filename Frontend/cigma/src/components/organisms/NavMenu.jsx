import React from 'react'
import '../../styles/organisms/NavMenu.scss';
import NavItem from "../atoms/NavItem";
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