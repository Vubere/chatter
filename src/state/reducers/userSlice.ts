"use client";

/* rtk */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

/* types */
import { User } from "@/types";

let initialState: User | null = null;

if (typeof window !== "undefined") {
  initialState = localStorage.getItem("chatterUser")
    ? JSON.parse(localStorage.getItem("chatterUser")!)
    : null;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
