import React, { useState, useRef } from "react";
import { DndProvider } from "react-dnd";
import { MultiBackend, getBackendOptions } from "@minoru/react-dnd-treeview";
import styles from "../../styles/pages/WorkBenchPage.module.scss";
import FileTreeOrganism from "../organisms/FileTreeOrganism";
import WorkSpacePage from "./WorkSpacePage";
import TermOrganism from "../organisms/TermOrganism";

const WorkBenchPage = () => {
  // 왼쪽 사이드바의 너비값 설정
  const [widthLeft, setWidthLeft] = useState(240);
  // 오른쪽 사이드바의 너비값 설정
  const [widthRight, setWidthRight] = useState(240);
  // widthLeft의 d.width값을 적용하기 위한 기본값
  const defaultWidthLeft = useRef(0);
  // widthRight의 d.width값을 적용하기 위한 기본값
  const defaultWidthRight = useRef(0);

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <div className={styles.workbench}>
        <FileTreeOrganism
          widthLeft={widthLeft}
          setWidthLeft={(nextWidth) => setWidthLeft(nextWidth)}
          defaultWidthLeft={defaultWidthLeft}
        />
        <WorkSpacePage widthLeft={widthLeft} />
        <TermOrganism
          widthRight={widthRight}
          setWidthRight={(nextWidth) => setWidthRight(nextWidth)}
          defaultWidthRight={defaultWidthRight}
        />
      </div>
    </DndProvider>
  );
};
export default WorkBenchPage;
