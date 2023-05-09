import React, { useEffect, useRef } from "react";
import { XTerm } from "../../library/xterm-for-react";
import styles from "../../styles/organisms/TermOrganism.module.scss";
import { Resizable } from "re-resizable";

const TermOrganism = (props) => {
  const xtermRef = useRef(null);

  useEffect(() => {
    // xtermRef.current.terminal.writeln("Hello World");
    xtermRef.current.terminal.reset();
  }, []);
  return (
    <Resizable>
      <XTerm ref={xtermRef} className={styles.xterm} />
    </Resizable>
  );
};

export default TermOrganism;
