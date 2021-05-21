import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./slice/tab";

export default configureStore({
  reducer: {
    tab: tabReducer,
  },
});
