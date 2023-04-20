import React from "react";
import "../../styles/atoms/Button.scss";

const Button = ({ onclick, buttonName }) => {
  return (
    <button className="login-button" onClick={onclick}>
      {buttonName}
    </button>
  );
};
export default Button;
