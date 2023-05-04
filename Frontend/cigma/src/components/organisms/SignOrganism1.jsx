import React from "react";
import InputAtom from "../atoms/InputAtom";
import ButtonAtom from "../atoms/ButtonAtom";
import "../../styles/organisms/SignOrganism.scss";

const SignOrganism1 = ({ onClick, name, setName, email, setEmail }) => {
  return (
    <div className="sign-box">
      <h1>이메일 인증</h1>
      <InputAtom
        id={"name"}
        type={"name"}
        label={"이름"}
        value={name}
        onChange={setName}
      />
      <InputAtom
        id={"email"}
        type={"email"}
        label={"이메일"}
        value={email}
        onChange={setEmail}
      />
      <ButtonAtom
        buttonName={"다음"}
        onClick={onClick}
        style={{ marginBottom: "13px" }}
      />
    </div>
  );
};
export default SignOrganism1;
