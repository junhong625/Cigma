import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

/**
 *
 * @param wsPath websocket address
 * @param roomName roomName ex) teamName_projectName
 * @returns Object
 */
const initYjsDoc = (wsPath, roomName) => {
  if (wsPath !== undefined) {
    const ydoc = new Y.Doc();
    // set default signaling server
    const provider = new WebrtcProvider(roomName, ydoc, {
      signaling: [wsPath],
    });
    return { ydoc: ydoc, provider: provider };
  } else {
    return { ydoc: null, provider: null };
  }
};

export default initYjsDoc;
