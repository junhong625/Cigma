import {useState } from "react";
import styles from "../../styles/organisms/UserSearchOrganism.module.scss";
import CreateProjectForm from "../atoms/CreateProjectForm";

/**
 * 
 * @param closeModal 모달 닫기 설정
 */
function UserSearch({ closeModal, teamIdx }) {
  const [inputValue, setInputValue] = useState("");
  const inviteMember = () => { 
    // 팀원 초대하기
  }
  return (
    <div className={styles.app}>
      <div className={styles.title}>사용자 검색
        
      </div>
      <CreateProjectForm text={inputValue} setText={setInputValue} apiFunc={ inviteMember} placeholder={"초대할 사용자 아이디 입력"} />
    </div>
  )
}

export default UserSearch;
