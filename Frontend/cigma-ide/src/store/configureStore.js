import { combineReducers, configureStore } from "@reduxjs/toolkit";
import defaultTextSlice from "./defaultTextSlice";
import codeEditorSlice from "./codeEditorSlice";
import toolSlice from "./toolSlice";
import textSlice from "./textSlice";
import treeData from "./treeData";

import { bind, enhanceReducer } from "redux-yjs-bindings";
import { ydoc } from "./initYDoc";
// import undoable from "redux-undo";

// const MAXIMUN_UNDO_COUNT = 100;

// if you want share state add the workbench
const workbench = combineReducers({
  defaultText: defaultTextSlice,
  codeEditor: codeEditorSlice,
  textEditor: textSlice,
  treeData,
});

// 뒤로가기
// export const undoableWorkBench = undoable(workbench, {
//   groupBy: ,
//   limit: MAXIMUN_UNDO_COUNT
// })

const store = configureStore({
  reducer: {
    workbench: enhanceReducer(workbench),
    tool: toolSlice,
  },
});

bind(ydoc, store, "workbench");
// bind(ydoc, store, "tool");

export default store;

export const WORKBENCH_REDUCER_NAME = "workbench";
