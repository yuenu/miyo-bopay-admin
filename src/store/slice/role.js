import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getRoles = createAsyncThunk(
  "role/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/roles",
      method: "get",
      params,
    });
    return res;
  },
);

export const getRole = createAsyncThunk("role/getDetail", async id => {
  const res = await request({
    url: `/api/roles/${id}`,
    method: "get",
  });
  return res;
});
export const addRole = async params => {
  const res = await request({
    url: `/api/roles`,
    method: "post",
    data: params,
  });
  return res;
};
export const editRole = async params => {
  const res = await request({
    url: `/api/roles/${params.id}`,
    method: "post",
    data: params.formModel,
  });
  return res;
};

export const deleteRole = async id => {
  const res = await request({
    url: `/api/roles/${id}`,
    method: "delete",
  });
  return res;
};

export const getRoleUsers = createAsyncThunk("role/getUsers", async id => {
  const res = await request({
    url: `/api/roles/${id}/users`,
    method: "get",
  });
  return res;
});

export const addRoleUsers = async ({ id, ids }) => {
  const res = await request({
    url: `/api/roles/${id}/users/add`,
    method: "post",
    data: ids,
  });
  return res;
};
export const deleteRoleUsers = async ({ id, ids }) => {
  const res = await request({
    url: `/api/roles/${id}/users/del`,
    method: "delete",
    data: ids,
  });
  return res;
};
export const editPerms = async ({ id, perms }) => {
  const res = await request({
    url: `/api/roles/${id}/perms`,
    method: "post",
    data: perms,
  });
  return res;
};

export const slice = createSlice({
  name: "role",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
    users: [],
  },
  reducers: {
    setRoles: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: {
    [getRoles.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = metaToPagin(data.meta);
    },
    [getRole.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.currentRow = data;
    },
    [getRoleUsers.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.users = data;
    },
  },
});
export const { setRoles } = slice.actions;
export const selectRole = state => state.role;
export default slice.reducer;
