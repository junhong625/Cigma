import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/organisms/EmptyProjectOrganism.module.scss";
import { createProject } from "../../api/project";
import { FaFolder } from "react-icons/fa";
import { useSelector } from "react-redux";
function EmptyProjectOrganism({ teamIdx }) {
  const [projectName, setProjectName] = useState("");
  //유저토큰
  const userToken = useSelector((store) => store.userToken);
  // 프로젝트 생성 api 호출
  const createProject = async () => {
    const { status, projectInfo } = await createProject(userToken, projectName, teamIdx);
    if (status == 200) {
      console.log("프로젝트 생성 성공");
      /* projectInfo내용
      projectIdx : 프로젝트 번호
      teamIdx : 팀 번호
      projectUrl : 프로젝트 경로
      projectName : 프로젝트 이름
      projectImageUrl : 사진 경로
      */
    }
  };
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
