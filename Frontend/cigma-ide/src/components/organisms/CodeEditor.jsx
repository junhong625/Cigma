import { useDispatch } from "react-redux";
import styles from "./CodeEditor.module.scss";
import { setCodeEditorIndex } from "../../store/toolSlice";
import useDragCodeEditor from "../../hooks/useDragCodeEditor";
import { useRef } from "react";

const CodeEditor = ({ codeEditorIndex, artBoardRef, ...codeEditor }) => {
  const dispatch = useDispatch();
  const canvasRef = useRef();

  useDragCodeEditor(codeEditorIndex, artBoardRef, canvasRef);

  // 모나코 들어갈 곳
  return (
    <div
      ref={canvasRef}
      className={styles["code-editor"]}
      style={{ ...codeEditor }}
      onClick={() => dispatch(setCodeEditorIndex(codeEditorIndex))}
    >
      test code editor
    </div>
  );
};

export default CodeEditor;
