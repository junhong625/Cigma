import React from "react";
import InputAtom from "../atoms/InputAtom";
import ButtonAtom from "../atoms/ButtonAtom";
import "../../styles/organisms/SignOrganism.scss";

const SignOrganism1 = ({ onClick }) => {
  return (
    <div className="sign-box">
      <h1>이메일 인증</h1>
      <InputAtom id={"name"} type={"name"} label={"이름"} />
      <InputAtom id={"email"} type={"email"} label={"이메일"} />
      <ButtonAtom
        buttonName={"인증번호 전송"}
        onClick={onClick}
        style={{ marginBottom: "13px" }}
      />
    </div>
  );
};
export default SignOrganism1;
