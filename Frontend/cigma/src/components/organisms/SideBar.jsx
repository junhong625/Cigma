import React, { useState } from "react";
import IconText from "../atoms/IconText";
import { useLocation, useNavigate } from "react-router-dom";
import { BsFillFileEarmarkCodeFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import styles from "../../styles/organisms/SideBar.module.scss";

function SideBar({ openModal, teamList, setSelectedTeam, selectedTeam }) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const toHome = () => {
    navigate("/");
  };
  const toTrash = () => {
    navigate("/projects/trashcan");
  };
  const toProfile = () => {
    navigate("/profilemodify");
  };

  const [openTeams, setOpenTeams] = useState(false);
  const [firstClick, setFirstClick] = useState(false);
  const changeTeamArc = () => {
    setFirstClick(true);
    setOpenTeams(!openTeams);
  };

  const changeTeam = (index) => {
    setSelectedTeam(index);
    navigate("/projects");
  };

  return (
    <div className={styles.blockContainer}>
      <div className={styles.sideBarContainer}>
        <div className={openTeams ? styles.openContainer : styles.topContainer}>
          <div
            className={styles.logo}
            onClick={() => {
              toHome();
            }}
          >
            <img src={"/img/Logo.png"} alt="logo" />
            <div
              className={`${styles.logoTitle} ${
                openTeams ? "" : styles.noTitle
              }`}
            >
              Cigma
            </div>
          </div>

          <div
            onClick={() => {
              changeTeamArc();
            }}
            className={`${styles.menu} ${
              pathname === "/projects" && openTeams
                ? `${styles.menuActivate}`
                : ""
            }`}
          >
            <IconText
              icon={<BsFillFileEarmarkCodeFill />}
              text={"Projects"}
              openTeams={openTeams}
            />
            <div
              className={`${styles.dropArrow} ${
                openTeams ? "" : styles.noArrow
              }`}
            >
              {openTeams ? "▼" : "▶"}
            </div>
          </div>

          <div
            className={`${styles.dropDown} ${
              firstClick
                ? openTeams
                  ? `${styles.openTeams}`
                  : `${styles.closeTeams}`
                : ""
            }`}
          >
            {teamList.map((team, index) => (
              <div
                key={"team" + index}
                onClick={() => {
                  changeTeam(index);
                }}
                className={`${styles.teamButton} ${
                  selectedTeam === index && pathname === "/projects"
                    ? `${styles.activate}`
                    : ""
                }`}
              >
                {team}
              </div>
            ))}
            <div onClick={openModal} className={styles.teamButton}>
              + Create Team
            </div>
          </div>

          <div
            onClick={() => {
              toTrash();
            }}
            className={`${styles.menu} ${
              pathname === "/projects/trashcan" ? `${styles.menuActivate}` : ""
            }`}
          >
            <IconText
              icon={<FaTrashAlt />}
              text={"Trash Can"}
              openTeams={openTeams}
            />
          </div>
          <div className={styles.menu}>
            <a
              href="/docs"
              target="_blank"
              style={{ textDecoration: "none", color: "white" }}
            >
              <IconText icon={<FaBook />} text={"Docs"} openTeams={openTeams} />
            </a>
          </div>
        </div>

        <div className={styles.bottomContainer}>
          <div
            className={styles.menu}
            // onclick 시 확인 후(?) 로그아웃 후 메인 페이지로 돌아감 or 프로그램 종료?
          >
            <IconText
              icon={<AiOutlineLogout />}
              text={"Log Out"}
              openTeams={openTeams}
            />
          </div>
          <div
            className={styles.menu}
            onClick={() => {
              toProfile();
            }}
          >
            {/* 유저 프로필 이미지를 불러와야 함 */}
            <IconText
              icon={<FaUserAlt />}
              text={"Profile"}
              openTeams={openTeams}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
