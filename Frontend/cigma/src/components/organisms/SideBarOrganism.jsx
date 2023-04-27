import React, { useRef, useState } from "react";
import IconTextAtom from "../atoms/IconTextAtom";
import { useLocation, useNavigate } from "react-router-dom";
import { BsFillFileEarmarkCodeFill } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import { BsBoxArrowRight } from "react-icons/bs";
import styles from "../../styles/organisms/SideBarOrganism.module.scss";

function SideBar({ setTeamList, teamList, setSelectedTeam, selectedTeam }) {
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
  const [onCreate, setOnCreate] = useState(false);
  const newTeamName = useRef("");
  const pressEnter = (event) => {
    if (event.key === "Enter") {
      // Enter 키를 누르면 새로운 팀을 생성한다 (API)
      // setTeamList([...teamList, newTeamName.current]);

      // 그 후 입력값 초기화
      newTeamName.current = "";
    }
  };

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
            <IconTextAtom
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
            {onCreate ? (
              <input type="text" ref={newTeamName} onKeyDown={pressEnter} />
            ) : (
              <div
                onClick={() => {
                  setOnCreate(true);
                }}
                className={styles.teamButton}
              >
                + Create Team
              </div>
            )}
          </div>

          <div
            onClick={() => {
              toTrash();
            }}
            className={`${styles.menu} ${
              pathname === "/projects/trashcan" ? `${styles.menuActivate}` : ""
            }`}
          >
            <IconTextAtom
              icon={<BsTrashFill />}
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
              <IconTextAtom
                icon={<BsJournalBookmarkFill />}
                text={"Docs"}
                openTeams={openTeams}
              />
            </a>
          </div>
        </div>

        <div className={styles.bottomContainer}>
          <div
            className={styles.menu}
            // onclick 시 확인 후(?) 로그아웃 후 메인 페이지로 돌아감 or 프로그램 종료?
          >
            <IconTextAtom
              icon={<BsBoxArrowRight />}
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
            <IconTextAtom
              icon={<BsPersonFill />}
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
