import React, { useState, useRef } from "react";
import { DndProvider } from "react-dnd";
import { MultiBackend, getBackendOptions } from "@minoru/react-dnd-treeview";
import styles from "../../styles/pages/WorkBenchPage.module.scss";
import FileTreeOrganism from "../organisms/FileTreeOrganism";
import WorkSpacePage from "./WorkSpacePage";

const WorkBenchPage = ({ handleFileBar }) => {
  // 왼쪽 사이드바의 너비값 설정
  const [widthLeft, setWidthLeft] = useState(240);
  //width의 d.width값을 적용하기 위한 기본값
  const defaultWidth = useRef(0);
  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <div className={styles.workbench}>
        <FileTreeOrganism
          handleFileBar={handleFileBar}
          widthLeft={widthLeft}
          setWidthLeft={setWidthLeft}
          defaultWidth={defaultWidth}
        />
        <WorkSpacePage
          handleFileBar={handleFileBar}
          widthLeft={widthLeft}
          defaultWidth={defaultWidth}
        />
        {/* <SideBar /> */}
      </div>
    </DndProvider>
  );
};
export default WorkBenchPage;
