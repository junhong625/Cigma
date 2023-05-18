import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../../styles/organisms/UserSearchOrganism.module.scss";
import CreateProjectForm from "../atoms/CreateProjectForm";
import { addMember } from "../../api/team";

/**
 * 팀에 사용자 초대하는 모달
 * @param closeModal 모달 닫기 설정
 */
function UserSearch({ closeModal, teamIdx }) {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  //유저토큰
  const userToken = useSelector((store) => store.userToken);
  const inviteMember = async () => {
    const { status, team } = await addMember(userToken, teamIdx, inputValue);
    // 팀원 초대 성공
    if (status === 200) {
      alert("초대에 성공했습니다");
      console.log(`team:::${team}`);
      navigate("/projects");
    }
    if (status === 401) {
      alert("팀원 초대는 팀장만 가능합니다");
    }
  };
  return (
    <div className={styles.app}>
      <div className={styles.title}>사용자 검색</div>
      <CreateProjectForm
        text={inputValue}
        setText={setInputValue}
        apiFunc={inviteMember}
        placeholder={"초대할 사용자 아이디 입력"}
      />
    </div>
  );
}

export default UserSearch;
