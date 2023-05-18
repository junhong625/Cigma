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
  const [projects, setProjects] = useState([
    // {
    //   projectIdx: 1,
    //   teamIdx: 1,
    //   projectUrl: "urlpath",
    //   projectName: "취뽀",
    //   projectImageUrl:
    //     "https://camo.githubusercontent.com/10e9104d2cd511e6eee744a7487fbb3603eee30b3d07f89a74fd2076797ad295/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f537072696e672d3644423333462e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d537072696e67266c6f676f436f6c6f723d7768697465",
    // },
    // {
    //   projectIdx: 1,
    //   teamIdx: 1,
    //   projectUrl: "urlpath",
    //   projectName: "취뽀",
    //   projectImageUrl:
    //     "https://camo.githubusercontent.com/35ba18158dd0251a4d17cef42209a272da8af0a80ab76c61a1a873d049715c68/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f507974686f6e2d3337373641422e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d507974686f6e266c6f676f436f6c6f723d7768697465",
    // },
    /**
     * 
     * 
     * {projectIdx : 프로젝트 번호
        teamIdx : 팀 번호
        projectUrl : 프로젝트 경로
        projectName : 프로젝트 이름
        projectImageUrl : 사진 URL,
…}
     */
    // {
    //   name: "project1",
    //   thumbnail: "https://t1.daumcdn.net/cfile/tistory/999A233F5EE64AA229?original",
    // },
  ]);

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
    // TODO: 커밋하기전에 다시 살려놓을것(API 통신용)
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
                        className={styles.menuItem}
                        onClick={() => {
                          CreateProject();
                        }}
                      >
                        프로젝트 추가
                      </div>
                      <div
                        onClick={() => {
                          EditTeam();
                        }}
                        className={styles.menuItem}
                      >
                        팀명 변경
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
