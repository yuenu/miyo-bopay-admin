import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";

export const getAppUsers = createAsyncThunk(
  "appUser/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/appusers",
      method: "get",
      params,
    });
    return res;
  },
);
export const getAppUser = createAsyncThunk("appUser/getDetail", async id => {
  const res = await request({
    url: `/api/appusers/${id}`,
    method: "get",
  });
  return res;
});

export const slice = createSlice({
  name: "appUser",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
  },
  reducers: {
    setAppUsers: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: {
    [getAppUsers.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = {
        pageSize: data.meta.per_page,
        current: data.meta.page,
        total: data.meta.total,
      };
    },
    [getAppUser.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.currentRow = data;
    },
  },
});
export const { setAppUsers } = slice.actions;
export const selectAppUser = state => state.appUser;
export default slice.reducer;
