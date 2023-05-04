import React from "react";
import InputAtom from "../atoms/InputAtom";
import ButtonAtom from "../atoms/ButtonAtom";
import "../../styles/organisms/SignOrganism.scss";

const SignOrganism3 = ({
  onClick,
  password,
  setPassword,
  password2,
  setPassword2,
}) => {
  return (
    <div className="sign-box">
      <h1>비밀번호 설정</h1>
      <InputAtom
        id={"password"}
        type={"password"}
        label={"비밀번호"}
        value={password}
        onChange={setPassword}
      />
      <InputAtom
        id={"verifypassword"}
        type={"verifypassword"}
        label={"비밀번호 확인"}
        value={password2}
        onChange={setPassword2}
      />
      <ButtonAtom
        buttonName={"회원가입"}
        onClick={onClick}
        style={{ marginBottom: "13px" }}
      />
    </div>
  );
};
export default SignOrganism3;
