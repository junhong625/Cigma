import React from "react";
import "../../styles/atoms/InputAtom.scss";

const InputAtom = ({ label, id, type, placeholder, value, onChange }) => {
  return (
    <div className="label-input">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default InputAtom;
