import { useDispatch, useSelector } from "react-redux";
import styles from "./CodeEditor.module.scss";
import {
  hideEditPointer,
  // selectEditPointerVisible,
  selectEditPointerVisible,
  selectIsDragScrolling,
  setCodeEditorIndex,
  setInputFieldBlurred,
  setInputFieldFocused,
  showEditPointer,
} from "../../store/toolSlice";
import useDragCodeEditor from "../../hooks/useDragCodeEditor";
import { useEffect, useRef, useState } from "react";
import EditPointer from "../atoms/EditPointer";
import computeSelectionBox from "../../tools/computeSelectionBox";
import Comment from "./Comment";
// import useGlobalKeyboardShortCut from "../../hooks/useGlobalKeyboardShortCut";

import {
  changeShownColor,
  hideCodeEditor,
  selectAllCodeEditor,
  setEditorPerson,
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
  // const { top, left, width, height, isHidden, comments } = codeEditor;
  // 클릭 -> 사이즈 조정
  const [isClicked, setIsClicked] = useState(false);

  const {
    top,
    left,
    width,
    height,
    isHidden,
    comments,
    isShown,
    shownColor,
    editorPerson,
  } = codeEditor;
  // const [myWorking, setMyWorking] = useState(null);
  // 더블클릭 -> 에디터편집
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  // 에디터 상단 바
  // const [isHidden, setIsHidden] = useState(false);
  const isDragScrolling = useSelector(selectIsDragScrolling);

  // comment 우측
  const [hideComment, setHideComment] = useState(true);

  // 모나코 들어갈 곳
  useDragCodeEditor(codeEditorIndex, artBoardRef, canvasRef);

  // 단축키 추가
  // useGlobalKeyboardShortCut(isClicked);

  // 더블클릭 이벤트 처리
  const handleDoubleClick = () => {
    setIsDoubleClicked(true);
  };

  // div 포커스 해제되었을때 처리되는 핸들러
  const myColor = awareness.getLocalState().color;
  const myName = awareness.getLocalState().name;

  const handleBlurred = (event) => {
    console.log("blurred");
    setIsClicked(false);
    setIsDoubleClicked(false);
    dispatch(hideEditPointer);
    if (editorPerson !== myName) return;
    handleFinishIsShown();
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
    if (isShown) return;
    dispatch(setStartIsShown({ codeEditorIndex: codeEditorIndex }));
    dispatch(
      changeShownColor({ color: myColor, codeEditorIndex: codeEditorIndex })
    );
    dispatch(
      setEditorPerson({ name: myName, codeEditorIndex: codeEditorIndex })
    );
    dispatch(setInputFieldFocused());
  };
  const handleFinishIsShown = () => {
    dispatch(setFinishIsShown({ codeEditorIndex: codeEditorIndex }));
    dispatch(setEditorPerson({ name: null, codeEditorIndex: codeEditorIndex }));
    dispatch(
      changeShownColor({ color: null, codeEditorIndex: codeEditorIndex })
    );
    dispatch(setInputFieldBlurred());
  };

  // comment창 크기 설정
  const commentWidth = width / 2;
  // editor 숨김처리되었을때 isHidden store 값에 따른 css 설정
  const isHiddenStyle = {
    ...codeEditor,
    height: isHidden ? "30px" : height,
    border: isShown ? `2px solid ${shownColor}` : "none",
  };

  return (
    <div
      className={styles["code-editor"]}
      onClick={() => {
        handleStartIsShown();
        if (isShown) {
          if (editorPerson === null || myName === editorPerson) {
            dispatch(setCodeEditorIndex(codeEditorIndex));
            setIsClicked(true);
            //setIsDoubleClicked(true);
            dispatch(showEditPointer());
          }
        }
      }}
      onDoubleClick={handleDoubleClick}
      onBlur={() => {
        // TODO: 하이라이트 해제되었을 떄 수정 필요 (한나/윤진)
        // handleFinishIsShown();
        // handleInput();
        handleBlurred();
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
          style={{
            top: 30,
            left: 0,
            width,
            height: height - 30,
            position: "absolute",
            backgroundColor: "white",
          }}
        >
          {isClicked
            ? // EditPointer atoms 들어갈 자리.
              // 편집점 활성화될때 삭제도 가능
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
            editorPerson={editorPerson}
            className={styles["monaco-editor"]}
            file={codeEditors[codeEditorIndex].canvasName}
            readOnly={!isDoubleClicked}
            style={{ height: height - 30 }}
          />
          {/* comment 화면 처리 */}
        </div>
      ) : null}
    </div>
  );
};

export default CodeEditor;
