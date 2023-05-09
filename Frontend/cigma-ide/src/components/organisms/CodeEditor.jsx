import { useDispatch, useSelector } from "react-redux";
import styles from "./CodeEditor.module.scss";
import {
  hideEditPointer,
  selectEditPointerVisible,
  selectIsDragScrolling,
  setCodeEditorIndex,
  showEditPointer,
} from "../../store/toolSlice";
import useDragCodeEditor from "../../hooks/useDragCodeEditor";
import { useEffect, useRef, useState } from "react";
import EditPointer from "../atoms/EditPointer";
import computeSelectionBox from "../../tools/computeSelectionBox";
import Comment from "./Comment";
import {
  hideCodeEditor,
  selectAllCodeEditor,
  setFinishIsShown,
  setStartIsShown,
  showCodeEditor,
} from "../../store/codeEditorSlice";
import EditorOrganism from "./EditorOrganism";
import { awareness } from "../../store/initYDoc";

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
  const { top, left, width, height, isHidden, comments, isShown } = codeEditor;
  // 더블클릭 -> 사이즈 조정
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  // 에디터 상단 바
  // const [isHidden, setIsHidden] = useState(false);
  const isDragScrolling = useSelector(selectIsDragScrolling);

  // comment 우측
  const [hideComment, setHideComment] = useState(true);

  useDragCodeEditor(codeEditorIndex, artBoardRef, canvasRef);
  // 모나코 들어갈 곳
  const myColor = awareness.getLocalState().color;
  const myName = awareness.getLocalState().name;

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
  const handleStartIsShown = () => {
    if (isDragScrolling) return;
    dispatch(setStartIsShown({ codeEditorIndex: codeEditorIndex }));
  };
  const handleFinishIsShown = () => {
    dispatch(setFinishIsShown({ codeEditorIndex: codeEditorIndex }));
  };
  const borderRef = useRef(null);

  // comment창 크기 설정
  const commentWidth = width / 2;
  // editor 숨김처리되었을때 isHidden store 값에 따른 css 설정
  const isHiddenStyle = {
    ...codeEditor,
    height: isHidden ? "30px" : height,
    border: isShown ? `2px solid ${myColor}` : "none",
  };
  // const isShownStyle = {
  //   top: top - 10,
  //   left: left - 10,
  //   height: height + 20,
  //   width: width + 20,
  //   border: isShown ? "2px solid red" : "none",
  // };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (canvasRef.current && !canvasRef.current.contains(event.target)) {
        handleFinishIsShown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [canvasRef]);

  return (
    // <div
    //   className={styles["code-border"]}
    //   style={isShownStyle}
    //   ref={borderRef}
    //   onDoubleClick={handleStartIsShown}
    // >
    <div
      // onDoubleClick={handleStartIsShown}
      className={styles["code-editor"]}
      onClick={() => {
        dispatch(setCodeEditorIndex(codeEditorIndex));
        setIsDoubleClicked(true);
        dispatch(showEditPointer(), handleStartIsShown());
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
        <Comment
          comments={comments}
          codeEditorIndex={codeEditorIndex}
          left={width}
          height={height}
          width={commentWidth}
        />
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
          <EditorOrganism
            className={styles["monaco-editor"]}
            file={codeEditors[codeEditorIndex].canvasName}
            style={{ height: height - 30 }}
          />
          {/* comment 화면 처리 */}
        </div>
      ) : null}
    </div>
    // </div>
  );
};

export default CodeEditor;
