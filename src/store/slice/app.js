import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";

export const getApps = createAsyncThunk("app/getList", async (params = {}) => {
  const res = await request({
    url: "/api/apps",
    method: "get",
    params,
  });
  return res;
});

export const getApp = createAsyncThunk("app/getDetail", async id => {
  const res = await request({
    url: `/api/apps/${id}`,
    method: "get",
  });
  return res;
});
export const addApp = async params => {
  const res = await request({
    url: `/api/apps/new`,
    method: "post",
    data: params,
  });
  return res;
};
export const editApp = async params => {
  const res = await request({
    url: `/api/apps/${params.id}`,
    method: "post",
    data: params.formModel,
  });
  return res;
};

export const deleteApp = async id => {
  const res = await request({
    url: `/api/apps/${id}`,
    method: "delete",
  });
  return res;
};

export const slice = createSlice({
  name: "app",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
  },
  reducers: {
    setApps: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: {
    [getApps.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = {
        pageSize: data.meta.per_page,
        current: data.meta.page,
        total: data.meta.total,
      };
    },
    [getApp.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.currentRow = data;
    },
  },
});
export const { setApps } = slice.actions;
export const selectApp = state => state.app;
export default slice.reducer;
