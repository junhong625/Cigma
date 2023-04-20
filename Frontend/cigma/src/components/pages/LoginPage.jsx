// LoginForm.jsx
import React from "react";
import "../../styles/pages/LoginPage.scss";
import InputAtom from "../atoms/InputAtom";
import ButtonAtom from "../atoms/ButtonAtom";

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>돌아오신 것을 환영해요!{<br />}다시 한 번 Cigma를 느껴보세요.</h1>
        <InputAtom id="email" type={"email"} label={"이메일"} />
        <InputAtom id="password" type={"password"} label={"비밀번호"} />
        <div className="auto-login">
          <input type="checkbox" id="autoLogin" />
          <label htmlFor="autoLogin">자동로그인</label>
        </div>
        <ButtonAtom buttonName={"로그인"} />
        <div className="go-signup">
          <p>계정이 필요하신가요?</p>
          <p style={{ color: "#5f6f90", fontWeight: "bold" }}>가입하기</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
