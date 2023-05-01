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
import { BsArrowUpSquareFill } from "react-icons/bs";
import { Resizable } from "re-resizable";

function FileTreeOrganism(props) {
  const [treeData, setTreeData] = useState(SampleData);
  const handleTextChange = (id, value) => {
    const newTree = treeData.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          text: value,
        };
      }

      return node;
    });

    setTreeData(newTree);
  };

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

  //좌우 크기를 변경하는 Ref
  const appRef = useRef(null);
  const handleWidthChange = (event) => {
    appRef.current.style.width = `${event.target.value}px`;
  };

  //너비값 변경
  const handleResize = (event, { size }) => {
    props.setWidthLeft(size.width);
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
      // 드래그 가능하다는 표시. 필요 없을까?
      // handleStyles={{
      //   right: {
      //     width: "3px",
      //     height: "100%",
      //     right: "0px",
      //     backgroundColor: "#727272",
      //   },
      // }}
      onResizeStop={(e, direction, ref, d) => {
        props.setWidthLeft(props.widthLeft + d.width);
      }}
      style={{ backgroundColor: "#2e2e2e" }}
      className={props.handleFileBar ? "" : styles.hidden}
    >
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <div
          className={`${styles.app} `}
          ref={appRef}
          style={{ width: props.widthLeft + "px" }}
        >
          <div className={styles.buttonWapper}>
            {/* 전부 닫는 버튼 */}
            <div onClick={handleCloseAll}>
              <BsArrowUpSquareFill />
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
