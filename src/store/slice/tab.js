import { createSlice } from "@reduxjs/toolkit";

export const tabSlice = createSlice({
  name: "tab",
  initialState: {
    tabs: [{ name: "Employee" }],
    activeKey: "Employee",
  },
  reducers: {
    addTab: (state, action) => {
      state.tabs.push(action.payload);
    },
    removeTab: (state, action) => {
      state.tabs = state.tabs.filter(i => i.name !== action.payload);
    },
    setActiveKey: (state, action) => {
      state.activeKey = action.payload;
    },
  },
});
export const { addTab, removeTab, setActiveKey } = tabSlice.actions;
export const selectTab = state => state.tab;
export default tabSlice.reducer;
