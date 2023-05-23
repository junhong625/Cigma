import React, { useState } from "react";
import { useEffect } from "react";
import "../../styles/pages/LoginPage.scss";
import InputAtom from "../atoms/InputAtom";
import ButtonAtom from "../atoms/ButtonAtom";
import NavLogo from "../atoms/NavLogo";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserInfo, login } from "../../api/account";
import { useDispatch, useSelector } from "react-redux";
import userToken, { modifyUserToken } from "../../store/userToken";
import { setUserID, setUserImage } from "../../store/user";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goStart = () => {
    navigate("/");
  };

  // 회원정보 조회 하기
  const getInformation = async ({ token }) => {
    console.log(`전달되는 토큰 정보? ${token}`);
    const { status, data } = await getUserInfo(token);
    if (status === 200) {
      // 회원정보조회하기
      console.log("userdata", JSON.stringify(data));
      dispatch(setUserID(data.userEmail));
      dispatch(setUserImage(data.userImageUrl));
    } else {
      console.log("get information error");
    }
  };
  const loginClick = async () => {
    if (email.trim() === "") {
      alert("이메일을 입력해주세요");
      return;
    }
    if (password.trim() === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }
    const { status, token, refreshToken } = await login(email, password);
    if (status === 200) {
      alert("로그인 되었습니다");
      // dispatch(modifyUserToken(token));
      dispatch(modifyUserToken(token));
      getInformation({ token });
      navigate("/projects");
    } else {
      alert("유효하지 않는 정보입니다");
      setEmail("");
      setPassword("");
    }
  };
  const onKeyDown = (event) => {
    if (event.key == "Enter") {
      loginClick();
    }
  };
  return (
    <div className="login-container">
      <nav>
        <NavLogo style={{ color: "#ffffff" }} onClick={goStart} />
      </nav>
      <div className="login-box">
        <h1>돌아오신 것을 환영해요!{<br />}다시 한 번 Cigma를 느껴보세요.</h1>
        <InputAtom
          id={"email"}
          type={"email"}
          label={"이메일"}
          value={email}
          onChange={setEmail}
          onKeyPress={onKeyDown}
        />
        <InputAtom
          id={"password"}
          type={"password"}
          label={"비밀번호"}
          value={password}
          onChange={setPassword}
          onKeyPress={onKeyDown}
        />
        <div className="auto-login">
          <input type="checkbox" id="autoLogin" />
          <label htmlFor="autoLogin">자동로그인</label>
        </div>
        <ButtonAtom buttonName={"로그인"} onClick={loginClick} />
        <div className="go-signup">
          <p>계정이 필요하신가요?</p>
          <NavLink to="/signup">
            <p style={{ color: "#5f6f90", fontWeight: "bold" }}>가입하기</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
