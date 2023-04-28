import React, { useRef, useState, useEffect } from "react";
import styles from "../../styles/atoms/ProjectThumbNailAtom.module.scss";
import { BsTrashFill } from "react-icons/bs";
import { BsPenFill } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsFillReplyFill } from "react-icons/bs";

// 프로젝트 리스트에서 프로젝트 하나에 해당하는 Atom
function ProjectThumbNailAtom({
  name,
  img,
  trash,
  openModal,
  setNowContent,
  setToDo,
  setPropFunction,
}) {
  const deleteProject = () => {
    setNowContent(0);
    setToDo("프로젝트를 완전히 삭제할까요?");
    setPropFunction(() => {
      return () => {
        // 실제로 완전삭제하는 코드
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
                  deleteProject();
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
      <img src={img} alt="thumb" className={styles.thumbnail} />
    </>
  );
}

export default ProjectThumbNailAtom;
