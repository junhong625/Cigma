import React from "react";
import styles from "../../styles/organisms/CreateProjectOrganism.module.scss";

function DeleteTeamOrganism({ closeModal }) {
  return (
    <div>
      <div>팀을 삭제하시겠습니까?</div>
      <div>포함된 프로젝트들이 삭제되며, 복구되지 않습니다.</div>
    </div>
  );
}

export default DeleteTeamOrganism;
