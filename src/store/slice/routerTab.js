import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "routerTab",
  initialState: {
    routerTabs: JSON.parse(sessionStorage.getItem("tabs")) || [],
  },
  reducers: {
    setRouterTabs: (state, action) => {
      state.routerTabs = action.payload;
      // sessionStorage.setItem("tabs", [...state.routerTabs, action.payload]);
    },
  },
});
export const { setRouterTabs } = slice.actions;
export const selectRouterTab = state => state.routerTab;
export default slice.reducer;
