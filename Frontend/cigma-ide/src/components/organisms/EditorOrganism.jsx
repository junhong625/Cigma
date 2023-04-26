import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const EditorOrganism = () => {
  const [code, setCode] = useState("");

  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <>
      <Editor
        theme="dark"
        language="javascript"
        value={code}
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
        }}
      />
    </>
  );
};

export default EditorOrganism;
