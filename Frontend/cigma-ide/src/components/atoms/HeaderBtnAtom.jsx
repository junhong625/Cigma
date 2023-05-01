import React, { useState } from "react";
import styles from "../../styles/atoms/HeaderBtnAtom.module.scss";

const HeaderBtnAtom = (props, { onClick }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`${styles.iconBtn} ${
        focused ? styles.focus : styles.notFocus
      }`}
      onClick={() => {
        setFocused(!focused);
        onClick;
      }}
    >
      {props.children}
    </div>
  );
};

export default HeaderBtnAtom;
