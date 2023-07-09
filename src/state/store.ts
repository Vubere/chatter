import { configureStore } from "@reduxjs/toolkit";

/* reducers */
import userReducer from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
