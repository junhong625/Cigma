import { useDispatch, useSelector } from "react-redux";
import { selectAllCodeEditor } from "../../store/codeEditorSlice";
import styles from "../../styles/pages/WorkSpacePage.module.scss";
import CodeEditor from "../organisms/CodeEditor";
import { useEffect, useRef } from "react";
import useDragToScroll from "../../hooks/useDragToScroll";
import useMockZoom from "../../hooks/useMockZoom";
import { emptySelectedShapeIndexes } from "../../store/toolSlice";
import useDrawCodeEditor from "../../hooks/useDrawCodeEditor";
let isFirstRender = true;

const WorkSpacePage = () => {
  const dispatch = useDispatch();
  const codeEditors = useSelector(selectAllCodeEditor);
  const boardRef = useRef();
  // innerboard ref 추가
  const innerBoardRef = useRef();

  // 스크롤
  useDragToScroll(boardRef);
  // zoom
  useMockZoom(boardRef, innerBoardRef);
  // editor 창 추가
  useDrawCodeEditor(innerBoardRef);

  useEffect(() => {
    if (!boardRef.current || !isFirstRender) return;

    const { top, left, width } = codeEditors[codeEditors.length - 1];

    isFirstRender = false;
    boardRef.current.scrollTop = top - 100;
    boardRef.current.scrollLeft =
      left - boardRef.current.clientWidth / 2 + width / 2;
  }, [codeEditors]);

  /**
   * @todo innerBoardRef관련 useEffect?
   */

  useEffect(() => {
    if (!innerBoardRef.current) return;

    const artboard = innerBoardRef.current;

    const resetSelection = () => {
      dispatch(emptySelectedShapeIndexes());
    };

    artboard.addEventListener("mousedown", resetSelection);

    return () => artboard.removeEventListener("mousedown", resetSelection);
  }, [dispatch]);

  return (
    <div ref={boardRef} className={styles["artboard-wrapper"]}>
      <div className={styles.artboard} ref={innerBoardRef}>
        {codeEditors.map((codeEditor, i) => (
          <CodeEditor {...codeEditor} codeEditorIndex={i} key={i} />
        ))}
      </div>
    </div>
  );
};

export default WorkSpacePage;
