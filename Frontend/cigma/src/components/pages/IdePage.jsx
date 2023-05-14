import React, { useEffect, useRef } from "react";
import IdeHeaderOrganism from "../organisms/IdeHeaderOrganism";
import styles from "../../styles/pages/IdePage.module.scss";
import { useLocation } from "react-router-dom";

const IdePage = React.memo(({ teamName, projectName }) => {
  const location = useLocation();
  const portNum = location.state?.portNum;
  // port. teamName . projectName . userName . userImageUrl
  const iframeRef = useRef(null);
  useEffect(() => {
    // axios로 서버에서 IDE port 번호나 링크 response

    // iframe 내부로 유저, 프로젝트, 서버 정보 전송
    iframeRef.current.contentWindow.postMessage(
      {
        userId: null,
        userImage: null,
        teamName: teamName,
        projectName: projectName,
        serverPath: null,
        serverPort: null,
        state: "setting",
      },
      `http://${serverPath}:${serverPort}`
    );
  }, []);

  return (
    <div className={styles.ideContainer}>
      <IdeHeaderOrganism />
      <iframe
        ref={iframeRef}
        className={styles.ideFlame}
        // 해당 프로젝트의 주소. Thumbnail 클릭시 받아온 portNum을 입력합니다.
        // src=`cigmacode.com/project/${portNum}`
        src="http://70.12.247.83:5173/"
      ></iframe>
    </div>
  );
});

export default IdePage;
