import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getUsers = createAsyncThunk(
  "user/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/users",
      method: "get",
      params,
    });
    return res;
  },
);

export const getUser = createAsyncThunk("user/getDetail", async id => {
  const res = await request({
    url: `/api/users/${id}`,
    method: "get",
  });
  return res;
});
export const addUser = async params => {
  const res = await request({
    url: `/api/users`,
    method: "post",
    data: params,
  });
  return res;
};
export const editUser = async params => {
  const res = await request({
    url: `/api/users/${params.id}`,
    method: "post",
    data: params.formModel,
  });
  return res;
};

export const deleteUser = async id => {
  const res = await request({
    url: `/api/users/${id}`,
    method: "delete",
  });
  return res;
};
export const resetUserPsw = async params => {
  const res = await request({
    url: `/api/users/${params.id}/password`,
    method: "post",
    data: params.formModel,
  });
  return res;
};

export const slice = createSlice({
  name: "user",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
  },
  reducers: {
    setUsers: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: {
    [getUsers.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = metaToPagin(data.meta);
    },
    [getUser.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.currentRow = data;
    },
  },
});
export const { setUsers } = slice.actions;
export const selectUser = state => state.user;
export default slice.reducer;
