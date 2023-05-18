import React from "react";
import styles from "../../styles/organisms/EditTeamOrganism.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { changeTeamName } from "../../api/team";
import CreateProjectForm from "../atoms/CreateProjectForm";
// changeTeamName = async (token, teamName, teamIdx)
function EditTeamOrganism({ closeModal, teamIdx }) {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  // usertoken
  const userToken = useSelector((store) => store.userToken);
  // api
  const editName = async () => {
    const { status, team } = await changeTeamName(userToken, inputValue, teamIdx);
    if (status === 200) {
      // 팀 이름 변경
    }
  };
  return (
    <div className={styles.app}>
      <div className={styles.title}>팀 이름 변경하기</div>
      <CreateProjectForm
        text={inputValue}
        setText={setInputValue}
        apiFunc={editName}
        placeholder={"팀 이름을 작성해주세요."}
      />
    </div>
  );
}

export default EditTeamOrganism;
