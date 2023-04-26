import React from "react";
import styles from "../../styles/atoms/ProjectThumbNailAtom.module.scss";
import { FaTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

// 프로젝트 리스트에서 프로젝트 하나에 해당하는 Atom
function ProjectThumbNailAtom({ name, img }) {
  return (
    <>
      <div className={styles.projectTitle}>
        <div> {name}</div>
        <div className={styles.iconWrapper}>
          <FaTrashAlt />
          <FaPen />
        </div>
      </div>
      <img src={img} alt="thumb" className={styles.thumbnail} />
    </>
  );
}

export default ProjectThumbNailAtom;
