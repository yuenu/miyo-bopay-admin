import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";

export const login = createAsyncThunk(
  "auth/login",
  async (params, thunkAPI) => {
    const { status, data } = await request({
      url: "/auth/login",
      method: "POST",
      data: params,
    });
    if (status !== 200) return;
    localStorage.setItem("login", "true");
    return data;
  },
);

export const slice = createSlice({
  name: "user",
  initialState: {
    user: {},
    login: localStorage.getItem("login"),
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.login = null;
      localStorage.removeItem("login");
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.login = localStorage.getItem("login");
    },
  },
});
export const { setUser, logout } = slice.actions;
export const selectAuth = state => state.auth;
export default slice.reducer;
