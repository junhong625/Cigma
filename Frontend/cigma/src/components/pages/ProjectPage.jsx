import React, { useEffect } from "react";
import { useState } from "react";
import { Transition } from "react-transition-group";
import { Outlet } from "react-router-dom";
import ModalPortal from "../atoms/PortalAtom";
import ModalFrameOrganism from "../organisms/ModalFrameOrganism";
import SideBarOrganism from "../organisms/SideBarOrganism";
import styles from "../../styles/pages/ProjectPage.module.scss";
import { useSelector } from "react-redux";
import { callTeams } from "../../api/team";

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

  // 모달 확인 문구를 변경하기 위한 변수
  const [toDo, setToDo] = useState();
  // 모달 실행 함수를 변경하기 위한 변수
  const [propFunction, setPropFunction] = useState(() => {
    return () => {
      console.log("Initial Function");
    };
  });

  //유저토큰
  const userToken = useSelector((store) => store.userToken);

  // 유저가 갖고 있는 팀 리스트 호출 (현재는 임시데이터)
  const [teamList, setTeamList] = useState([]);

  const callTeamList = async () => {
    const { status, teamList } = await callTeams(userToken);
    if (status === 200) {
      console.log("팀 리스트 호출완료");
      setTeamList(teamList);
    } else {
      console.log("에러");
    }
  };

  useEffect(() => {
    callTeamList();
  }, []);

  // 현재 팀 리스트
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [nowContent, setNowContent] = useState(0);

  return (
    <div className={styles.ContainerA}>
      <SideBarOrganism
        setTeamList={setTeamList}
        teamList={teamList}
        setSelectedTeam={setSelectedTeam}
        selectedTeam={selectedTeam}
        setNowContent={setNowContent}
      />
      <Outlet
        context={[
          openModal,
          teamList[selectedTeam],
          setNowContent,
          setToDo,
          setPropFunction,
        ]}
      />
      <ModalPortal>
        <Transition unmountOnExit in={modalOn} timeout={500}>
          {(state) => (
            <ModalFrameOrganism
              show={state}
              closeModal={closeModal}
              nowContent={nowContent}
              propFunction={propFunction}
              toDo={toDo}
            />
          )}
        </Transition>
      </ModalPortal>
    </div>
  );
}

export default ProjectPage;
