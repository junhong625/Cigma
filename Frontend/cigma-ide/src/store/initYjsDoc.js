import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

/**
 *
 * @param wsPath websocket address
 * @param roomName roomName ex) teamName_projectName
 * @returns Object
 */
const initYjsDoc = (wsPath, roomName) => {
  if (wsPath !== undefined) {
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(wsPath, roomName, ydoc);
    return { ydoc: ydoc, provider: provider };
  } else {
    return { ydoc: null, provider: null };
  }
};

export default initYjsDoc;
