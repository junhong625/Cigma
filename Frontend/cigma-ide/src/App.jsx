import { useEffect, useState } from "react";
import styles from "./App.module.scss";

import HeaderOrganism from "./components/organisms/HeaderOrganism";
import WorkBenchPage from "./components/pages/WorkBenchPage";

function App() {
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
