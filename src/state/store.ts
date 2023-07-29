import { configureStore } from "@reduxjs/toolkit";
import { chatterApi } from "./api/api";
/* reducers */
import userReducer from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [chatterApi.reducerPath]: chatterApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(chatterApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
