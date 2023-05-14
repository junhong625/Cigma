import { useEffect, useState } from "react";
import styles from "./App.module.scss";

import HeaderOrganism from "./components/organisms/HeaderOrganism";
import WorkBenchPage from "./components/pages/WorkBenchPage";
import { useDispatch, useSelector } from "react-redux";
import {
  selectWsServerUrl,
  setDefaultSetting,
} from "./store/defaultSettingSlice";
import { provider, ydoc } from "./store/initYDoc";

function App() {
  const dispatch = useDispatch();
  const serverUrl = useSelector(selectWsServerUrl);

  // SET DEFAULT SETTING
  useEffect(() => {
    window.addEventListener("message", (e) => {
      if (e.data.state != "setting") {
        dispatch(
          setDefaultSetting({
            userId: e.data.userId,
            userImage: e.data.userImage,
            teamName: e.data.teamName,
            projectName: e.data.projectName,
            serverPath: e.data.serverPath,
            serverPort: e.data.serverPort,
          })
        );
      }
    });

    return () => {
      provider.destroy();
      ydoc.destroy();
    };
  }, []);

  // CHANGE WS URL TO SERVER
  useEffect(() => {
    if (serverUrl != null) {
      provider.disconnect();
      ydoc.destroy();
      provider.url = serverUrl;
      provider.connect();
    }
  }, [serverUrl]);

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
