import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

const { VITE_WS_ROOMNAME, VITE_WS_PORT } = import.meta.env;

const roomName = VITE_WS_ROOMNAME || "workspace";
const port = VITE_WS_PORT || 5000;

export const ydoc = new Y.Doc();

export const provider = new WebsocketProvider(
  `ws://${window.location.hostname}:${port}`,
  roomName,
  ydoc
);

export const awareness = provider.awareness;

console.log("clientID : ", awareness.clientID);
