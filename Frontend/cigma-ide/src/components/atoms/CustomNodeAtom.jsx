import React, { useState, useRef, useEffect } from "react";
import { useDragOver } from "@minoru/react-dnd-treeview";
import { TypeIcon } from "./TypeIconAtom";
import { BsTriangleFill } from "react-icons/bs";
import { BsFillPenFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import styles from "../../styles/atoms/CustomNodeAtom.module.scss";

export const CustomNodeAtom = (props) => {
  const { droppable, data } = props.node;
  const { id, text } = props.node;
  const [visibleInput, setVisibleInput] = useState(false);
  const [labelText, setLabelText] = useState(text);
  const indent = props.depth * 24;
  const inputRef = useRef();

  const handleToggle = (e) => {
    props.onToggle(props.node.id);
  };

  // 입력란 표기를 위한 State
  const handleShowInput = () => {
    setVisibleInput(true);
  };

  // 입력란 랜더링 후 focus
  useEffect(() => {
    if (visibleInput) {
      if (inputRef.current) {
        inputRef.current.selectionStart = 0; // 선택 시작 위치를 0으로 설정합니다.
        inputRef.current.selectionEnd = inputRef.current.value.indexOf("."); // '.' 이전 위치까지 선택합니다.
        inputRef.current.focus();
      }
    }
  }, [visibleInput]);

  // 입력 취소
  const handleCancel = () => {
    if (props.node.text === "") {
      //방금 막 생성된 파일일 시, 삭제(파일을 생성하지 않음)
      props.onDelete(id);
    } else {
      setLabelText(text);
      setVisibleInput(false);
    }
  };

  const handleChangeText = (e) => {
    setLabelText(e.target.value);
  };

  //파일을 제출하는 코드
  const handleSubmit = () => {
    // 방금 생성된 파일 일 때
    if (props.node.text === "") {
      //입력값이 존재하지 않을 시, 삭제(파일을 생성하지 않음)
      if (labelText === "") {
        props.onDelete(id);
      } else {
        // 값이 입력되어 있을 경우, 값을 발송.
        setVisibleInput(false);
        const fileType = labelText.split(".")[1];
        props.onTextChange(id, labelText, fileType);
      }
    } else {
      // 기존에 존재하던 파일일 때
      //입력값이 존재하지 않을 시, 수정을 취소
      if (labelText === "") {
        handleCancel();
      } else {
        // 값이 입력되어 있을 경우, 값을 발송.
        setVisibleInput(false);
        const fileType = labelText.split(".")[1];
        props.onTextChange(id, labelText, fileType);
      }
    }
  };

  const handleSelect = () => props.onSelect(props.node);
  const TREE_X_OFFSET = 24;
  const depthList = Array.from({ length: props.depth }, () => 0);
  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  const pressKey = (event) => {
    if (event.key === "Enter") {
      // 파일 명을 변경하는 코드
      // 이하는 표시만 변경하는 코드
      handleSubmit();
    } else if (event.key === "Escape") {
      handleCancel();
    }
  };

  // 방금 생성된 파일일 경우 input 모드
  useEffect(() => {
    if (props.node.id === props.lastCreated) {
      handleShowInput();
    }
  }, [props.lastCreated]);

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
      {/* 파일의 타입에 따라 바뀌는 아이콘  */}
      <div className={styles.iconWrapper}>
        <TypeIcon droppable={droppable} fileType={data?.fileType} />
      </div>

      {/* 파일 구조를 표시해주는 막대들 */}
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
        {/* 이름을 변경중일 때 */}
        {visibleInput ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={styles.editWrapper}
          >
            <input
              ref={inputRef}
              className={`
                ${styles.textField}
                ${styles.nodeInput}
                `}
              value={labelText}
              onChange={handleChangeText}
              onBlur={handleSubmit}
              onKeyDown={pressKey}
            />
          </div>
        ) : (
          // 평소 노출 상태
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
        // dropabble 한지, 즉 폴더인지에 따라 표시되는 오른쪽 삼각형
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
