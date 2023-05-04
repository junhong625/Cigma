import { createSlice, current } from "@reduxjs/toolkit";
import { yLocs } from "./initYDoc";

const generateCodeEditor = (top, left) => ({
  codeEditorName: "",
  top,
  left,
  width: 800,
  height: 500,
});

const initialState = [generateCodeEditor(1000, 1000)];
yLocs.set("codeEditors", initialState);

const codeEditorSlice = createSlice({
  name: "codeEditor",
  initialState,
  reducers: {
    // 작성중인 코드에디터 불러오기
    loadCodeEditor: (_, { payload }) => {
      // yLocs.set("codeEditors", payload);
      return payload;
    },
    // 코드에디터 숨기기
    hideCodeEditor: (state, { payload: codeEditorIndex }) => {
      state.splice(codeEditorIndex, 1);
      // yLocs.set("codeEditors", state);
    },
    // 코드에디터 추가
    showCodeEditor: (state, { payload: { top, left } }) => {
      console.log("working");
      const newCodeEditor = {
        ...generateCodeEditor(top, left),
        canvasName: `canvas_${state.length}`,
      };
      state.push(newCodeEditor);
      // yLocs.set("codeEditors", state);
    },
    // 코드에디터 이름 바꾸기
    changeCodeEditorName: (state, { payload: { name, codeEditorIndex } }) => {
      state[codeEditorIndex].canvasName = name;
      // yLocs.set("codeEditors", state);
    },
    // 코드에디터 위치 수정
    modifyCodeEditor: (state, { payload }) => {
      const codeEditorIndex = payload.codeEditorIndex;
      delete payload.codeEditorIndex;
      state[codeEditorIndex] = {
        ...state[codeEditorIndex],
        ...payload,
      };
      // yLocs.set("codeEditors", state);
    },
    // 코드에디터 크기 수정
    resizeNorth: (state, { payload }) => {
      const codeEditorIndex = payload.codeEditorIndex;
      state[codeEditorIndex].top =
        current(state[codeEditorIndex]).top + payload.change;
      state[codeEditorIndex].height =
        current(state[codeEditorIndex]).height - payload.change;
    },
    resizeEast: (state, { payload }) => {
      const codeEditorIndex = payload.codeEditorIndex;
      state[codeEditorIndex].width =
        current(state[codeEditorIndex]).width + payload.change;
    },
    resizeSouth: (state, { payload }) => {
      const codeEditorIndex = payload.codeEditorIndex;
      state[codeEditorIndex].height =
        current(state[codeEditorIndex]).height + payload.change;
    },
    resizeWest: (state, { payload }) => {
      const codeEditorIndex = payload.codeEditorIndex;
      state[codeEditorIndex].left =
        current(state[codeEditorIndex]).left + payload.change;
      state[codeEditorIndex].width =
        current(state[codeEditorIndex]).width - payload.change;
    },
    resizeNorthEast: (state, { payload }) => {
      const codeEditorIndex = payload.codeEditorIndex;
      state[codeEditorIndex].top =
        current(state[codeEditorIndex]).top - payload.verChange;
      state[codeEditorIndex].height =
        current(state[codeEditorIndex]).height - payload.verChange;
      state[codeEditorIndex].width =
        current(state[codeEditorIndex]).width - payload.verChange;
    },
    resizeSouthEast: (state, { payload }) => {
      const codeEditorIndex = payload.codeEditorIndex;
      state[codeEditorIndex].height =
        current(state[codeEditorIndex]).height + payload.verChange;
      state[codeEditorIndex].width =
        current(state[codeEditorIndex]).width + payload.horChange;
    },
    resizeNorthWest: (state, { payload }) => {
      const codeEditorIndex = payload.codeEditorIndex;
      state[codeEditorIndex].top =
        current(state[codeEditorIndex]).top + payload.verChange;
      state[codeEditorIndex].height =
        current(state[codeEditorIndex]).height - payload.verChange;
      state[codeEditorIndex].left =
        current(state[codeEditorIndex]).left + payload.horChange;
      state[codeEditorIndex].width =
        current(state[codeEditorIndex]).width - payload.horChange;
    },
    resizeSouthWest: (state, { payload }) => {
      const codeEditorIndex = payload.codeEditorIndex;
      state[codeEditorIndex].height =
        current(state[codeEditorIndex]).height + payload.verChange;
      state[codeEditorIndex].left =
        current(state[codeEditorIndex]).left + payload.horChange;
      state[codeEditorIndex].width =
        current(state[codeEditorIndex]).width - payload.horChange;
    },
  },
});

export const selectAllCodeEditor = (state) => state.workbench.codeEditor;
// export const selectAllCodeEditor = () => yLocs.get("codeEditors");

// export const selectCanvasLength = (state) =>
//   state.workbench.present.canvas.length;

export const {
  loadCodeEditor,
  hideCodeEditor,
  showCodeEditor,
  changeCodeEditorName,
  modifyCodeEditor,
  resizeEast,
  resizeNorth,
  resizeSouth,
  resizeWest,
  resizeNorthEast,
  resizeSouthEast,
  resizeNorthWest,
  resizeSouthWest,
} = codeEditorSlice.actions;

export default codeEditorSlice.reducer;
