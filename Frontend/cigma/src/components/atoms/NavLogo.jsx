import React from "react";
import "../../styles/atoms/NavLogo.scss";
import logo from "../../assets/cigmaLogo.png";
import NavItem from "./NavItem";

/**
 *
 * @returns 네비게이션 바의 로고 + NavItem(네비게이션 바 텍스트)
 */
function NavLogo() {
  return (
    <div className="logo">
      <img src={logo} />
    </div>
  );
}

export default NavLogo;