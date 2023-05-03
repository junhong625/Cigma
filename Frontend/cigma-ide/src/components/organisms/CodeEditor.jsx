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
  useDragCodeEditor(codeEditorIndex, artBoardRef, canvasRef);
  // 편집점 숨김여부
  const isEditPointerVisible = useSelector(selectEditPointerVisible);
  // 모나코 들어갈 곳

  const handleInput = (event) => {
    setIsDoubleClicked(false);
    dispatch(hideEditPointer);
  };
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
        test code editor
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
      </div>
    </>
  );
};

export default CodeEditor;
