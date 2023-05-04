import React, { useState } from "react";
import style from "../../styles/organisms/InviteModalOrganism.module.scss";
import InviteModalOrganism from "./InviteModalOrganism";

const CheckTest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>모달 열기</button>
      {isModalOpen ? <InviteModalOrganism closeModal={closeModal} /> : null}
    </div>
  );
};

export default CheckTest;
