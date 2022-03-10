import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";

export const login = createAsyncThunk(
  "auth/login",
  async (params, thunkAPI) => {
    const { status, data } = await request({
      url: "/auth/login",
      method: "post",
      data: params,
    });
    if (status !== 200) return;
    return data;
  },
);
export const getOptStatus = createAsyncThunk("auth/optStatus", async () => {
  const { status, data } = await request({
    url: "/auth/opt",
    method: "get",
  });
  if (status !== 200) return;
  return data;
});
export const configOpt = async params => {
  const res = await request({
    url: `/api/config/opt`,
    method: "post",
    data: params,
  });
  return res;
};
export const slice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isOpt: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      action.payload && (state.user = action.payload);
      action.payload &&
        localStorage.setItem("user", JSON.stringify(action.payload));
    },
    [getOptStatus.fulfilled]: (state, action) => {
      state.isOpt = action.payload;
    },
  },
});
export const { setUser, logout } = slice.actions;
export const selectAuth = state => state.auth;
export default slice.reducer;
