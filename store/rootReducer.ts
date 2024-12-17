import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./authSlice/userSlice";

const rootReducer = combineReducers({ user: userReducer });

export default rootReducer;
