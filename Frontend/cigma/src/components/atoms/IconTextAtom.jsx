import React from "react";
import styles from "../../styles/atoms/IconTextAtom.module.scss";

// Sidebar에 사용하는 아이콘 + 문자를 위한 atom
function IconTextAtom({ icon, text, openTeams = true }) {
  return (
    <div className={`${styles.rowFlex} ${openTeams ? styles.gap : ""}`}>
      <div className={openTeams ? styles.icon : styles.bigIcon}>{icon}</div>
      <div className={openTeams ? styles.text : styles.noText}>{text}</div>
    </div>
  );
}

export default IconTextAtom;
