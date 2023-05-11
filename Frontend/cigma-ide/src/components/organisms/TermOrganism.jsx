import React, { useEffect, useRef } from "react";
import { XTerm } from "../../library/xterm-for-react";
import styles from "../../styles/organisms/TermOrganism.module.scss";

const TermOrganism = ({ editorPerson }) => {
  const xtermRef = useRef(null);

  useEffect(() => {
    // xtermRef.current.terminal.writeln("Hello World");
    xtermRef.current.terminal.reset();
  }, []);
  return (
    <div>
      <XTerm ref={xtermRef} />
    </div>
  );
};

export default TermOrganism;
