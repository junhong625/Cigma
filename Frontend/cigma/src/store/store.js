import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import sessionStorage from "redux-persist/es/storage/session";
import { persistReducer } from "redux-persist";
import userToken from "./userToken";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["userToken"],
};

const rootReducer = combineReducers({
  userToken,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
