import { useDispatch, useSelector } from "react-redux";
import { selectAllCodeEditor } from "../../store/codeEditorSlice";
import styles from "../../styles/pages/WorkSpacePage.module.scss";
import CodeEditor from "../organisms/CodeEditor";
import { useEffect, useRef, useState } from "react";
import useDragToScroll from "../../hooks/useDragToScroll";
import useMockZoom from "../../hooks/useMockZoom";
import { emptySelectedShapeIndexes } from "../../store/toolSlice";
import useDrawCodeEditor from "../../hooks/useDrawCodeEditor";
import useGlobalKeyboardShortCut from "../../hooks/useGlobalKeyboardShortCut";
import useDrawText from "../../hooks/useDrawText";
import { selectAllTextEditor } from "../../store/textSlice";
import TextEditior from "../organisms/TextEditior";

import React from "react";
import { useUsers } from "y-presence";
import CursorAtom from "../atoms/CursorAtom";
import { provider, awareness } from "../../store/initYDoc";
import { USER_NAMES, USER_COLORS } from "../../constants";

const random = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const name = random(USER_NAMES);
const color = random(USER_COLORS);

awareness.setLocalState({ name, color });

let isFirstRender = true;

const WorkSpacePage = (props) => {
  const dispatch = useDispatch();
  const codeEditors = useSelector(selectAllCodeEditor);
  const textEditors = useSelector(selectAllTextEditor);
  const boardRef = useRef();
  // innerboard ref 추가
  const innerBoardRef = useRef();

  const users = useUsers(awareness);
  const handlePointMove = React.useCallback((e) => {
    awareness.setLocalStateField("cursor", {
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  // 스크롤
  useDragToScroll(boardRef);
  // zoom
  useMockZoom(boardRef, innerBoardRef);
  // editor 창 추가
  useDrawCodeEditor(innerBoardRef);

  // 단축키 추가
  useGlobalKeyboardShortCut();

  // text 추가
  useDrawText(innerBoardRef);

  useEffect(() => {
    if (!boardRef.current || !isFirstRender) return;

    const { top, left, width } = codeEditors[codeEditors.length - 1];

    isFirstRender = false;
    boardRef.current.scrollTop = top - 100;

    boardRef.current.scrollLeft =
      left - boardRef.current.clientWidth / 2 + width / 2;
  }, [codeEditors, textEditors]);

  useEffect(() => {
    /**
     * How to Loading with y-websocket provider
     */
    // const onSync = (isSynced) => {
    //   if (isSynced) {
    //     setLoading(false);
    //   }
    // };
    // console.log(provider);
    // provider.on("sync", onSync);
    // return () => provider.off("sync", onSync);
  }, []);

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

  // 왼쪽 사이드바 출력 on off 시 화면 스크롤을 통해 위치 유지
  useEffect(() => {
    if (props.handleFileBar === true) {
      boardRef.current.scrollLeft += props.widthLeft;
    } else {
      boardRef.current.scrollLeft -= props.widthLeft;
    }
  }, [props.handleFileBar]);

  // 왼쪽 사이드바 사이즈 변경 시 화면 스크롤을 통해 위치 유지
  const previousWidth = useRef(null);
  const currentWidth = useRef(240);
  const difference = useRef(null);

  useEffect(() => {
    if (previousWidth.current !== null && currentWidth.current !== null) {
      const value = currentWidth.current - previousWidth.current;
      difference.current = value;
    }
  }, [previousWidth.current, currentWidth.current]);

  useEffect(() => {
    previousWidth.current = currentWidth.current;
  }, [props.widthLeft]);

  useEffect(() => {
    currentWidth.current = props.widthLeft;
  }, [props.widthLeft]);

  useEffect(() => {
    boardRef.current.scrollLeft += difference.current;
  }, [difference.current]);

  return (
    <div
      ref={boardRef}
      className={styles["artboard-wrapper"]}
      onPointerMove={handlePointMove}
    >
      <div className={styles.artboard} ref={innerBoardRef}>
        {codeEditors.map((codeEditor, i) => (
          <CodeEditor
            {...codeEditor}
            codeEditorIndex={i}
            key={i}
            artBoardRef={innerBoardRef}
          />
        ))}
        {textEditors.map((textEditor, i) => (
          <TextEditior
            {...textEditor}
            textIndex={i}
            key={i}
            artBoardRef={innerBoardRef}
          />
        ))}
      </div>
      {Array.from(users.entries()).map(([key, value]) => {
        if (key === awareness.clientID) return null;

        if (!value.cursor || !value.color || !value.name) return null;

        return (
          <CursorAtom
            key={key}
            cursor={value.cursor}
            color={value.color}
            name={value.name}
          />
        );
      })}
    </div>
  );
};

export default WorkSpacePage;
