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
        serverPath: "cigmacode.com",
        serverPort: null,
        state: "setting",
      },
      `http://cigmacode.com:${serverPort}`
    );
    // userimage base64로 인코딩처리해서 보낼것
    // 여기서 쓰이는 serverPort는 XXXX 네자리수 고대로 보낸다.
  }, []);

  return (
    <div className={styles.ideContainer}>
      <IdeHeaderOrganism />
      <iframe
        ref={iframeRef}
        className={styles.ideFlame}
        // 해당 프로젝트의 주소. Thumbnail 클릭시 받아온 portNum을 입력합니다.
        // portnum XXXX 네자리수에서 앞의 세자리만 살려서 보낸다.
        src={`https://cigmacode.com/project/${portNum}/main`}
        // src="http://70.12.247.83:5173/"
      ></iframe>
    </div>
  );
});

export default IdePage;
