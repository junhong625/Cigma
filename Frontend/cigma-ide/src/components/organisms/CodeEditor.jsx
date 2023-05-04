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

  // comment 우측
  const [hideComment, setHideComment] = useState(true);

  useDragCodeEditor(codeEditorIndex, artBoardRef, canvasRef);
  // 모나코 들어갈 곳

  const handleInput = (event) => {
    setIsDoubleClicked(false);
    dispatch(hideEditPointer);
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

  if (isHidden) {
    return (
      <div
        className={styles["hidden-bar"]}
        style={{ top, left, width }}
        onClick={() => dispatch(setCodeEditorIndex(codeEditorIndex))}
      >
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
        {/* monaco가 들어갈곳 */}
        <div className={styles["monaco-editor"]} style={{ height: height - 30 }} />
        {/* comment 화면 처리 */}
        {!hideComment ? (
          <div
            style={{
              height: height - 30,
            }}
            className={styles.comment}
          ></div>
        ) : null}
      </div>
    </>
  );
};

export default CodeEditor;
