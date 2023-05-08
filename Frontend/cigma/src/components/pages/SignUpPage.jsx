import React, { useState } from "react";
import "../../styles/pages/SignUpPage.scss";
import NavLogo from "../atoms/NavLogo";
import SignOrganism1 from "../organisms/SignOrganism1";
import SignOrganism2 from "../organisms/SignOrganism2";
import SignOrganism3 from "../organisms/SignOrganism3";
import { signup } from "../../api/account";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  const goSecond = () => {
    if (name.trim() === "") {
      alert("이름을 입력해주세요");
      return;
    }
    if (email.trim() === "") {
      alert("메일을 입력해주세요");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }
    setPage(2);
  };
  const signupClick = async () => {
    if (password.trim() === "") {
      alert("비밀번호을 입력해주세요");
      return;
    }
    if (password2.trim() === "") {
      alert("비밀번호 확인을 입력해주세요");
      return;
    }
    if (password !== password2) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }
    const { status } = await signup(email, password, name);
    if (status === 201) {
      alert("회원가입이 완료되었습니다");
      navigate("/login");
    } else {
      alert("중복된 이메일입니다");
      setName("");
      setEmail("");
      setPassword("");
      setPassword2("");
      setPage(1);
    }
  };
  const onKeyPress1 = (event) => {
    if (event.key == "Enter") {
      goSecond();
    }
  };
  const onKeyPress2 = (event) => {
    if (event.key == "Enter") {
      signupClick();
    }
  };
  return (
    <div className="sign-container">
      <nav>
        <NavLogo style={{ color: "#ffffff" }} />
      </nav>
      {page === 1 && (
        <SignOrganism1
          onClick={goSecond}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          onKeyPress={onKeyPress1}
        />
      )}
      {/* {page === 2 && <SignOrganism2 onClick={goThird} />} */}
      {page === 2 && (
        <SignOrganism3
          onClick={signupClick}
          password={password}
          setPassword={setPassword}
          password2={password2}
          setPassword2={setPassword2}
          onKeyPress={onKeyPress2}
        />
      )}
    </div>
  );
};

export default SignUpPage;
