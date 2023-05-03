import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

const { VITE_WS_ROOMNAME, VITE_WS_PORT, VITE_WS_IP } = import.meta.env;

const roomName = VITE_WS_ROOMNAME || "WorkSpace-1";
const port = VITE_WS_PORT || "4444";
const wsIP = VITE_WS_IP || "localhost";

export const ydoc = new Y.Doc();

export const provider = new WebrtcProvider(roomName, ydoc, {
  signaling: [`ws://${wsIP}:${port}`],
});
export const awareness = provider.awareness;
export const yMap = ydoc.getMap();
