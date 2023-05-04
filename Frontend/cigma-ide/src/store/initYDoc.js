import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

const { VITE_WS_ROOMNAME, VITE_WS_PORT, VITE_WS_IP } = import.meta.env;

const roomName = VITE_WS_ROOMNAME || "WorkSpace";
const port = VITE_WS_PORT || "4444";
const wsIP = VITE_WS_IP || "localhost";

console.log(wsIP);

export const ydoc = new Y.Doc();

export const provider = new WebsocketProvider(
  `ws://${window.location.hostname}:${port}`,
  roomName,
  ydoc
);
export const awareness = provider.awareness;
export const yMap = ydoc.getMap();
