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
      
      alert("팀 이름을 성공적으로 변경하였습니다.");
      closeModal();
    }
    if (status === 401) { 
      alert("팀 이름 변경은 팀장만 가능합니다.");
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
