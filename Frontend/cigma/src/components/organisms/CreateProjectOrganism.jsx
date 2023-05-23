import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/organisms/CreateProjectOrganism.module.scss";
import { useNavigate } from "react-router-dom";
import CreateProjectForm from "../atoms/CreateProjectForm";
import { addProject } from "../../api/project";
// api:: createProject = async (token, projectName, teamIdx)
function CreateProjectOrganism({ closeModal, teamIdx }) {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  // usertoken
  const userToken = useSelector((store) => store.userToken);
  // api 호출
  const createProject = async () => {
    const { status, projectInfo } = await addProject(userToken, inputValue, teamIdx);
    // 프로젝트 생성 성공
    if (status === 200) {
      alert("프로젝트를 생성했습니다. ");
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.title}>프로젝트 생성</div>
      <CreateProjectForm
        text={inputValue}
        setText={setInputValue}
        apiFunc={createProject}
        placeholder={"프로젝트의 이름을 작성해주세요."}
      />
    </div>
  );
}

export default CreateProjectOrganism;
