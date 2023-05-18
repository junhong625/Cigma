import React, { useRef, useState, useEffect } from "react";
import IconTextAtom from "../atoms/IconTextAtom";
import { useLocation, useNavigate } from "react-router-dom";
import { BsFillFileEarmarkCodeFill } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import { BsBoxArrowRight } from "react-icons/bs";
import styles from "../../styles/organisms/SideBarOrganism.module.scss";
import { logout } from "../../api/account";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserToken } from "../../store/userToken";
import { persistor } from "../../store/store";
import { createTeams } from "../../api/team";

function SideBar({ setTeamList, teamList, setSelectedTeam, selectedTeam }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
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

  // 유저토큰 정보 가져오기
  const userToken = useSelector((store) => store.userToken);

  /**
   * @description 로그아웃버튼 누르고 로그인화면으로 이동시키기
   */
  const toMain = async () => {
    const { status } = await logout(userToken);
    if (status === 200) {
      alert("로그아웃 되었습니다");
      dispatch(deleteUserToken);
      persistor.purge(); // 토큰 초기화
      navigate("/login");
    }
  };

  const [openTeams, setOpenTeams] = useState(false);
  const [firstClick, setFirstClick] = useState(false);
  const [onCreate, setOnCreate] = useState(false);
  const newTeamName = useRef();
  const pressEnter = async (event) => {
    if (event.key === "Enter") {
      // 새로운 팀을 생성하는 코드 (API)
      // 요금제에 따른 생성 갯수 제한?
      // 이하는 임시 코드
      if (newTeamName.current.value === "") {
        setOnCreate(false);
        return;
      }
      const { status, data } = await createTeams(userToken, newTeamName.current.value);
      if (status === 201) {
        setTeamList();
      }
      // 그 후 입력값 초기화
      newTeamName.current.value = "";
      setOnCreate(false);
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

  useEffect(() => {
    if (onCreate) {
      newTeamName.current.focus();
    }
  }, [onCreate]);

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
            <div className={`${styles.logoTitle} ${openTeams ? "" : styles.noTitle}`}>Cigma</div>
          </div>

          <div
            onClick={() => {
              changeTeamArc();
            }}
            className={`${styles.menu} ${
              pathname === "/projects" && openTeams ? `${styles.menuActivate}` : ""
            }`}
          >
            <IconTextAtom
              icon={<BsFillFileEarmarkCodeFill />}
              text={"Teams"}
              openTeams={openTeams}
            />
            <div className={`${styles.dropArrow} ${openTeams ? "" : styles.noArrow}`}>
              {openTeams ? "▼" : "▶"}
            </div>
          </div>

          <div
            className={`${styles.dropDown} ${
              firstClick ? (openTeams ? `${styles.openTeams}` : `${styles.closeTeams}`) : ""
            }`}
          >
            {teamList.map((team, index) => (
              <div
                key={"team" + index}
                onClick={() => {
                  changeTeam(index);
                }}
                className={`${styles.teamButton} ${
                  selectedTeam === index && pathname === "/projects" ? `${styles.activate}` : ""
                }`}
              >
                {team.teamName}
              </div>
            ))}
            {onCreate ? (
              <input
                type="text"
                ref={newTeamName}
                onKeyDown={pressEnter}
                className={styles.newTeam}
                onBlur={() => {
                  setOnCreate(false);
                  newTeamName.current.value = "";
                }}
              />
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
            <IconTextAtom icon={<BsTrashFill />} text={"Recycle Bin"} openTeams={openTeams} />
          </div>
          <div className={styles.menu}>
            <a href="/docs" target="_blank" style={{ textDecoration: "none", color: "white" }}>
              <IconTextAtom icon={<BsJournalBookmarkFill />} text={"Docs"} openTeams={openTeams} />
            </a>
          </div>
        </div>

        <div className={styles.bottomContainer}>
          <div
            className={styles.menu}
            // onclick 시 확인 후(?) 로그아웃 후 메인 페이지로 돌아감 or 프로그램 종료?
            // TODO: 로그아웃처리
            onClick={() => {
              toMain();
            }}
          >
            <IconTextAtom icon={<BsBoxArrowRight />} text={"Log Out"} openTeams={openTeams} />
          </div>
          <div
            className={styles.menu}
            onClick={() => {
              toProfile();
            }}
          >
            {/* 유저 프로필 이미지를 불러와야 함 */}
            <IconTextAtom icon={<BsPersonFill />} text={"Profile"} openTeams={openTeams} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
