import React from "react";
import { useState } from "react";
import { Transition } from "react-transition-group";
import { Outlet } from "react-router-dom";
import ModalPortal from "../organisms/Portal";
import ModalFrame from "../organisms/ModalFrame";
import SideBar from "../organisms/SideBar";
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

  // 유저가 갖고 있는 팀 리스트 호출 (현재는 임시데이터)
  const teamList = ["My Projects", "Team 1", "Team 2", "Team 3", "Team 4", "Team 5", "아주긴팀이름이나온다면? 계속 늘어나겟쬬?", "Team 1", "Team 2", "Team 3", "Team 4", "Team 5", "아주긴팀이름이나온다면? 계속 늘어나겟쬬?", "Team 1", "Team 2", "Team 3", "Team 4", "Team 5", "아주긴팀이름이나온다면? 계속 늘어나겟쬬?", "Team 1", "Team 2", "Team 3", "Team 4", "Team 5", "아주긴팀이름이나온다면? 계속 늘어나겟쬬?"]

  // 현재 팀 리스트
  const [selectedTeam, setSelectedTeam] = useState(0)

  return (
    <div className={styles.ContainerA}>
      <SideBar openModal={openModal} teamList={teamList} setSelectedTeam={setSelectedTeam} selectedTeam={selectedTeam} />
      <Outlet context={[openModal, teamList[selectedTeam]]} />
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