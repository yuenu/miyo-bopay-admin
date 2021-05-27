import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import tabReducer from "./slice/tab";
import userReducer from "./slice/user";

export default configureStore({
  reducer: {
    auth: authReducer,
    tab: tabReducer,
    user: userReducer,
  },
});
