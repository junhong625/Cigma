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


function FileTreeOrganism() {
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

  const handleDrop = (newTree) => setTreeData(newTree);

  const [selectedNode, setSelectedNode] = useState(null);
  const handleSelect = (node) => setSelectedNode(node);

  const ref = useRef(null);
  const handleCloseAll = () => ref.current?.closeAll();

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <div className={styles.app}>
        {/* 전부 닫는 버튼 */}
        <div onClick={handleCloseAll}>
          <BsArrowUpSquareFill />
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
  );
}

export default FileTreeOrganism;
