import styles from "./App.module.scss";
import EditorOrganism from "./components/organisms/EditorOrganism";
import HeaderOrganism from "./components/organisms/HeaderOrganism";

function App() {
  return (
    <div className={styles.app}>
      <header>
        <HeaderOrganism />
      </header>
      <div className={styles.workspaceDiv}>
        <EditorOrganism />
      </div>
    </div>
  );
}

export default App;
