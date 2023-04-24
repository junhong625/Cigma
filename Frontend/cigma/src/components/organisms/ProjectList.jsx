import React from "react";
import { useOutletContext } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { FaFileMedical } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import styles from "../../styles/organisms/ProjectList.module.scss";

function ProjectList() {
  const context = useOutletContext();
  // contenxt[1] === 해당 프로젝트를 가져온 팀 명.
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

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {context[1]}
        <div className={styles.iconWrapper}>
          <div onClick={context[0]} className={styles.iconWrapper}>
            <FaUserPlus />
          </div>
          <div className={styles.iconWrapper}>
            <FaFileMedical />
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.projectContainer}>
        {projects.map((project, index) => (
          <div className={styles.project}>
            <div className={styles.projectTitle}>
              <div key={"project" + index}> {project.name}</div>
              <div className={styles.iconWrapper}>
                <FaTrashAlt />
                <FaPen />
              </div>
            </div>
            <img
              src={project.thumbnail}
              alt="thumb"
              className={styles.thumbnail}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectList;
