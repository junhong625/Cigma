import React, { useEffect } from "react";
import IdeHeaderOrganism from "../organisms/IdeHeaderOrganism";
import styles from "../../styles/pages/IdePage.module.scss";

const IdePage = React.memo(({ projectName }) => {
  useEffect(() => {
    // axios로 서버에서 IDE port 번호나 링크 response
  }, []);
  return (
    <div className={styles.ideContainer}>
      <IdeHeaderOrganism />
      <iframe
        className={styles.ideFlame}
        src="http://70.12.247.116:5173/"
      ></iframe>
    </div>
  );
});

export default IdePage;
