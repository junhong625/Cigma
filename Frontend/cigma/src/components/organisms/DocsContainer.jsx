import React from "react";
import { DevDocs } from "./DevDocs";
// import DevDocs from "../organisms/DevDocs.md";
function DocsContainer() {
  return (
    <div
      style={{
        display: "flex",
        overflow: "auto",
        padding: "1.5em",
        width: "100%",
      }}
    >
      <DevDocs />
    </div>
  );
}

export default DocsContainer;
