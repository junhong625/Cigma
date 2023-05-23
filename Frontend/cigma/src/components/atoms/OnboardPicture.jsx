import React from "react";
import styles from "../../styles/atoms/OnboardPicture.module.scss";

import group1 from "../../assets/group1.png";
import group2 from "../../assets/group2.png";
import group3 from "../../assets/group3.png";

function OnboardPicture({ iconName }) {
  let imageSource = null;

  if (iconName === "group1.png") {
    imageSource = group1;
  } else if (iconName === "group2.png") {
    imageSource = group2;
  } else if (iconName === "group3.png") {
    imageSource = group3;
  }

  return (
    <div className={styles["image-container"]}>
      {imageSource && <img className={styles.icons} src={imageSource} alt={iconName} />}
    </div>
  );
}

export default OnboardPicture;
