import React from "react";
import { DevDocs } from "./DevDocs";
import { IntroductionDocs } from "./IntroductionDocs";
// import DevDocs from "../organisms/DevDocs.md";
function DocsContainer({ menuText }) {
  return (
    <div
      style={{
        display: "flex",
        overflow: "auto",
        padding: "1.5em",
        width: "100%",
      }}
    >
      {menuText === "intro" && <IntroductionDocs />}
      {menuText === "develop" && <DevDocs />}
      {menuText === "user" && <DevDocs />}
    </div>
  );
}

export default DocsContainer;
