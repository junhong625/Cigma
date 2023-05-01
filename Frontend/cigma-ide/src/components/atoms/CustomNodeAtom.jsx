import React, { useState } from "react";
import { useDragOver } from "@minoru/react-dnd-treeview";
import { TypeIcon } from "./TypeIconAtom";
import { BsTriangleFill } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";
import { BsFillPenFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import styles from "../../styles/atoms/CustomNodeAtom.module.scss";

export const CustomNodeAtom = (props) => {
  const { droppable, data } = props.node;
  const { id, text } = props.node;
  const [visibleInput, setVisibleInput] = useState(false);
  const [labelText, setLabelText] = useState(text);
  const indent = props.depth * 24;

  const handleToggle = (e) => {
    props.onToggle(props.node.id);
  };

  const handleShowInput = () => {
    setVisibleInput(true);
  };

  const handleCancel = () => {
    setLabelText(text);
    setVisibleInput(false);
  };

  const handleChangeText = (e) => {
    setLabelText(e.target.value);
  };

  const handleSubmit = () => {
    setVisibleInput(false);
    props.onTextChange(id, labelText);
  };

  const handleSelect = () => props.onSelect(props.node);
  const TREE_X_OFFSET = 24;
  const depthList = Array.from({ length: props.depth }, () => 0);
  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  return (
    <div
      className={`tree-node ${styles.root} ${
        props.isSelected ? styles.isSelected : ""
      }`}
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
      onClick={() => {
        handleSelect();
        handleToggle();
      }}
    >
      <div className={styles.iconWrapper}>
        <TypeIcon droppable={droppable} fileType={data?.fileType} />
      </div>
      <div
        className={styles.pipeX}
        style={{
          width: props.depth > 0 ? TREE_X_OFFSET - 12 : 0,
          left: indent - 18,
        }}
      />
      {depthList.map((dpth, index) => {
        return (
          <div
            key={"y" + index}
            className={styles.pipeY}
            style={{
              height: props.depth > 0 ? 32 : 0,
              left: index * 24 + 6,
            }}
          />
        );
      })}

      <div className={styles.labelGridItem}>
        {visibleInput ? (
          <div className={styles.inputWrapper}>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={styles.inputWrapper}
            >
              <input
                className={`${styles.textField}
            ${styles.nodeInput}`}
                value={labelText}
                onChange={handleChangeText}
              />
              <div
                className={styles.editButton}
                onClick={handleSubmit}
                disabled={labelText === ""}
              >
                <BsFillCheckCircleFill className={styles.editIcon} />
              </div>
              <div className={styles.editButton} onClick={handleCancel}>
                <BsXCircleFill className={styles.editIcon} />
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.nameSpace}>
            <div>{props.node.text}</div>
            <div
              className={styles.inputWrapper}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className={styles.editButton} onClick={handleShowInput}>
                <BsFillPenFill className={styles.editIcon} />
              </div>
              <div
                className={styles.editButton}
                onClick={() => props.onDelete(id)}
              >
                <BsFillTrashFill className={styles.editIcon} />
              </div>
            </div>
          </div>
        )}
      </div>
      {props.node.droppable && (
        <div
          className={`${styles.expandIconWrapper} ${
            props.isOpen ? styles.isOpen : ""
          }`}
        >
          <div>
            <BsTriangleFill />
          </div>
        </div>
      )}
    </div>
  );
};
