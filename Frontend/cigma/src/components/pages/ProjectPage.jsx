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
  const [teamList, setTeamList] = useState([
    {
      teamIdx: 1,
      teamLeader: "재히",
      teamName: "재희없는재희팀",
      teamImageUrl:
        "https://camo.githubusercontent.com/809619bf25026aa02652a2bc41a03e58856236d3dfe73c2794a18b3fe8e29d3b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176615363726970742d4637444631452e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d4a617661536372697074266c6f676f436f6c6f723d626c61636b",
    },
    {
      teamIdx: 1,
      teamLeader: "찬빈",
      teamName: "찬빈없는찬빈팀",
      teamImageUrl:
        "https://camo.githubusercontent.com/1026f577af0676ea62dd6389c6063a4888f222d8775a997dcf0236dd702b6408/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656163742d3631444146422e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d5265616374266c6f676f436f6c6f723d626c61636b",
    },

  ]);

  const updateTeamList = (newTeamList) => {
    setTeamList(newTeamList);
  };
  const callTeamList = async () => {
    const { status, teamList } = await callTeams(userToken);
    if (status === 200) {
      console.log("팀 리스트 호출완료");
      console.log(teamList);
      setTeamList(teamList);
    } else {
      console.log("에러");
    }
  };

  useEffect(() => {
    // TODO: 커밋하기전에 다시 살려놓을것(API 통신용)
    callTeamList();
    console.log(`projectlist outlet set: ${teamList[selectedTeam]}`);
  }, []);

  // 현재 팀 리스트
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [nowContent, setNowContent] = useState(0);

  return (
    <div className={styles.ContainerA}>
      <SideBarOrganism
        setTeamList={updateTeamList}
        teamList={teamList}
        setSelectedTeam={setSelectedTeam}
        selectedTeam={selectedTeam}
        setNowContent={setNowContent}
      />
      <Outlet
        context={[openModal, teamList[selectedTeam], setNowContent, setToDo, setPropFunction]}
      />
      <ModalPortal>
        <Transition unmountOnExit in={modalOn} timeout={500}>
          {(state) => (
            // project list에서 사용되는 모달
            // 팀원추가. 프로젝트 추가
            // 팀명 변경 . 팀 삭제
            <ModalFrameOrganism
              show={state}
              closeModal={closeModal}
              nowContent={nowContent}
              propFunction={propFunction}
              toDo={toDo}
              teamIdx={teamList[selectedTeam].teamIdx}
            />
          )}
        </Transition>
      </ModalPortal>
    </div>
  );
}

export default ProjectPage;
