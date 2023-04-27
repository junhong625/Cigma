import styles from "../../styles/pages/WorkBenchPage.module.scss";
import SideBar from "../organisms/SideBar";
import WorkSpacePage from "./WorkSpacePage";

const WorkBenchPage = () => {
  return (
    <div className={styles.workbench}>
      <SideBar />
      <WorkSpacePage />
      <SideBar />
    </div>
  );
};
export default WorkBenchPage;
