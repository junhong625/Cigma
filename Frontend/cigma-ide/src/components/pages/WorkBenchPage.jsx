import React, { useState } from "react";
import styles from "../../styles/pages/WorkBenchPage.module.scss";
import SideBar from "../organisms/SideBar";
import FileTreeOrganism from "../organisms/FileTreeOrganism";
import WorkSpacePage from "./WorkSpacePage";

const WorkBenchPage = ({ handleFileBar }) => {

  // 왼쪽 사이드바의 너비값 설정
  const [widthLeft, setWidthLeft] = useState(240);

  return (
    <div className={styles.workbench}>
      {/* <SideBar /> */}
      <FileTreeOrganism
        handleFileBar={handleFileBar}
        widthLeft={widthLeft}
        setWidthLeft={setWidthLeft}
      />
      <WorkSpacePage handleFileBar={handleFileBar} widthLeft={widthLeft} />
      {/* <SideBar /> */}
    </div>
  );
};
export default WorkBenchPage;
