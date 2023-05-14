import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import { awareness, ydoc } from "../../store/initYDoc";
import { loadFileContent, saveFileContent } from "../../api/fileTree";

const EditorOrganism = React.memo(({ file, fileType = "text", readOnly }) => {
  // readOnly -> 더블클릭여부에 따라 편집가능하게끔 처리
  useEffect(() => {
    const contentLoad = async () => {
      const { data } = await loadFileContent(file);
      const yText = ydoc.getText(file);
      if (yText.length == 0) {
        yText.insert(0, data);
      }
    };
    contentLoad();
  }, []);

  const handleEditorDidMount = (editor, monaco) => {
    const yText = ydoc.getText(file);

    const monacoBinding = new MonacoBinding(
      yText,
      editor.getModel(),
      new Set([editor]),
      awareness
    );
    // realtime save : auto save
    yText.observe(async () => {
      const data = editor.getValue();
      const { status } = await saveFileContent(file, data);
      console.log(status);
    });
  };
  const myName = awareness.getLocalState().name;

  return (
    <>
      <Editor
        width={"100%"}
        theme="dark"
        language={fileType}
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
