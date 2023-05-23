import React, { useState } from "react";
import styles from "../../styles/organisms/IdeHeaderOrganism.module.scss";
import InviteModalOrganism from "./InviteModalOrganism";
import { BsFillPersonPlusFill, BsFillPersonFill  } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const IdeHeaderOrganism = ({teamIdx}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [infoVisible, setInfoVisible] = useState(false);

  const openInfo = () => {
    setInfoVisible(true);
  };

  const closeInfo = () => {
    setInfoVisible(false);
  };

  const navigate = useNavigate();

  return (
    <header>
      <div className={styles.headerLeftDiv}>
        <img
          className={styles.logo}
          src="/img/Logo.png"
          alt="thisislogo"
          onClick={() => {
            navigate("/projects");
          }}
        />
      </div>
      <div className={styles.headerRightDiv}>
        <BsFillPersonFill onClick={openModal} color="white" size={20} />
        <img
          onClick={openInfo}
          className={styles.user_image}
          src="/img/Logo.png"
          alt="User Profile"
          tabIndex={1}
          onBlur={closeInfo}
        />
      </div>
      {isModalOpen ? <InviteModalOrganism closeModal={closeModal} teamIdx={teamIdx}/> : null}
      {infoVisible ? (
        <div className={styles.menu}>
          <div className={styles.menu_item}>내 정보</div>
          <div className={styles.menu_item}>설정</div>
          <div className={styles.menu_item}>로그아웃</div>
        </div>
      ) : null}
    </header>
  );
};

export default IdeHeaderOrganism;
