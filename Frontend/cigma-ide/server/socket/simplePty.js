import pty from "node-pty";
import path from "path";
import os from "os";

const __dirname = path.resolve();

const shell = os.platform() === "win32" ? "powershell.exe" : "bash";

export const setupPty = (conn, req) => {
  const term = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: "../../workspace/project",
  });

  term.onData((data) => {
    conn.send(data);
  });

  conn.on("message", (data) => {
    term.write(data);
  });

  conn.on("disconnect", () => {
    term.kill();
    console.log("term is killed!!");
  });
};
