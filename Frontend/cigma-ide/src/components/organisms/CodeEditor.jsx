import styles from "./CodeEditor.module.scss";

const CodeEditor = ({ ...codeEditor }) => {
  // 모나코 들어갈 곳
  return (
    <div className={styles["code-editor"]} style={{ ...codeEditor }}>
      test code editor
    </div>
  );
};

export default CodeEditor;
