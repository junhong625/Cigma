import { useEffect, useRef } from "react";
import styles from "./App.module.scss";

import EditorOrganism from "./components/organisms/EditorOrganism";
import HeaderOrganism from "./components/organisms/HeaderOrganism";
import WorkBenchPage from "./components/pages/WorkBenchPage";
import initYjsDoc from "./store/initYjsDoc";

function App() {
  const doc = useRef(initYjsDoc("ws://localhost:1234/", "monacoTest"));
  if (doc.current.ydoc !== null) {
    const editorList = useRef(doc.current.ydoc.getMap("editorList"));
  }

  return (
    <div className={styles.app}>
      <header>
        <HeaderOrganism />
      </header>
      <div className={styles.workspaceDiv}>
        <WorkBenchPage />
      </div>
    </div>
  );
}

export default App;
