import styles from "../../styles/pages/WorkBenchPage.module.scss";
import SideBar from "../organisms/SideBar";
import FileTreeOrganism from "../organisms/FileTreeOrganism";
import WorkSpacePage from "./WorkSpacePage";

const WorkBenchPage = () => {
  return (
    <div className={styles.workbench}>
      {/* <SideBar /> */}
      <FileTreeOrganism />
      <WorkSpacePage />
      {/* <SideBar /> */}
    </div>
  );
};
export default WorkBenchPage;
