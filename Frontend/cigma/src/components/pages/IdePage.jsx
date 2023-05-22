import React, { useEffect, useRef } from "react";
import IdeHeaderOrganism from "../organisms/IdeHeaderOrganism";
import styles from "../../styles/pages/IdePage.module.scss";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserId, selectUserImage } from "../../store/user";
import { outCanvas } from "../../api/project";

function IdePage() {
  const location = useLocation();
  const { portNum, teamName, projectName, teamIdx, projectIdx } =
    location.state;
  // const portNum = location.state?.portNum;
  // portNum 3자리수 변환
  const modifiedPortNum = Math.floor(portNum / 10);
  const userId = useSelector(selectUserId);
  const userImage = useSelector(selectUserImage);
  const iframeRef = useRef(null);
  const userToken = useSelector((store) => store.userToken);

  useEffect(() => {
    // axios로 서버에서 IDE port 번호나 링크 response
    // iframe 내부로 유저, 프로젝트, 서버 정보 전송
    const canvasOut = async () => {
      const { status } = await outCanvas(userToken, projectIdx);
      if (status === 200) {
        console.log(`projectIdx : ${projectIdx}캔버스 나감`);
      }
    };

    window.addEventListener("beforeunload", canvasOut);

    return () => {
      window.removeEventListener("beforeunload", canvasOut);
    };
  }, []);

  return (
    <div className={styles.ideContainer}>
      <IdeHeaderOrganism teamIdx={teamIdx} />
      <iframe
        ref={iframeRef}
        className={styles.ideFlame}
        sandbox="allow-scripts allow-same-origin"
        onLoad={() => {
          iframeRef.current.contentWindow.postMessage(
            {
              userId: userId,
              userImage: btoa(userImage),
              teamName: teamName,
              projectName: projectName,
              serverPath: "k8a601.p.ssafy.io",
              serverPort: portNum,
              state: "setting",
            },
            `http://k8a601.p.ssafy.io:${portNum}`
          );
        }}
        // 해당 프로젝트의 주소. Thumbnail 클릭시 받아온 portNum을 입력합니다.
        // portnum XXXX 네자리수에서 앞의 세자리만 살려서 보낸다.
        // src={`https://cigmacode.com/project/${modifiedPortNum}/main`}
        src={`http://k8a601.p.ssafy.io:${portNum}`}
      ></iframe>
    </div>
  );
}

export default IdePage;
