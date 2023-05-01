import React from "react";
import HeaderBtnAtom from "../atoms/HeaderBtnAtom";
import {
  BsFillTerminalFill,
  BsFillPlayFill,
  BsFillFileEarmarkTextFill,
  BsFileFontFill,
} from "react-icons/bs";

import styles from "../../styles/organisms/HeaderOrganism.module.scss";
/*
추가적인 기능을 plugin 방식으로 추가할 경우
해당 부분을 setting 관련 파일에서 plugin을 
개수와 아이콘을 불러와서 추가하는 방식으로 
하는 것 이 좋아보임
*/

const HeaderOrganism = () => {
  return (
    <>
      <div className={styles.headerLeftDiv}>
        <img
          className={styles.logo}
          src="./assets/img/Logo.png"
          alt="thisislogo"
        />
        {/* plugin 추가 */}
        <HeaderBtnAtom
          onClick={() => {
            // handle click Event
          }}
        >
          <BsFillFileEarmarkTextFill color="white" size={24} />
        </HeaderBtnAtom>
        <HeaderBtnAtom>
          <BsFileFontFill color="white" size={24} />
        </HeaderBtnAtom>
        <HeaderBtnAtom>
          <BsFillTerminalFill color="white" size={24} />
        </HeaderBtnAtom>
      </div>
      <div className={styles.headerMiddleDiv}>Project Name</div>
      <div className={styles.headerRightDiv}>
        <button className={styles.shareBtn}>share</button>
        <HeaderBtnAtom>
          <BsFillPlayFill color="white" size={24} />
        </HeaderBtnAtom>
      </div>
    </>
  );
};

export default HeaderOrganism;
