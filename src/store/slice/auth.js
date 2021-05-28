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
    res.username && localStorage.setItem("login", "true");
    return res;
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
