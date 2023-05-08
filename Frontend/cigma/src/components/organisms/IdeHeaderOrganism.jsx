import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/organisms/IdeHeaderOrganism.module.scss";
import InviteModalOrganism from "./InviteModalOrganism";
import { BsFillPersonPlusFill } from "react-icons/bs";

const IdeHeaderOrganism = () => {
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

  const infoRef = useRef(null);
  useEffect(() => {
    const closeInfo = (event) => {
      if (infoRef.current && !infoRef.current.contains(event.target)) {
        setInfoVisible(false);
      }
    };
    document.addEventListener("mousedown", closeInfo);
    return () => {
      document.removeEventListener("mousedown", closeInfo);
    };
  }, []);

  return (
    <header>
      <div className={styles.headerLeftDiv}>
        <img className={styles.logo} src="/img/Logo.png" alt="thisislogo" />
      </div>
      <div className={styles.headerRightDiv}>
        <BsFillPersonPlusFill onClick={openModal} color="white" size={20} />
        <img
          onClick={openInfo}
          className={styles.user_image}
          src="/img/Logo.png"
          alt="User Profile"
        />
      </div>
      {isModalOpen ? <InviteModalOrganism closeModal={closeModal} /> : null}
      {infoVisible ? (
        <div className={styles.menu} ref={infoRef}>
          <div className={styles.menu_item}>내 정보</div>
          <div className={styles.menu_item}>설정</div>
          <div className={styles.menu_item}>로그아웃</div>
        </div>
      ) : null}
    </header>
  );
};

export default IdeHeaderOrganism;
