import React from "react";
import styles from "../../styles/atoms/IconText.module.scss";


function IconText({ icon, text }) {
  return (
    <div className={styles.rowFlex}>
      <div>{icon}</div>
      <div>{text}</div>
    </div>
  )
}

export default IconText