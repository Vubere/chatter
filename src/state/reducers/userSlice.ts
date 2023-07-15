"use client";

/* rtk */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

/* types */
import { User } from "@/types";
type UserT = User & { _id: string };
let initialState: UserT | null = null;

if (typeof window !== "undefined") {
  initialState = localStorage.getItem("chatterUser")
    ? JSON.parse(localStorage.getItem("chatterUser")!)
    : null;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserT>) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
