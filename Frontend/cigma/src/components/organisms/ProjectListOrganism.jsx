import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { BsPersonFillAdd } from "react-icons/bs";
import { BsFillFilePlusFill } from "react-icons/bs";
import ProjectThumbNail from "../atoms/ProjectThumbNailAtom";
import styles from "../../styles/organisms/ProjectListOrganism.module.scss";

function ProjectListOrganism() {
  const [openModal, team, setNowContent, setToDo, setPropFunction] =
    useOutletContext();
  // team=== 해당 프로젝트를 가져온 팀 명.
  // API상 필요한 정보를 context에 담아 가져올 것.
  // API 호출을 통해 해당 팀의 프로젝트를 리스트로 가져왔다고 가정
  const projects = [
    {
      name: "project1",
      thumbnail:
        "https://t1.daumcdn.net/cfile/tistory/999A233F5EE64AA229?original",
    },
    {
      name: "project2",
      thumbnail:
        "https://t1.daumcdn.net/cfile/tistory/999A233F5EE64AA229?original",
    },
    {
      name: "project3",
      thumbnail:
        "https://t1.daumcdn.net/cfile/tistory/999A233F5EE64AA229?original",
    },
    {
      name: "project4",
      thumbnail:
        "https://t1.daumcdn.net/cfile/tistory/999A233F5EE64AA229?original",
    },
  ];

  const UserSearch = () => {
    openModal();
    setNowContent(1);
  };

  const CreateProject = () => {
    openModal();
    setNowContent(2);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {team}
        <div className={styles.iconWrapper}>
          {team === "My Projects" ? (
            ""
          ) : (
            <div
              onClick={() => {
                UserSearch();
              }}
              className={styles.iconWrapper}
            >
              <BsPersonFillAdd />
            </div>
          )}

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
  );
}

export default ProjectListOrganism;