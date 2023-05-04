import { useDispatch, useSelector } from "react-redux";
import styles from "./CodeEditor.module.scss";
import {
  hideEditPointer,
  selectEditPointerVisible,
  setCodeEditorIndex,
  showEditPointer,
} from "../../store/toolSlice";
import useDragCodeEditor from "../../hooks/useDragCodeEditor";
import { useRef, useState } from "react";
import EditPointer from "../atoms/EditPointer";
import computeSelectionBox from "../../tools/computeSelectionBox";
import { hideCodeEditor, selectAllCodeEditor } from "../../store/codeEditorSlice";

const directions = {
  N: "n",
  E: "e",
  S: "s",
  W: "w",
  NE: "ne",
  NW: "nw",
  SE: "se",
  SW: "sw",
};
const CodeEditor = ({ codeEditorIndex, artBoardRef, ...codeEditor }) => {
  const dispatch = useDispatch();
  const canvasRef = useRef();
  const codeEditors = useSelector(selectAllCodeEditor);
  // 더블클릭 -> 사이즈 조정
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  // 에디터 상단 바
  const [isHidden, setIsHidden] = useState(false);
  const [isBarOpen, setIsBarOpen] = useState(true);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartX, setResizeStartX] = useState(0);
  const [resizeStartWidth, setResizeStartWidth] = useState(0);
  // comment 우측
  const [hideComment, setHideComment] = useState(true);

  useDragCodeEditor(codeEditorIndex, artBoardRef, canvasRef);
  // 모나코 들어갈 곳

  const handleInput = (event) => {
    setIsDoubleClicked(false);
    dispatch(hideEditPointer);
  };

  // 리사이징 관련
  const handleResizeMouseDown = (event) => {
    event.preventDefault();
    setIsResizing(true);
    setResizeStartX(event.clientX);
  };

  // 마우스 움직임
  const handleMouseMove = (event) => {
    if (isResizing) {
      const dx = event.clientX - resizeStartX;
      event.currentTarget.parentNode.style.width = resizeStartWidth + dx + "px";
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleHideClick = () => {
    setIsHidden(true);
  };

  const handleShowClick = () => {
    setIsHidden(false);
  };
  // comment 보이기
  const handleCommentClick = () => {
    setHideComment(false);
  };
  // comment 숨기기
  const handleHideCommentClick = () => {
    setHideComment(true);
  };

  // 숨김처리?
  const { top, left, width, height } = codeEditor;
  const commentLeft = left + width;
  const commentWidth = width / 2;
  if (isHidden) {
    return (
      <div
        className={styles["hidden-bar"]}
        style={{ top, left, width }}
        onClick={() => dispatch(setCodeEditorIndex(codeEditorIndex))}
      >
        {/* <button className={styles.showButton} onClick={handleShowClick} /> */}
        <button className={styles.closeButton} onClick={handleShowClick} />
      </div>
    );
  }
  return (
    <>
      <div
        ref={canvasRef}
        className={styles["code-editor"]}
        style={{ ...codeEditor }}
        tabIndex={0}
        onDoubleClick={() => {}}
        onBlur={() => {
          handleInput();
        }}
        onClick={() => {
          dispatch(setCodeEditorIndex(codeEditorIndex));
          setIsDoubleClicked(true);
          dispatch(showEditPointer());
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {isDoubleClicked
          ? // EditPinter atoms 들어갈 자리.
            Object.values(directions).map((direction) => (
              <EditPointer
                direction={direction}
                key={direction}
                {...computeSelectionBox(codeEditors, codeEditorIndex)}
              />
            ))
          : null}
        <div className={styles.bar}>
          {/* comment 숨기는 버튼 추가 필요 */}
          <button
            className={styles.commentButton}
            onClick={() => {
              if (hideComment) {
                handleCommentClick();
              } else {
                handleHideCommentClick();
              }
            }}
          />
          <button className={styles.closeButton} onClick={handleHideClick} />
        </div>
        test code editor
      </div>
      {!hideComment ? (
        <div
          style={{ top, left: commentLeft, height, width: commentWidth }}
          className={styles["code-editor"]}
        ></div>
      ) : null}
    </>
  );
};

export default CodeEditor;
