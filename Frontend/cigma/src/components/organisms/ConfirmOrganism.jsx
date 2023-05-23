import React from "react";
import ButtonAtom from "../atoms/ButtonAtom";
import styles from "../../styles/organisms/ConfirmOrganism.module.scss";

function ConfirmOrganism({ closeModal, propFunction, toDo }) {
  return (
    <div className={styles.app}>
      <div className={styles.title}>{toDo}</div>
      <div className={styles.buttonWrapper}>
        <ButtonAtom
          onClick={() => {
            propFunction();
            closeModal();
          }}
          buttonName={"네"}
          style={{ color: "#fefefe", width: "30%" }}
        />
        <ButtonAtom
          onClick={closeModal}
          buttonName={"아니오"}
          style={{ color: "#fefefe", width: "30%" }}
        />
      </div>
    </div>
  );
}

export default ConfirmOrganism;
