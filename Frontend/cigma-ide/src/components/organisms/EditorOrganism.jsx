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
        width={"100%"}
        theme="dark"
        language="javascript"
        value={code}
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          minimap: { enabled: true },
        }}
      />
    </>
  );
};

export default EditorOrganism;
