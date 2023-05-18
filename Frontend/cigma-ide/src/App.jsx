import { useEffect, useState } from "react";
import styles from "./App.module.scss";

import HeaderOrganism from "./components/organisms/HeaderOrganism";
import WorkBenchPage from "./components/pages/WorkBenchPage";
import { useDispatch, useSelector } from "react-redux";
import {
  selectWsServerUrl,
  setDefaultSetting,
} from "./store/defaultSettingSlice";
// import { provider, ydoc } from "./store/initYDoc";
import {
  changeYDoc,
  createYDoc,
  selectAwareness,
  selectProvider,
  selectyDoc,
} from "./store/yDocSlice";
import { bind } from "redux-yjs-bindings";
import store from "./store/configureStore";
import { changeTerm, createTerm, selectSocket } from "./store/termSlice";
const { VITE_WS_ROOMNAME, VITE_WS_PORT } = import.meta.env;

const roomName = VITE_WS_ROOMNAME || "workspace";
const port = VITE_WS_PORT || 5000;

function App() {
  const dispatch = useDispatch();
  const ydoc = useSelector(selectyDoc);
  const provider = useSelector(selectProvider);
  const awareness = useSelector(selectAwareness);
  const socket = useSelector(selectSocket);

  // SET DEFAULT SETTING
  useEffect(() => {
    dispatch(createYDoc({ roomName, port }));
    dispatch(createTerm({ port }));
    window.addEventListener("message", (e) => {
      if (e.data.state === "setting") {
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
        dispatch(
          changeYDoc({
            roomName,
            path: e.data.serverPath,
            port: e.data.serverPort,
          })
        );
        dispatch(
          changeTerm({
            path: e.data.serverPath,
            port: e.data.serverPort,
          })
        );
      }
    });

    return () => {
      provider.destroy();
      ydoc.destroy();
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (ydoc !== null) {
      bind(ydoc, store, "workbench");
    }
  }, [ydoc]);

  if (awareness && socket) {
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
  return (
    <div className={styles.app}>
      <p>Loading</p>
    </div>
  );
}

export default App;
