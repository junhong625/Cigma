import { combineReducers, configureStore } from "@reduxjs/toolkit";
import defaultTextSlice from "./defaultTextSlice";
import codeEditorSlice from "./codeEditorSlice";
import toolSlice from "./toolSlice";
import textSlice from "./textSlice";
// import undoable from "redux-undo";

// const MAXIMUN_UNDO_COUNT = 100;

const workbench = combineReducers({
  defaultText: defaultTextSlice,
  codeEditor: codeEditorSlice,
  textEditor: textSlice,
});

// 뒤로가기
// export const undoableWorkBench = undoable(workbench, {
//   groupBy: ,
//   limit: MAXIMUN_UNDO_COUNT
// })

const store = configureStore({
  reducer: {
    workbench: workbench,
    tool: toolSlice,
  },
});

export default store;

export const WORKBENCH_REDUCER_NAME = "workbench";
