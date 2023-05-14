import React from 'react'
import styles from '../../styles/atoms/OnboardPicture.module.scss'

function OnboardPicture({ iconName}) {
  return (
    <div className={styles["image-container"]}>
      <img className={styles.icons} src={`/src/assets/${iconName}`} />
    </div>
  )
}

export default OnboardPicture