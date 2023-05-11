import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import { awareness, ydoc } from "../../store/initYDoc";

const EditorOrganism = React.memo(({ file, readOnly, editorPerson }) => {
  // readOnly -> 더블클릭여부에 따라 편집가능하게끔 처리
  const handleEditorDidMount = (editor, monaco) => {
    console.log("filename : ", file);
    const yText = ydoc.getText(file);

    const monacoBinding = new MonacoBinding(yText, editor.getModel(), new Set([editor]), awareness);
  };
  const myName = awareness.getLocalState().name;

  return (
    <>
      <Editor
        width={"100%"}
        theme="dark"
        language="javascript"
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          minimap: { enabled: true },
          // 서버 연결된 이후에는, 더블클릭 &&  myName === editorPerson일때 편집가능해야해
          //readOnly: readOnly && myName === editorPerson ? false : true,
          readOnly: readOnly,
        }}
      />
    </>
  );
});

export default EditorOrganism;
