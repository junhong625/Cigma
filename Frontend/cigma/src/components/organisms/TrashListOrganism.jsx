import React from "react";
import { useOutletContext } from "react-router-dom";
import ProjectThumbNailAtom from "../atoms/ProjectThumbNailAtom";
import styles from "../../styles/organisms/TrashListOrganism.module.scss";
import { BsTrashFill } from "react-icons/bs";

function TrashList() {
  const [openModal, team, setNowContent, setToDo, setPropFunction] =
    useOutletContext();

  const trashes = [
    {
      name: "trash1",
      thumbnail:
        "https://t1.daumcdn.net/cfile/tistory/999A233F5EE64AA229?original",
    },
    {
      name: "trash2",
      thumbnail:
        "https://t1.daumcdn.net/cfile/tistory/999A233F5EE64AA229?original",
    },
    {
      name: "trash3",
      thumbnail:
        "https://t1.daumcdn.net/cfile/tistory/999A233F5EE64AA229?original",
    },
    {
      name: "trash4",
      thumbnail:
        "https://t1.daumcdn.net/cfile/tistory/999A233F5EE64AA229?original",
    },
  ];

  const ClearAll = () => {
    openModal();
    setNowContent(0);
    setPropFunction(() => {
      return () => {
        // 휴지통을 비우는 API 통신 기능
        console.log("clearFunction");
      };
    });
    setToDo("휴지통을 비울까요?");
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Recycle Bin
        <div className={styles.clearAll}>
          <BsTrashFill
            onClick={() => {
              ClearAll();
            }}
          />
        </div>
      </div>

      <hr />
      <div className={styles.projectContainer}>
        {trashes.map((project, index) => (
          <div key={"project" + index} className={styles.project}>
            <ProjectThumbNailAtom
              name={project.name}
              img={project.thumbnail}
              trash={true}
              openModal={openModal}
              setNowContent={setNowContent}
              setToDo={setToDo}
              setPropFunction={setPropFunction}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrashList;
