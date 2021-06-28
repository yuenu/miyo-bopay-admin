import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "routerTab",
  initialState: {
    routerTabs: JSON.parse(sessionStorage.getItem("tabs")) || [],
  },
  reducers: {
    setRouterTabs: (state, action) => {
      const hasRouter = state.routerTabs.indexOf(action.payload) !== -1;
      if (hasRouter) return;
      state.routerTabs = [...state.routerTabs, action.payload];
      sessionStorage.setItem("tabs", JSON.stringify(state.routerTabs));
    },
    removeRouterTab: (state, action) => {
      const nowTabs = state.routerTabs.filter(i => i !== action.payload);
      state.routerTabs = [...nowTabs];
      sessionStorage.setItem("tabs", JSON.stringify(nowTabs));
    },
  },
});
export const { setRouterTabs, removeRouterTab } = slice.actions;
export const selectRouterTab = state => state.routerTab;
export default slice.reducer;
