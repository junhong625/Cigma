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
import {
  hideCodeEditor,
  selectAllCodeEditor,
  showCodeEditor,
} from "../../store/codeEditorSlice";

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
  const { top, left, width, height, isHidden } = codeEditor;
  // 더블클릭 -> 사이즈 조정
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  // 에디터 상단 바
  // const [isHidden, setIsHidden] = useState(false);

  // comment 우측
  const [hideComment, setHideComment] = useState(true);

  useDragCodeEditor(codeEditorIndex, artBoardRef, canvasRef);
  // 모나코 들어갈 곳

  const handleInput = (event) => {
    setIsDoubleClicked(false);
    dispatch(hideEditPointer);
  };
  // editor 숨기기
  const handleHideClick = () => {
    dispatch(hideCodeEditor({ codeEditorIndex: codeEditorIndex }));
  };

  const handleShowClick = () => {
    dispatch(showCodeEditor({ codeEditorIndex: codeEditorIndex }));
  };
  // comment 보이기
  const handleCommentClick = () => {
    setHideComment(false);
  };
  // comment 숨기기
  const handleHideCommentClick = () => {
    setHideComment(true);
  };

  // comment창 크기 설정
  const commentWidth = width / 2;
  // editor 숨김처리되었을때 isHidden store 값에 따른 css 설정
  const isHiddenStyle = {
    ...codeEditor,
    height: isHidden ? "30px" : height,
  };
  return (
    <div
      className={styles["code-editor"]}
      onClick={() => {
        dispatch(setCodeEditorIndex(codeEditorIndex));
        setIsDoubleClicked(true);
        dispatch(showEditPointer());
      }}
      onBlur={() => {
        handleInput();
      }}
      ref={canvasRef}
      tabIndex={0}
      style={isHiddenStyle}
    >
      <div
        className={styles.bar}
        style={{
          top,
          left,
          width,
        }}
      >
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
        <button
          className={styles.closeButton}
          onClick={() => {
            if (isHidden) {
              handleShowClick();
            } else {
              handleHideClick();
            }
          }}
        />
      </div>
      {/* 댓글창 숨김처리 */}
      {!hideComment ? (
        <div
          style={{
            top: 0,
            left: width,
            height,
            width: commentWidth,
          }}
          className={styles.comment}
        ></div>
      ) : null}
      {!isHidden ? (
        <div
          className={styles["code-editor"]}
          style={{ top: 30, left: 0, width, height: height - 30 }}
        >
          {isDoubleClicked
            ? // EditPointer atoms 들어갈 자리.
              Object.values(directions).map((direction) => (
                <EditPointer
                  direction={direction}
                  key={direction}
                  {...computeSelectionBox(codeEditors, codeEditorIndex)}
                />
              ))
            : null}

          {/* monaco가 들어갈곳 */}
          <div
            className={styles["monaco-editor"]}
            style={{ height: height - 30 }}
          />
          {/* comment 화면 처리 */}
        </div>
      ) : null}
    </div>
  );
};

export default CodeEditor;
