import React, { useRef, useState, useEffect } from "react";
import styles from "../../styles/atoms/ProjectThumbNailAtom.module.scss";
import { BsTrashFill } from "react-icons/bs";
import { BsPenFill } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsFillReplyFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { deleteProject, getPortNumber } from "../../api/project";
import { useDispatch, useSelector } from "react-redux";
import { setProjectIndex, setProjectName } from "../../store/project";
import { selectUserId, selectUserImage } from "../../store/user";

// 프로젝트 리스트에서 프로젝트 하나에 해당하는 Atom
function ProjectThumbNailAtom({
  name,
  img,
  trash,
  openModal,
  setNowContent,
  setToDo,
  setPropFunction,
  projectIdx,
  projectName,
  teamName,
}) {
  console.log(`프로젝트 인덱스 ${projectIdx}`);

  const userId = useSelector(selectUserId);
  const userImage = useSelector(selectUserImage);
  // 프로젝트 삭제 api 호출
  const userToken = useSelector((store) => store.userToken);
  const removeProject = async () => {
    const { status } = await deleteProject(userToken, projectIdx);
    if (status === 200) {
      // 프로젝트 삭제
      alert("성공적으로 삭제되었습니다.");
    }
  };

  const deleteAction = () => {
    setNowContent(0);
    setToDo("프로젝트를 완전히 삭제할까요?");
    setPropFunction(() => {
      return () => {
        // 실제로 완전삭제하는 코드
        removeProject();
        console.log("deleteProject");
      };
    });
    openModal();
  };

  const restoreProject = () => {
    openModal();
    setNowContent(0);
    setToDo("프로젝트를 복원할까요?");
    setPropFunction(() => {
      return () => {
        // 실제로 원래 팀 위치로 복원하는 코드
        console.log("restoreProject");
      };
    });
  };

  const tempDeleteProject = () => {
    openModal();
    setNowContent(0);
    setToDo("프로젝트를 삭제할까요?");
    setPropFunction(() => {
      return () => {
        // 쓰레기통으로 보내는 코드
        console.log("goToTrash");
      };
    });
  };

  //프로젝트명을 수정하는 코드
  const [onCreate, setOnCreate] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const nameInput = useRef();

  const changeName = () => {
    if (nameInput.current.value === "") {
      setOnCreate(false);
      return;
    }
    setNewProjectName(nameInput.current.value);
    nameInput.current.value = "";
    setOnCreate(false);
  };

  const pressEnter = (event) => {
    if (event.key === "Enter") {
      // 프로젝트 명을 변경하는 코드 (API)
      // 이하는 표시만 변경하는 코드
      changeName();
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 포트번호 받아온뒤 접속시키기
  // const [portNum, setPortNum] = useState(-1);

  const callPortNumber = async () => {
    const { status, portNum } = await getPortNumber(userToken, projectIdx);
    if (status === 200) {
      console.log(`port::${JSON.stringify(portNum)}`);
      // 넘겨줄 수 있는 값
      // portNum
      // teamName
      // projectName
      const state = {
        portNum: portNum.port,
        teamName: teamName,
        projectName: projectName,
      };
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
      // navigate("/test", { state: state });
    } else {
      console.log("error");
    }
  };
  useEffect(() => {
    if (onCreate) {
      nameInput.current.focus();
    }
  }, [onCreate]);

  return (
    <>
      <div className={styles.projectTitle}>
        <div>
          {onCreate ? (
            <div className={styles.inputWrapper}>
              <input
                type="text"
                ref={nameInput}
                onKeyDown={pressEnter}
                className={styles.newName}
                onBlur={() => {
                  nameInput.current.value = "";
                  setOnCreate(false);
                }}
              />
              <div
                className={styles.button}
                onClick={() => {
                  changeName();
                }}
              >
                <BsFillCheckCircleFill />
              </div>
            </div>
          ) : newProjectName === "" ? (
            name
          ) : (
            newProjectName
          )}
        </div>
        <div className={styles.iconWrapper}>
          {trash ? (
            <>
              <BsTrashFill
                className={styles.button}
                onClick={() => {
                  deleteAction();
                }}
              />
              <BsFillReplyFill
                className={styles.button}
                onClick={() => {
                  restoreProject();
                }}
              />
            </>
          ) : (
            <>
              <BsTrashFill
                onClick={() => {
                  tempDeleteProject();
                }}
                className={styles.button}
              />
              <BsPenFill
                className={styles.button}
                onClick={() => {
                  setOnCreate(true);
                }}
              />
            </>
          )}
        </div>
      </div>
      <img
        src={img}
        alt="thumb"
        className={styles.thumbnail}
        onClick={() => {
          // 프로젝트 주소 할당을 통해 포트 번호를 가져옵니다. 이하는 임시.
          // const portNum = 1;
          callPortNumber();
        }}
      />
    </>
  );
}

export default ProjectThumbNailAtom;
