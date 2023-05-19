import React, { useEffect, useRef } from "react";
import IdeHeaderOrganism from "../organisms/IdeHeaderOrganism";
import styles from "../../styles/pages/IdePage.module.scss";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserId, selectUserImage } from "../../store/user";

function IdePage() {
  const location = useLocation();
  const { portNum, teamName, projectName } = location.state;
  // const portNum = location.state?.portNum;
  // portNum 3자리수 변환
  const modifiedPortNum = Math.floor(portNum / 10);
  const userId = useSelector(selectUserId);
  const userImage = useSelector(selectUserImage);
  const iframeRef = useRef(null);
  useEffect(() => {
    // axios로 서버에서 IDE port 번호나 링크 response
    // iframe 내부로 유저, 프로젝트, 서버 정보 전송
    // iframeRef.current.contentWindow.postMessage(
    //   {
    //     userId: userId,
    //     userImage: userImage,
    //     teamName: teamName,
    //     projectName: projectName,
    //     serverPath: "k8a601.p.ssafy.io",
    //     serverPort: portNum,
    //     state: "setting",
    //   },
    //   `http://k8a601.p.ssafy.io:${portNum}`
    // );
    // userimage base64로 인코딩처리해서 보낼것
    // 여기서 쓰이는 serverPort는 XXXX 네자리수 고대로 보낸다.

    // window.opener.postMessage(
    //   {
    //     userId: userId,
    //     userImage: btoa(userImage),
    //     teamName: teamName,
    //     projectName: projectName,
    //     serverPath: "k8a601.p.ssafy.io",
    //     serverPort: 8990,
    //     state: "setting",
    //   },
    //   `http://k8a601.p.ssafy.io:${8990}`
    // );
    const test = window.open(
      `http://cigmacode.com:${8990}`,
      "cigma-ide",
      "popup=yes"
    );
    test.opener.postMessage(
      {
        userId: userId,
        userImage: btoa(userImage),
        teamName: teamName,
        projectName: projectName,
        serverPath: "cigmacode.com",
        serverPort: 8990,
        state: "setting",
      },
      `http://cigmacode.com:${8990}`
    );
    // test.addEventListener("onload", () => {
    // });
  }, []);

  return (
    <div className={styles.ideContainer}>
      <IdeHeaderOrganism />
      {/* <iframe
        ref={iframeRef}
        className={styles.ideFlame}
        sandbox="allow-same-origin"
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
      ></iframe> */}
    </div>
  );
}

export default IdePage;
