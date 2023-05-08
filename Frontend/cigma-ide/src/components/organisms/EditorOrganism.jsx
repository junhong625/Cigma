import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import { awareness, ydoc } from "../../store/initYDoc";

const EditorOrganism = React.memo(({ file }) => {
  const handleEditorDidMount = (editor, monaco) => {
    console.log("filename : ", file);
    const yText = ydoc.getText(file);

    const monacoBinding = new MonacoBinding(
      yText,
      editor.getModel(),
      new Set([editor]),
      awareness
    );
  };

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
        }}
      />
    </>
  );
});

export default EditorOrganism;
