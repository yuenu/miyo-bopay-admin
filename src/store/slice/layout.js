import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "layout",
  initialState: {
    modalDiscSpan: window.innerWidth > 998 ? 2 : 1,
  },
  reducers: {
    setModalDiscSpan: (state, action) => {
      state.modalDiscSpan = action.payload > 998 ? 2 : 1;
    },
  },
});
export const { setModalDiscSpan } = slice.actions;
export const selectLayout = state => state.layout;
export default slice.reducer;
