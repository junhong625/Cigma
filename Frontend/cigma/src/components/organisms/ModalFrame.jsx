import React from "react";
import styles from "../../styles/organisms/ModalFrame.module.scss";

function ModalFrame({ show, closeModal, nowContent }) {

  const fadeAnimation = [
    show === "entering"
      ? "ModalOpen"
      : show === "exiting"
        ? "ModalClose"
        : null,
  ];
  const slide = [
    show === "entering"
      ? "ModalSlideIn"
      : show === "exiting"
        ? "ModalSlideOut"
        : null,
  ];

  return (
    <div onClick={closeModal} className={styles.outside}>
      <div onClick={(e) => e.stopPropagation()}
      >모달입니다.</div>
    </div>
  )
}

export default ModalFrame