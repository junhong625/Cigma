import React from "react";
import InputAtom from "../atoms/InputAtom";
import ButtonAtom from "../atoms/ButtonAtom";
import "../../styles/organisms/SignOrganism.scss";

const SignOrganism2 = ({ onClick }) => {
  return (
    <div className="sign-box">
      <h1>이메일 인증</h1>
      <InputAtom id={"email"} type={"email"} label={"이메일"} />
      <InputAtom id={"verifynumber"} type={"verifynumber"} label={"인증번호"} />
      <ButtonAtom
        buttonName={"인증번호 확인"}
        onClick={onClick}
        style={{ marginBottom: "13px" }}
      />
    </div>
  );
};
export default SignOrganism2;
