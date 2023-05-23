import React, { useState } from "react";
import styles from "../../styles/organisms/DeleteTeamOrganism.module.scss";
import { deleteTeam } from "../../api/team";
import ButtonAtom from "../atoms/ButtonAtom";
import { useSelector } from "react-redux";
import { TbAlertCircleFilled } from 'react-icons/tb';

//const deleteTeam = async (token, teamIdx)
function DeleteTeamOrganism({ closeModal, teamIdx }) {
  // const [inputValue, setInputValue] = useState("");
  // usertoken
  const userToken = useSelector((store) => store.userToken);
  // api 호출
  const makeTeamRemoved = async () => {
    const { status } = await deleteTeam(userToken, teamIdx);
    if (status === 200) {
      // 삭제
      alert("팀이 삭제되었습니다.");
      closeModal();
    }
    if (status === 401) { 
      alert('팀 삭제는 팀장만 가능합니다.');
      closeModal();
    }
  };
  return (
    <div className={styles.app}>
      <TbAlertCircleFilled />
      <div className={styles.title}>
        <div style={{display: "flex",padding: "0.5em", justifyContent: "center", alignItems: "center", flexDirection: "column"
        }}>
          <div>정말 삭제하시겠습니까?</div>
          <div>팀 삭제 이후 복구가 불가능합니다.</div>
          {/* <div className={styles.title}>
            
          </div> */}
      </div>
      </div>
      
      <div className={styles.buttonWrapper}>
        <ButtonAtom
          onClick={() => {
            makeTeamRemoved();
          }}
          buttonName={"네"}
          style={{ color: "#fefefe", width: "30%" }}
        />
        <ButtonAtom
          onClick={closeModal}
          buttonName={"아니오"}
          style={{ color: "#fefefe", width: "30%" }}
        />
      </div>
    </div>
  );
}

export default DeleteTeamOrganism;
