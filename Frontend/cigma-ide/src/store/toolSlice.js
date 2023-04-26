import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSelectorActivated: true,
  tools: ["seletor", "text"],
};

const toolSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    deactivateSelector: (state) => {
      state.isSelectorActivated = false;
    },
    activeSelctor: (state) => {
      state.isSelectorActivated = true;
    },
  },
});

export const { activeSelctor, deactivateSelector } = toolSlice.actions;

export default toolSlice.reducer;
