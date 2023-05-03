import express from "express";
import path from "path";
import { WebSocketServer } from "ws";
import http from "http";
import { setupWSConnection } from "./socket/utils.js";

// file server

const app = express();

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

// =====================================================
// webRTC server
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 4444;
// @ts-ignore
const wss = new WebSocketServer({ noServer: true });

const server = http.createServer(app);

wss.on("connection", setupWSConnection);

server.on("upgrade", (request, socket, head) => {
  // You may check auth of request here..
  /**
   * @param {any} ws
   */
  const handleAuth = (ws) => {
    wss.emit("connection", ws, request);
  };
  wss.handleUpgrade(request, socket, head, handleAuth);
});

server.listen(port, host, () => {
  console.log(`running at '${host}' on port ${port}`);
});

//=======================================================================
