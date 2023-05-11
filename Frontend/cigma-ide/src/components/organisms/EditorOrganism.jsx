import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import { awareness, ydoc } from "../../store/initYDoc";

const EditorOrganism = React.memo(({ file, readOnly, editorPerson }) => {
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
          readOnly: myName === editorPerson ? false : true, // 더블클릭되었을때 편집가능하게끔 처리
        }}
      />
    </>
  );
});

export default EditorOrganism;
