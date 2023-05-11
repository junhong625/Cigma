import React, { useEffect, useRef } from "react";
import { XTerm } from "../../library/xterm-for-react";
import styles from "../../styles/organisms/TermOrganism.module.scss";
import { Resizable } from "re-resizable";
import { useSelector } from "react-redux";
import { selectTermVisible } from "../../store/toolSlice";

import { FitAddon } from "xterm-addon-fit";
import { AttachAddon } from "xterm-addon-attach";

const socket = new WebSocket("ws://70.12.247.116:3333");

const TermOrganism = ({ widthRight, setWidthRight, defaultWidthRight }) => {
  const attachAddon = new AttachAddon(socket);
  const fitAddon = new FitAddon();
  const xtermRef = useRef(null);
  const handleTerm = useSelector(selectTermVisible);

  useEffect(() => {
    xtermRef.current.terminal.resize(10, 60);
    xtermRef.current.terminal.cursorBlink = true;
    // xtermRef.current.terminal.write("Hello World");
    // xtermRef.current.terminal.reset();
  }, []);
  return (
    <Resizable
      size={{ width: widthRight, height: "100%" }}
      minWidth={handleTerm ? 240 : 0}
      maxWidth={"30%"}
      enable={{
        top: false,
        right: false,
        bottom: false,
        left: true,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      onResizeStart={() => {
        defaultWidthRight.current = widthRight;
      }}
      onResize={(e, direction, ref, d) => {
        const nextWidth = defaultWidthRight.current + d.width;
        setWidthRight(nextWidth);
      }}
      className={handleTerm ? "" : styles.hidden}
      style={{ marginLeft: 3 }}
    >
      <XTerm
        ref={xtermRef}
        addons={[fitAddon, attachAddon]}
        className={styles.xterm}
        onResize={() => {
          fitAddon.fit();
        }}
      />
    </Resizable>
  );
};

export default TermOrganism;
