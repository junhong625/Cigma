import React, { useEffect, useState } from "react";
import styles from "../../styles/organisms/InviteModalOrganism.module.scss";
import ButtonAtom from "../atoms/ButtonAtom";
import { useSelector } from "react-redux";
import { getAllTeamInfo } from "../../api/team";

const InviteModalOrganism = ({ closeModal, teamIdx }) => {
  
  const [inputValue, setInputValue] = useState("");
  const [teamMembers, setTeamMembers] = useState([
    
  ]);
  const userToken = useSelector((store) => store.userToken);
  // api team member get
  const getMembers = async () => { 
    const { status, data } = await getAllTeamInfo(userToken, teamIdx);
    if (status === 200) { 
      console.log("조회성공");
      console.log(JSON.stringify(data.members));
      // setTeamMembers(data.teamMembers);
      setTeamMembers([...teamMembers, data.teamLeader, ...data.members])
      // setTeamMembers([...teamMembers, data.members])
    }
  }
  useEffect(() => {
    getMembers();
    // setTeamMembers()
  }, [])
  
  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleInvite = () => {
    setTeamMembers([...teamMembers, inputValue]);
    setInputValue("");
  };

  const onKeyDown = (event) => {
    if (event.key == "Enter") {
      handleInvite();
    }
  };

  return (
    <div className={styles["modal-container"]}>
      <div className={styles["modal"]}>
        {/* <h3>팀원 초대</h3>
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInput}
            onKeyDown={onKeyDown}
          />
          <button onClick={handleInvite}>Invite</button>
        </div> */}
        <h3>현재 팀원</h3>
        <ul>
          {teamMembers.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
        <ButtonAtom onClick={closeModal} buttonName={"확인"} />
      </div>
    </div>
  );
};

export default InviteModalOrganism;
