import React from "react";
import { useState } from "react";
import { Transition } from "react-transition-group";
import ModalPortal from "../organisms/Portal";
import ModalFrame from "../organisms/ModalFrame";
import IconText from "../atoms/IconText";
import SideBar from "../organisms/SideBar";
import { FaBeer } from 'react-icons/fa';
import styles from "../../styles/pages/ProjectPages.module.scss";


function ProjectPage() {

  //모달 표시를 위한 함수 및 변수
  const [modalOn, setModalOn] = useState(false);
  const openModal = (event) => {
    setModalOn(true);
  };

  //모달을 닫는 함수
  const closeModal = () => {
    setModalOn(false);
  };

  return (
    <div className={styles.ContainerA}>
      <SideBar />
      <button onClick={openModal}> 모달 </button>
      <IconText icon={<FaBeer />} text={"메뉴이름"} />
      <ModalPortal>
        <Transition unmountOnExit in={modalOn} timeout={500}>
          {(state) => (
            <ModalFrame
              show={state}
              closeModal={closeModal}
            />
          )}
        </Transition>
      </ModalPortal>
    </div>
  )
}

export default ProjectPage