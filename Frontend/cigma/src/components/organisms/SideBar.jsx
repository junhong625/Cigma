import React, { useState } from "react";
import IconText from "../atoms/IconText";
import { useLocation, useNavigate } from "react-router-dom";
import { BsFillFileEarmarkCodeFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import { FaBook } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import styles from "../../styles/organisms/SideBar.module.scss";

function SideBar({ openModal, teamList, setSelectedTeam, selectedTeam }) {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname;
  const toHome = () => {
    navigate('/')
  }
  const toTrash = () => {
    navigate('/projects/trashcan')
  }

  const [openTeams, setOpenTeams] = useState(false)
  const changeTeamArc = () => {
    setOpenTeams(!openTeams)
  }

  const changeTeam = (index) => {
    setSelectedTeam(teamList[index])
    navigate('/projects')
  }

  return (
    <div className={styles.sideBarContainer}>
      <div className={styles.topContainer}>
        <div className={styles.logo} onClick={() => { toHome() }}>
          <img src={"/img/Logo.png"}
            alt="logo" />
          Cigma
        </div>

        <div onClick={() => { changeTeamArc() }} className={`${styles.menu} ${pathname === "/projects" ? `${styles.menuActivate}` : ""}`}>
          <IconText icon={<BsFillFileEarmarkCodeFill />} text={"Projects"} />
        </div>

        <div className={`${styles.dropDown} ${openTeams ? "" : `${styles.closeTeams}`}`}>
          {teamList.map((team, index) => (
            <div
              key={team + index}
              onClick={() => { changeTeam(index) }}
              className={`${styles.teamButton} ${selectedTeam === team && pathname === "/projects" ? `${styles.activate}` : ""}`}>{team}</div>
          ))}
          <div onClick={openModal} className={styles.teamButton}> + Create Team </div>
        </div>

        <div
          onClick={() => { toTrash() }}
          className={`${styles.menu} ${pathname === "/projects/trashcan" ? `${styles.menuActivate}` : ""}`}>
          <IconText icon={<FaTrashAlt />} text={"Trash Can"} />
        </div>
        <a href="/docs" target="_blank" >
          <div className={styles.menu}>
            <IconText icon={<FaBook />} text={"Docs"} />
          </div>
        </a>


      </div>

      <div className={styles.bottomContainer}>
        <IconText icon={<AiOutlineLogout />} text={"Log Out"} />
        {/* 유저 프로필 이미지를 불러와야 함 */}
        <IconText icon={<FaUserAlt />} text={"Profile"} />
      </div>
    </div>
  )
}

export default SideBar