import React from "react";
import styles from "../../styles/organisms/EmptyTeamOrganism.module.scss";

import { FaFolder } from "react-icons/fa";
function EmptyTeamOrganism() {
  return (
    <div className={styles.container}>
      <div className={styles["empty-container"]}>
        <div className={styles.icons}>
          <FaFolder style={{ fontSize: "2em", color: "#505961" }} />
          <div style={{ fontSize: "1.5em", fontWeight: "bold", color: "black" }}>
            생성된 Team이 없습니다.
          </div>
        </div>
        <div className={styles.subtitle}>왼쪽의 사이드바에서 Team을 생성해보세요!</div>
      </div>
    </div>
  );
}

export default EmptyTeamOrganism;
