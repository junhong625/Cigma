import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { ActionCreators } from "redux-undo";
// import { useDispatch } from "react-redux";
import {
  setCurrentTool,
  selectCurrentCodeEditorIndex,
  setCodeEditorIndex,
} from "../store/toolSlice";
import { deleteCodeEditor, selectCodeEditorLength } from "../store/codeEditorSlice";
function useGlobalKeyboardShortCut() {
  const dispatch = useDispatch();
  const editorCount = useSelector(selectCodeEditorLength);
  const workingEditorIndex = useSelector(selectCurrentCodeEditorIndex);
  // const tools = { SELECTOR: "selector", TEXT: "text", CodeEditor: "code-editor" };

  // ctr + V
  // selector로 설정

  // ctrl + t
  // text로 변경

  useEffect(() => {
    /**
     * backspace 누르면 삭제
     */
    const deleteCanvasShortCut = (event) => {
      if (event.key == "Backspace" && editorCount > 1) {
        event.preventDefault();
        dispatch(deleteCodeEditor(workingEditorIndex));
        // dispatch(setCodeEditorIndex(0));
      }
    };
    /**
     * ctrl + N
     * 캔버스 새로 생성하기
     * Selector code-editor로 설정
     */

    const codeEditorShortCut = (e) => {
      if ((e.ctrlKey && e.code === "KeyN") || (e.metaKey && e.code === "KeyN")) return;
      if (e.code === "KeyN") {
        e.preventDefault();
        dispatch(setCurrentTool("code-editor"));
      }
    };
    /**
     *
     * ctrl + T
     * 텍스트 새로 생성하기
     * Selector text로 설정
     */
    const textToolShortCut = (e) => {
      if ((e.ctrlKey && e.code === "KeyT") || (e.metaKey && e.code === "KeyT")) return;
      if (e.code === "KeyT") {
        e.preventDefault();
        dispatch(setCurrentTool("text"));
      }
    };
    /**
     * ctrl + V
     * 일반적인 selector로 설정
     */
    const selectorToolShortCut = (e) => {
      if ((e.ctrlKey && e.code === "KeyV") || (e.metaKey && e.code === "KeyV")) return;
      if (e.code === "KeyV") {
        e.preventDefault();
        dispatch(setCurrentTool("selector"));
      }
    };
    window.addEventListener("keydown", deleteCanvasShortCut);
    window.addEventListener("keydown", codeEditorShortCut);
    window.addEventListener("keydown", textToolShortCut);
    window.addEventListener("keydown", selectorToolShortCut);
    return () => {
      window.removeEventListener("keydown", deleteCanvasShortCut);
      window.removeEventListener("keydown", codeEditorShortCut);
      window.removeEventListener("keydown", textToolShortCut);
      window.removeEventListener("keydown", selectorToolShortCut);
    };
  }, [dispatch, editorCount, workingEditorIndex]);

  // return <div>useGlobalKeyboardShortCut</div>;
}

export default useGlobalKeyboardShortCut;
