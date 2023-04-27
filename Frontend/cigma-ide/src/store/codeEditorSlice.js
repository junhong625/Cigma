import { createSlice } from "@reduxjs/toolkit";

const generateCodeEditor = (top, left) => ({
  codeEditorName: "",
  top,
  left,
  width: 800,
  height: 500,
});

const initialState = [generateCodeEditor(1000, 1000)];

const codeEditorSlice = createSlice({
  name: "codeEditor",
  initialState,
  reducers: {
    // 작성중인 코드에디터 불러오기
    loadCodeEditor: (_, { payload }) => {
      return payload;
    },
    // 코드에디터 숨기기
    hideCodeEditor: (state, { payload: codeEditorIndex }) => {
      state.splice(codeEditorIndex, 1);
    },
    // 코드에디터 추가
    showCodeEditor: (state, { payload: { top, left } }) => {
      console.log("working");
      const newCodeEditor = {
        ...generateCodeEditor(top, left),
        canvasName: `canvas_${state.length}`,
      };
      state.push(newCodeEditor);
    },
    // 코드에디터 이름 바꾸기
    changeCodeEditorName: (state, { payload: { name, codeEditorIndex } }) => {
      state[codeEditorIndex].canvasName = name;
    },
    // 코드에디터 위치 수정
    modifyCodeEditor: (state, { payload }) => {
      const codeEditorIndex = payload.codeEditorIndex;
      delete payload.codeEditorIndex;
      state[codeEditorIndex] = {
        ...state[codeEditorIndex],
        ...payload,
      };
    },
  },
});

export const selectAllCodeEditor = (state) => state.workbench.codeEditor;

// export const selectCanvasLength = (state) =>
//   state.workbench.present.canvas.length;

export const {
  loadCodeEditor,
  hideCodeEditor,
  showCodeEditor,
  changeCodeEditorName,
  modifyCodeEditor,
} = codeEditorSlice.actions;

export default codeEditorSlice.reducer;
