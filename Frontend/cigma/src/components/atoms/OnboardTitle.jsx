import React from 'react'
import styles from '../../styles/atoms/OnboardTitle.module.scss'

function OnboardTitle({title, subTitle, subSecondTitle}) {
  return (
    <div className={styles.container}>
      <div style={{
        color: "black",
        fontSize: "48px",
        margin: "0 0.5em",
        fontWeight: "bold",
        wordBreak: "break-all"
      }}>
        {title}
      </div>
      <div style={{
        color: "black",
        fontSize: "16px",
        margin: "0 0.5em",
        fontWeight: "normal",
        wordBreak: "break-all"
      }}>
        {subTitle}
      </div>
      <div style={{
        color: "black",
        fontSize: "16px",
        margin: "0 0.5em",
        fontWeight: "normal",
        wordBreak: "break-all"
      }}>
        {subSecondTitle}
      </div>
    </div>
  )
}

export default OnboardTitle