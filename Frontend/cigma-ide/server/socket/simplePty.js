import pty from "node-pty";
import os from "os";

const shell = os.platform() === "win32" ? "powershell.exe" : "bash";

export const setupPty = (conn, req) => {
  console.log("connected");
  const term = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env,
  });

  term.onData((data) => {
    conn.emit("output", data);
  });

  conn.on("input", (data) => {
    term.write(data);
  });

  conn.on("disconnect", () => {
    term.kill();
    console.log("term is killed!!");
  });
};
