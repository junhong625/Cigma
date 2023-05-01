import styles from "../../styles/pages/WorkBenchPage.module.scss";
import FileTreeOrganism from "../organisms/FileTreeOrganism";
import WorkSpacePage from "./WorkSpacePage";

const WorkBenchPage = () => {
  return (
    <div className={styles.workbench}>
      <FileTreeOrganism />
      <WorkSpacePage />
    </div>
  );
};
export default WorkBenchPage;
