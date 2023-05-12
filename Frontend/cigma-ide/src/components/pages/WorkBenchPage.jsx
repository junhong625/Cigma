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
  //width의 d.width값을 적용하기 위한 기본값
  const defaultWidth = useRef(0);

  // 마지막 파일의 Id 값을 가져옴
  const getLastId = (treeData) => {
    const reversedArray = [...treeData].sort((a, b) => {
      if (a.id < b.id) {
        return 1;
      } else if (a.id > b.id) {
        return -1;
      }
      return 0;
    });

    if (reversedArray.length > 0) {
      return reversedArray[0].id;
    }
    return 0;
  };

  //id에 해당하는 노드를 찾기 위한 재귀 함수
  const findNodeById = (id, nodes) => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.id === id) {
        return node;
      } else if (node.children) {
        const foundNode = findNodeById(id, node.children);
        if (foundNode) {
          return foundNode;
        }
      }
    }
    return null;
  };

  //id를 기반으로 파일 경로를 구성하는 함수
  const getFilepathById = (id, nodes) => {
    const node = findNodeById(id, nodes);
    if (!node) {
      return "/";
    }
    const segments = [];
    let parent = findNodeById(node.parent, nodes);
    while (parent) {
      segments.unshift(parent.text);
      parent = findNodeById(parent.parent, nodes);
    }
    return segments.join("/");
  };

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <div className={styles.workbench}>
        <FileTreeOrganism
          widthLeft={widthLeft}
          setWidthLeft={setWidthLeft}
          defaultWidth={defaultWidth}
          getFilepathById={getFilepathById}
          getLastId={getLastId}
          findNodeById={findNodeById}
        />
        <WorkSpacePage widthLeft={widthLeft} />
      </div>
    </DndProvider>
  );
};
export default WorkBenchPage;
