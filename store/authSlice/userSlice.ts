import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserDetails } from "../../types/UserType";

export interface UserState {
  userInfo: UserDetails | null;
}

export interface UserPhoto {
  photoURL: string;
}

const initialState: UserState = {
  userInfo: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserState["userInfo"]>) {
      state.userInfo = action.payload;
    },
    updateUserInfo(state, action: PayloadAction<UserPhoto>) {
      if (state.userInfo) {
        state.userInfo.photoURL = action.payload?.photoURL;
      }
    },
    removeUserInfo(state) {
      state.userInfo = null;
    },
  },
});

export const { setUserInfo, updateUserInfo, removeUserInfo } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
