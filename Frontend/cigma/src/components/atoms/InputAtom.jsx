import React from "react";
import "../../styles/atoms/InputAtom.scss";

/**
 *
 * @returns label(input 위의 라벨), id(라벨 input 연결 id), type(input type) 등
 */
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
