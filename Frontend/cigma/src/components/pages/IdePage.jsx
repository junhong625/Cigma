import React, { useEffect } from "react";
import IdeHeaderOrganism from "../organisms/IdeHeaderOrganism";
import styles from "../../styles/pages/IdePage.module.scss";
import { useLocation } from "react-router-dom";

const IdePage = React.memo(({ projectName }) => {
  const location = useLocation();
  const portNum = location.state?.portNum;
  // port. teamName . projectName . userName . userImageUrl
  useEffect(() => {
    // axios로 서버에서 IDE port 번호나 링크 response
  }, []);
  return (
    <div className={styles.ideContainer}>
      <IdeHeaderOrganism />
      <iframe
        className={styles.ideFlame}
        // 해당 프로젝트의 주소. Thumbnail 클릭시 받아온 portNum을 입력합니다.
        // src=`cigmacode.com/project/${portNum}`
        src="http://70.12.247.83:5173/"
      ></iframe>
    </div>
  );
});

export default IdePage;
