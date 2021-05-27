import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";

export const login = createAsyncThunk(
  "auth/login",
  async (params, thunkAPI) => {
    const res = await request({
      url: "/auth/login",
      method: "POST",
      data: params,
    });
    return res;
  },
);

export const slice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { setUser } = slice.actions;
export const selectAuth = state => state.auth;
export default slice.reducer;
