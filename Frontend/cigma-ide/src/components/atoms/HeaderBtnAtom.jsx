import React, { useState } from "react";
import styles from "../../styles/atoms/HeaderBtnAtom.module.scss";

const HeaderBtnAtom = (props) => {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`${styles.iconBtn} ${
        focused ? styles.focus : styles.notFocus
      }`}
      onClick={() => {
        setFocused(!focused);
        if (props.onClick) {
          props.onClick();
        }
      }}
    >
      {props.children}
    </div>
  );
};

export default HeaderBtnAtom;
