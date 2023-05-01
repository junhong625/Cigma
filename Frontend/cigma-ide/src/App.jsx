import { useEffect, useRef, useState } from "react";
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

  //왼쪽 사이드바 표시를 변경하기 위한 State
  const [handleFileBar, setHandleFileBar] = useState(true);

  return (
    <div className={styles.app}>
      <header>
        <HeaderOrganism
          handleFileBar={handleFileBar}
          setHandleFileBar={setHandleFileBar}
        />
      </header>
      <div className={styles.workspaceDiv}>
        <WorkBenchPage handleFileBar={handleFileBar} />
      </div>
    </div>
  );
}

export default App;
