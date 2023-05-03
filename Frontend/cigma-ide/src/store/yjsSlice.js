import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { createSlice } from "@reduxjs/toolkit";

const ydoc = new Y.Doc();

const roomName = "WorkSpace";

const initialState = {
  ydoc: ydoc,
  provider: new WebrtcProvider(roomName, ydoc),
};

const yjsSlice = createSlice({
  name: "yjsSlice",
  initialState,
  reducers: {
    resetYjs: () => initialState,
    setProvider: (state, { roomName, wsPath }) => {
      state.provider.disconnect();
      state.provider.doc = state.ydoc;
      state.provider.roomName = roomName;
      state.provider.signalingUrls = [wsPath];
      state.provider.connect();
    },
  },
});

export const selectYdoc = (state) => state.yjs.ydoc;

export const selectProvider = (state) => state.yjs.provider;

export const { resetYjs, setProvider } = yjsSlice.actions;

export default yjsSlice.reducer;
