import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";

export const getUsers = createAsyncThunk("user/getList", async () => {
  const { status, data } = await request({
    url: "/api/users",
    method: "GET",
  });
  const isErr = status !== 200;
  return isErr ? [] : data;
});

export const getUser = createAsyncThunk("user/getDetail", async id => {
  const { status, data } = await request({
    url: `/api/users/${id}`,
    method: "GET",
  });
  const isErr = status !== 200;
  return isErr ? {} : data;
});
export const editUser = async params => {
  const { status } = await request({
    url: `/api/users/${params.id}`,
    method: "POST",
    data: params.formModel,
  });
  const isErr = status !== 204;
  return isErr;
};

export const deleteUser = async id => {
  const { status } = await request({
    url: `/api/users/${id}`,
    method: "DELETE",
  });
  const isErr = status !== 204;
  return isErr;
};

export const slice = createSlice({
  name: "user",
  initialState: {
    users: [],
    currentUser: {},
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: {
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
    [getUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setUsers } = slice.actions;
export const selectUser = state => state.user;
export default slice.reducer;
