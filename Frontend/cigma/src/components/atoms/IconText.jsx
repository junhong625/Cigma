import React from "react";
import styles from "../../styles/atoms/IconText.module.scss";

function IconText({ icon, text, openTeams = true }) {
  return (
    <div className={`${styles.rowFlex} ${openTeams ? styles.gap : ""}`}>
      <div className={openTeams ? styles.icon : styles.bigIcon}>{icon}</div>
      <div className={openTeams ? styles.text : styles.noText}>{text}</div>
    </div>
  );
}

export default IconText;
