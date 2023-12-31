import React, { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  BsFillFilePlusFill,
  BsTrashFill,
  BsList,
  BsPersonFillAdd,
  BsPenFill,
} from "react-icons/bs";
import ProjectThumbNail from "../atoms/ProjectThumbNailAtom";
import styles from "../../styles/organisms/ProjectListOrganism.module.scss";
import { useSelector } from "react-redux";
import { callProjects } from "../../api/project";
import EmptyProjectOrganism from "./EmptyProjectOrganism";
import EmptyTeamOrganism from "./EmptyTeamOrganism";

function ProjectListOrganism() {
  const [openModal, team, setNowContent, setToDo, setPropFunction] = useOutletContext();
  // team === 해당 팀 정보
  // API상 필요한 정보를 context에 담아 가져올 것.
  // API 호출을 통해 해당 팀의 프로젝트를 리스트로 가져왔다고 가정
  // console.log(`팀이름::::${team.teamName}`);
  /**test */
  console.log(`project list organism team info?${JSON.stringify(team)}`);
  //유저토큰
  const userToken = useSelector((store) => store.userToken);
  // 프로젝트 리스트 호출
  const [projects, setProjects] = useState([]);

  const callProjectList = async () => {
    const { status, projectList } = await callProjects(userToken, team.teamIdx);
    if (status === 200) {
      console.log("프로젝트 리스트 호출완료");
      setProjects(projectList);
    } else {
      console.log("프로젝트 리스트 호출 에러");
    }
  };

  useEffect(() => {
    callProjectList();
    console.log(`result ${projects}`);
  }, [team]);

  const [dropMenu, setDropMenu] = useState(false);
  // empty project 화면에서 버튼 선택 여부 처리
  const [isClicked, setIsClicked] = useState(false);

  const UserSearch = () => {
    openModal();
    setNowContent(1);
  };

  const DeleteTeam = () => {
    openModal();
    setNowContent(3);
  };

  const EditTeam = () => {
    openModal();
    setNowContent(4);
  };

  const CreateProject = () => {
    openModal();
    setNowContent(2);
  };

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [team]);

  return (
    <div className={styles.container} ref={scrollRef}>
      {team === undefined ? (
        <>
          <EmptyTeamOrganism></EmptyTeamOrganism>
        </>
      ) : (
        <>
          {projects.length === 0 ? (
            // 모든 프로젝트가 삭제되었거나, 처음 들어온 경우인 페이지
            // CreateTeam 기능이 있는 버튼 추가 필요
            <>
              <div className={styles.title}>
                {team.teamName}
                <div
                  className={styles.iconWrapper}
                  style={{ backgroundColor: dropMenu ? "gray" : "" }}
                  onClick={() => {
                    setDropMenu(true);
                  }}
                >
                  <BsList />
                </div>
                {dropMenu ? (
                  <>
                    <div
                      className={styles.outSide}
                      onClick={() => {
                        setDropMenu(false);
                      }}
                    ></div>
                    <div className={styles.dropMenu}>
                      <div
                        onClick={() => {
                          UserSearch();
                        }}
                        className={styles.menuItem}
                      >
                        팀원 추가
                      </div>
                      <div
                        onClick={() => {
                          EditTeam();
                        }}
                        className={styles.menuItem}
                      >
                        팀 이름 변경
                      </div>
                      <div
                        onClick={() => {
                          DeleteTeam();
                        }}
                        className={styles.menuItem}
                      >
                        팀 삭제
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <hr />
              <EmptyProjectOrganism
                func={CreateProject}
                teamIdx={team.teamIdx}
                isClicked={isClicked}
                setIsClicked={setIsClicked}
              />
            </>
          ) : (
            <div>
              <div className={styles.title}>
                {team.teamName}
                <div
                  className={styles.iconWrapper}
                  style={{ backgroundColor: dropMenu ? "gray" : "" }}
                  onClick={() => {
                    setDropMenu(true);
                  }}
                >
                  <BsList />
                </div>
                {dropMenu ? (
                  <>
                    <div
                      className={styles.outSide}
                      onClick={() => {
                        setDropMenu(false);
                      }}
                    ></div>
                    <div className={styles.dropMenu}>
                      <div
                        onClick={() => {
                          UserSearch();
                        }}
                        className={styles.menuItem}
                      >
                        팀원 추가
                      </div>
                      <div
                        onClick={() => {
                          EditTeam();
                        }}
                        className={styles.menuItem}
                      >
                        팀 이름 변경
                      </div>
                      <div
                        onClick={() => {
                          DeleteTeam();
                        }}
                        className={styles.menuItem}
                      >
                        팀 삭제
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <hr />
              <div className={styles.projectContainer}>
                {projects.map((project, index) => (
                  <div key={"project" + index} className={styles.project}>
                    <ProjectThumbNail
                      name={project.projectName}
                      img={project.projectImageUrl}
                      openModal={openModal}
                      setNowContent={setNowContent}
                      setToDo={setToDo}
                      setPropFunction={setPropFunction}
                      projectIdx={project.projectIdx}
                      projectName={project.projectName}
                      teamName={team.teamName}
                      teamIdx = {team.teamIdx}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProjectListOrganism;
