import React, { useState } from "react";
import styles from "../../styles/organisms/InviteModalOrganism.module.scss";
import ButtonAtom from "../atoms/ButtonAtom";

const InviteModalOrganism = ({ closeModal }) => {
  const [inputValue, setInputValue] = useState("");
  const [teamMembers, setTeamMembers] = useState([
    "안춘홍",
    "환진태",
    "최재희",
  ]);
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
        <h3>팀원 초대</h3>
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInput}
            onKeyDown={onKeyDown}
          />
          <button onClick={handleInvite}>Invite</button>
        </div>
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
