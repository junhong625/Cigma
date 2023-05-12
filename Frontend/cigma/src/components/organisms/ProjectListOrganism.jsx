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

function ProjectListOrganism() {
  const [openModal, team, setNowContent, setToDo, setPropFunction] = useOutletContext();
  // team=== 해당 프로젝트를 가져온 팀 명.
  // API상 필요한 정보를 context에 담아 가져올 것.
  // API 호출을 통해 해당 팀의 프로젝트를 리스트로 가져왔다고 가정

  /**test */
  console.log(`project list organism team info?${JSON.stringify(team)}`);
  //유저토큰
  const userToken = useSelector((store) => store.userToken);
  // 프로젝트 리스트 호출
  const [projects, setProjects] = useState([
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
    callProjectList();
    console.log(`result ${projects}`);
  }, [team]);

  // 반환 리스트 형태 참고해서 프로퍼티 이름 수정할 것.
  // const projects = [
  //   {
  //     name: "project1",
  //     thumbnail:
  //       "https://t1.daumcdn.net/cfile/tistory/999A233F5EE64AA229?original",
  //   },
  //   {
  //     name: "project2",
  //     thumbnail:
  //       "https://t1.daumcdn.net/cfile/tistory/999A233F5EE64AA229?original",
  //   },
  //   {
  //     name: "project3",
  //     thumbnail:
  //       "https://t1.daumcdn.net/cfile/tistory/999A233F5EE64AA229?original",
  //   },
  //   {
  //     name: "project4",
  //     thumbnail:
  //       "https://t1.daumcdn.net/cfile/tistory/999A233F5EE64AA229?original",
  //   },
  // ];

  const [dropMenu, setDropMenu] = useState(false);

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
      {projects.length === 0 ? (
        // 모든 프로젝트가 삭제되었거나, 처음 들어온 경우인 페이지
        // CreateTeam 기능이 있는 버튼 추가 필요
        <div>
          <div>프로젝트를 진행할 팀이 없습니다</div>
          <div>만들기</div>
        </div>
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
                  name={project.name}
                  img={project.thumbnail}
                  openModal={openModal}
                  setNowContent={setNowContent}
                  setToDo={setToDo}
                  setPropFunction={setPropFunction}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectListOrganism;
