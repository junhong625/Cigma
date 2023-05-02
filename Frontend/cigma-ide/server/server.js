import express from "express";
import path from "path";
import { WebSocketServer } from "ws";
import http from "http";
import { onconnection } from "./socket/setWebrtc.js";

// file server

const app = express();

// =====================================================
// webRTC server

const port = process.env.PORT || 4444;
// @ts-ignore
const wss = new WebSocketServer({ noServer: true });

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("okay");
});

wss.on("connection", onconnection);

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

server.listen(port);
console.log("Signaling server running on localhost:", port);

//=======================================================================
