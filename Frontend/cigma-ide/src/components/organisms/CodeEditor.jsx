import { useDispatch, useSelector } from "react-redux";
import styles from "./CodeEditor.module.scss";
import { setCodeEditorIndex } from "../../store/toolSlice";
import useDragCodeEditor from "../../hooks/useDragCodeEditor";
import { useRef, useState } from "react";
import EditPointer from "../atoms/EditPointer";
import computeSelectionBox from "../../tools/computeSelectionBox";
import { selectAllCodeEditor } from "../../store/codeEditorSlice";

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

  // 모나코 들어갈 곳
  return (
    <div
      ref={canvasRef}
      className={styles["code-editor"]}
      style={{ ...codeEditor }}
      onDoubleClick={() => {
        console.log(`작동되는건가?`);
        setIsDoubleClicked(true);
      }}
      onClick={() => dispatch(setCodeEditorIndex(codeEditorIndex))}
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
      test code editor
    </div>
  );
};

export default CodeEditor;
