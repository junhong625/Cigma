import React, { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { BsPersonFillAdd } from "react-icons/bs";
import { BsFillFilePlusFill, BsTrashFill } from "react-icons/bs";
import ProjectThumbNail from "../atoms/ProjectThumbNailAtom";
import styles from "../../styles/organisms/ProjectListOrganism.module.scss";
import { useSelector } from "react-redux";
import { callProjects } from "../../api/project";

function ProjectListOrganism() {
  const [openModal, team, setNowContent, setToDo, setPropFunction] =
    useOutletContext();
  // team=== 해당 프로젝트를 가져온 팀 명.
  // API상 필요한 정보를 context에 담아 가져올 것.
  // API 호출을 통해 해당 팀의 프로젝트를 리스트로 가져왔다고 가정

  //유저토큰
  const userToken = useSelector((store) => store.userToken);
  // 프로젝트 리스트 호출
  const [projects, setProjects] = useState([]);

  const callProjectList = async () => {
    const { status, projectList } = await callProjects(userToken, team.id);
    if (status === 200) {
      console.log("프로젝트 리스트 호출완료");
      setProjects(projectList);
    } else {
      console.log("에러");
    }
  };

  useEffect(() => {
    callProjectList();
  }, []);
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

  const hamberger = 1;

  const UserSearch = () => {
    openModal();
    setNowContent(1);
  };

  const DeleteProject = () => {
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
        // 모든 프로젝트가 삭제되었거나, 처음 들어온 경우
        // CreateTeam 기능이 있는 버튼 하나 추가
        <div>
          <div>프로젝트를 진행할 팀이 없습니다</div>
          <div>만들기</div>
        </div>
      ) : (
        <div>
          <div className={styles.title}>
            {team}
            <div className={styles.iconWrapper}>
              <div
                onClick={() => {
                  UserSearch();
                }}
                className={styles.iconWrapper}
              >
                <BsPersonFillAdd />
              </div>
              <div
                onClick={() => {
                  DeleteProject();
                }}
                className={styles.iconWrapper}
              >
                <BsTrashFill />
              </div>

              <div
                className={styles.iconWrapper}
                onClick={() => {
                  CreateProject();
                }}
              >
                <BsFillFilePlusFill />
              </div>
            </div>
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
