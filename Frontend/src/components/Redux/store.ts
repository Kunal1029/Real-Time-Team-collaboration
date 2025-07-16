// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/authSlice";
import teamReducer from "./Features/teamSlice"
import tempReducer from "./Features/tempSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    team: teamReducer,
    temp: tempReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
