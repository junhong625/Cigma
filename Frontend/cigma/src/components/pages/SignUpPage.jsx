import React, { useState } from "react";
import "../../styles/pages/SignUpPage.scss";
import NavLogo from "../atoms/NavLogo";
import SignOrganism1 from "../organisms/SignOrganism1";
import SignOrganism2 from "../organisms/SignOrganism2";
import SignOrganism3 from "../organisms/SignOrganism3";

const SignUpPage = () => {
  const [page, setPage] = useState(1);
  const goSecond = () => {
    setPage(2);
  };
  const goThird = () => {
    setPage(3);
  };
  return (
    <div className="sign-container">
      <nav>
        <NavLogo style={{ color: "#ffffff" }} />
      </nav>
      {page === 1 && <SignOrganism1 onClick={goSecond} />}
      {page === 2 && <SignOrganism2 onClick={goThird} />}
      {page === 3 && <SignOrganism3 />}
    </div>
  );
};

export default SignUpPage;
