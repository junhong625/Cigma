import styles from "./App.module.scss";
import HeaderOrganism from "./components/organisms/HeaderOrganism";

function App() {
  return (
    <div className={styles.app}>
      <header>
        <HeaderOrganism />
      </header>
      <div className={styles.workspaceDiv}></div>
    </div>
  );
}

export default App;
