import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 텍스트 컬러
  color: "#2e2e2e",
  // 텍스트 두께
  thickness: 1,
  // 택스트 사이즈
  fontSize: 12,
};

const defaultTextSlice = createSlice({
  name: "defaultText",
  initialState,
  reducers: {
    // Text 스타일 로드
    loadText: (_, { payload }) => {
      return payload;
    },
    // 상태 초기화
    resetText: () => initialState,
    // 색상 변경
    setDefaultColor: (state, { payload }) => {
      state.color = payload;
    },
    // 두께 변경
    setDefaultThickness: (state, { payload }) => {
      state.thickness = payload;
    },
    // 폰트 사이즈 변경
    setDefaultFontSize: (state, { payload }) => {
      state.fontSize = payload;
    },
  },
});

export const selectDefaultColor = (state) => state.workbench.defaultText.color;

export const selectDefaultThickness = (state) =>
  state.workbench.defaultText.thickness;

export const selectDefaultFontSize = (state) =>
  state.workbench.defaultText.fontSize;

export const {
  loadText,
  resetText,
  setDefaultColor,
  setDefaultThickness,
  setDefaultFontSize,
} = defaultTextSlice.actions;

export default defaultTextSlice.reducer;
