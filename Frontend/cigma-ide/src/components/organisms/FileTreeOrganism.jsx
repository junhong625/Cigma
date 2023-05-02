import React, { useState, useRef } from "react";
import { DndProvider } from "react-dnd";
import {
  Tree,
  MultiBackend,
  getDescendants,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { CustomNodeAtom } from "../atoms/CustomNodeAtom";
import { CustomDragPreviewAtom } from "../atoms/CustomDragPreviewAtom";
import styles from "../../styles/organisms/FileTreeOrganism.module.scss";
import SampleData from "../../sample-data.json";
import {
  BsArrowUpSquare,
  BsFileEarmarkPlus,
  BsFolderPlus,
} from "react-icons/bs";
import { Resizable } from "re-resizable";

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

function FileTreeOrganism(props) {
  // 트리에 활용하는 데이터 리스트 생성
  const [treeData, setTreeData] = useState(SampleData);

  // 파일 바꾸기
  const handleTextChange = (id, value, type) => {
    const newTree = treeData.map((node) => {
      // 유효한 파일 타입 확장자를 입력 받았을 때
      if (node.id === id && type != undefined) {
        return {
          ...node,
          text: value,
          data: {
            ...node.data,
            fileType: type,
          },
        };
      } else if (node.id === id) {
        // 파일명만 수정할 때
        return {
          ...node,
          text: value,
        };
      }
      return node;
    });

    setTreeData(newTree);
  };

  // id를 기준으로 노드 데이터 삭제 후 새로운 리스트 반환
  const handleDelete = (id) => {
    const deleteIds = [
      id,
      ...getDescendants(treeData, id).map((node) => node.id),
    ];
    const newTree = treeData.filter((node) => !deleteIds.includes(node.id));

    setTreeData(newTree);
  };

  // 드래그 드롭을 실행하는 함수
  const handleDrop = (newTree) => setTreeData(newTree);

  // 선택된 노드를 표기하는 State
  const [selectedNode, setSelectedNode] = useState(null);
  const handleSelect = (node) => setSelectedNode(node);

  //모든 폴더를 접는 Ref
  const ref = useRef(null);
  const handleCloseAll = () => ref.current?.closeAll();

  // 새로운 파일/ 폴더 만들기
  const [lastCreated, setLastCreated] = useState(0);

  const handleCreate = (newNode) => {
    const lastId = getLastId(treeData) + 1;
    setLastCreated(lastId);

    setTreeData([
      ...treeData,
      {
        ...newNode,
        id: lastId,
      },
    ]);
  };

  // 현재 위치에 새로운 폴더를 만드는 함수
  const CreateFolder = () => {
    const text = ""
    const droppable = true;
    // 선택중인 파일이 없을 때, 최상단에 생성
    if (selectedNode === null) {
      handleCreate({
        text,
        parent: 0,
        droppable,
      });
    } else if (selectedNode.droppable === false) {
      // 선택중인 파일이 폴더가 아닐 때.
      handleCreate({
        text,
        parent: selectedNode.parent,
        droppable,
      });
    } else {
      // 선택중인 파일이 폴더일 때.
      handleCreate({
        text,
        parent: selectedNode.id,
        droppable,
      });
    }
  };

  // 현재 위치에 새로운 파일을 만드는 함수
  const CreateFile = () => {
    const text = "";
    const fileType = "";
    const droppable = false;
    // 선택중인 파일이 없을 때, 최상단에 생성
    if (selectedNode === null) {
      handleCreate({
        text,
        parent: 0,
        droppable,
        data: { fileType },
      });
    } else if (selectedNode.droppable === false) {
      // 선택중인 파일이 폴더가 아닐 때.
      handleCreate({
        text,
        parent: selectedNode.parent,
        droppable,
        data: { fileType },
      });
    } else {
      // 선택중인 파일이 폴더일 때.
      handleCreate({
        text,
        parent: selectedNode.id,
        droppable,
        data: { fileType },
      });
    }
  };

  return (
    <Resizable
      size={{ width: props.widthLeft }}
      minWidth={props.handleFileBar ? 240 : 0}
      maxWidth={"50%"}
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      handleClasses={{ right: `${styles.handle}` }}
      onResizeStart={() => {
        props.defaultWidth.current = props.widthLeft;
      }}
      onResize={(e, direction, ref, d) => {
        props.setWidthLeft(props.defaultWidth.current + d.width);
      }}
      // 배경색
      style={{ backgroundColor: "#24282e" }}
      className={props.handleFileBar ? "" : styles.hidden}
    >
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <div className={styles.app} style={{ width: props.widthLeft + "px" }}>
          <div className={styles.buttonWapper}>
            <div onClick={handleCloseAll}>
              <BsArrowUpSquare />
            </div>
            <div
              onClick={() => {
                CreateFile();
              }}
            >
              <BsFileEarmarkPlus />
            </div>
            <div
              onClick={() => {
                CreateFolder();
              }}
            >
              <BsFolderPlus />
            </div>
          </div>
          <Tree
            ref={ref}
            tree={treeData}
            rootId={0}
            render={(node, { depth, isOpen, onToggle }) => (
              <CustomNodeAtom
                node={node}
                depth={depth}
                isOpen={isOpen}
                isSelected={node.id === selectedNode?.id}
                onToggle={onToggle}
                onTextChange={handleTextChange}
                onSelect={handleSelect}
                onDelete={handleDelete}
                lastCreated={lastCreated}
              />
            )}
            dragPreviewRender={(monitorProps) => (
              <CustomDragPreviewAtom monitorProps={monitorProps} />
            )}
            onDrop={handleDrop}
            classes={{
              root: styles.treeRoot,
              draggingSource: styles.draggingSource,
              dropTarget: styles.dropTarget,
            }}
          />
        </div>
      </DndProvider>
    </Resizable>
  );
}

export default FileTreeOrganism;
