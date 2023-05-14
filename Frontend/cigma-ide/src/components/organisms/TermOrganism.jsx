import React, { useState, useEffect, useRef } from "react";
import { XTerm } from "../../library/xterm-for-react";
import styles from "../../styles/organisms/TermOrganism.module.scss";
import { Resizable } from "re-resizable";
import { useSelector } from "react-redux";
import { selectTermVisible } from "../../store/toolSlice";
import useTermWs from "../../hooks/useTermWs";
import { fitAddon, socket } from "../../store/initTerm";

const TermOrganism = ({ widthRight, setWidthRight, defaultWidthRight }) => {
  const xtermRef = useRef(null);
  const handleTerm = useSelector(selectTermVisible);
  const onData = useTermWs(socket);

  useEffect(() => {
    xtermRef.current.terminal.cursorBlink = true;
    socket.onmessage = (e) => {
      xtermRef.current.terminal.write(e.data);
    };
  }, []);
  return (
    <Resizable
      size={{ width: widthRight, height: "100%" }}
      minWidth={handleTerm ? 240 : 0}
      maxWidth={"35%"}
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
        fitAddon.fit();
        setWidthRight(nextWidth);
      }}
      className={handleTerm ? "" : styles.hidden}
      style={{ marginLeft: 3, overflow: "hidden", height: "100%" }}
    >
      <XTerm
        ref={xtermRef}
        onData={onData}
        addons={[fitAddon]}
        className={styles.xterm}
        onResize={() => {}}
      />
    </Resizable>
  );
};

export default TermOrganism;
