import express from "express";
import path from "path";
import fs from "fs";
import { WebSocketServer } from "ws";
import http from "http";
import router from "./fsRoute.js";
import fileUpload from "express-fileupload";
import { setupWSConnection } from "./socket/utils.js";
import { setupPty } from "./socket/simplePty.js";

// file server

const app = express();

//file upload
app.use(fileUpload());

// =====================================================
// webSocket server
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

// websocket server end ==================================

// term websocket server =================================
const termPort = process.env.TERMPORT || 3333;
const termServer = http.createServer(app);

const termWs = new WebSocketServer({ noServer: true });

termWs.on("connection", setupPty);

termServer.on("upgrade", (request, socket, head) => {
  // You may check auth of request here..
  /**
   * @param {any} ws
   */
  const handleAuth = (ws) => {
    wss.emit("connection", ws, request);
  };
  wss.handleUpgrade(request, socket, head, handleAuth);
});

termServer.listen(termPort);
console.log("Term server running on port : ", termPort);

// term websocket server end =============================

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router
app.use("/api", router);

server.listen(port);
console.log("Signaling server running on localhost:", port);

//=======================================================================
