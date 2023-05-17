import React from "react";
import styles from "../../styles/organisms/EmptyProjectOrganism.module.scss";

import { FaFolder } from "react-icons/fa";
function EmptyProjectOrganism() {
  return (
    <div className={styles.container}>
      <div className={styles["empty-container"]}>
        <div className={styles.icons}>
          <FaFolder style={{ fontSize: "2em", color: "#505961" }} />
          <div style={{ fontSize: "1.5em", fontWeight: "bold", color: "black" }}>
            생성된 프로젝트가 없습니다.
          </div>
        </div>
        {/* 프로젝트 생성 버튼*/}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <div
            className={styles.button}
            onClick={() => {
              // 프로젝트 생성하는 액션넣어주기
            }}
          >
            생성하기
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyProjectOrganism;
