import React, { useEffect, useState } from "react";
import styles from "../../styles/organisms/ModalFrameOrganism.module.scss";
import UserSearchOrganism from "./UserSearchOrganism";
import CreateProjectOrganism from "./CreateProjectOrganism";
import ConfirmOrganism from "./ConfirmOrganism";
import DeleteTeamOrganism from "./DeleteTeamOrganism";
import EditTeamOrganism from "./EditTeamOrganism";

// 모달의 배경 부분
function ModalFrameOrganism({
  show,
  closeModal,
  nowContent,
  propFunction,
  toDo,
}) {
  //Transition이 반환하는 show 값에 따른 애니메이션용 class 탈부착
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

  // 모달 내용을 구분하기 위한 state
  const [modalContent, setModalContent] = useState(0);

  // 스크롤 금지
  useEffect(() => {
    setModalContent(nowContent);
    const body = document.getElementsByTagName("body")[0];
    body.classList.add(styles.notScroll);
    return () => {
      body.classList.remove(styles.notScroll);
    };
  }, [nowContent]);

  let fadeAnimationClass = fadeAnimation.join(" ");
  let slideAnimationClass = slide.join(" ");

  return (
    <div className={`${styles[fadeAnimationClass]}  ${styles.zindex}`}>
      <div onClick={closeModal} className={styles.outside}>
        <div onClick={(e) => e.stopPropagation()}>
          <div
            className={`${styles[slideAnimationClass]} ${styles.modalcontainer}`}
            onClick={(e) => e.stopPropagation()}
          >
            {modalContent === 0 && (
              <ConfirmOrganism
                closeModal={closeModal}
                toDo={toDo}
                propFunction={propFunction}
              />
            )}
            {modalContent === 1 && (
              <UserSearchOrganism closeModal={closeModal} />
            )}
            {modalContent === 2 && (
              <CreateProjectOrganism closeModal={closeModal} />
            )}
            {modalContent === 3 && (
              <DeleteTeamOrganism closeModal={closeModal} />
            )}
            {modalContent === 4 && (
              <EditTeamOrganism closeModal={closeModal} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalFrameOrganism;
