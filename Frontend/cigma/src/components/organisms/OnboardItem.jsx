import React from 'react';
import styles from '../../styles/organisms/OnboardItem.module.scss';
import OnboardPicture from "../atoms/OnboardPicture";
import OnboardTitle from "../atoms/OnboardTitle";

function OnboardItem({ iconName, color, title, subTitle, subSecondTitle, reversed}) {
  return (
    <div className={styles["item-container"]} style={{backgroundColor: color}} >
      { reversed? (
        <>
          <OnboardPicture iconName={iconName} />
          <OnboardTitle title={title} subTitle={subTitle} subSecondTitle={subSecondTitle} />
        </>
      ): (
          <>
            <OnboardTitle title={title} subTitle={subTitle} subSecondTitle={subSecondTitle}/>
            <OnboardPicture iconName={iconName} />
          </>
      )}

    </div>
  );
}

export default OnboardItem