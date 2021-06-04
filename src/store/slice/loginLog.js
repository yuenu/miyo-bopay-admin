import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";

export const getLoginLogs = createAsyncThunk(
  "loginLog/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/login_logs",
      method: "get",
      params,
    });
    return res;
  },
);
export const getLoginLog = createAsyncThunk("loginLog/getDetail", async id => {
  const res = await request({
    url: `/api/login_logs/${id}`,
    method: "get",
  });
  return res;
});
export const addLoginLog = async params => {
  const res = await request({
    url: `/api/login_logs`,
    method: "post",
    data: params,
  });
  return res;
};
export const editLoginLog = async params => {
  const res = await request({
    url: `/api/login_logs/${params.id}`,
    method: "post",
    data: params.formModel,
  });
  return res;
};
export const deleteLoginLog = async id => {
  const res = await request({
    url: `/api/login_logs/${id}`,
    method: "delete",
  });
  return res;
};

export const slice = createSlice({
  name: "loginLog",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
  },
  reducers: {
    setLoginLogs: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: {
    [getLoginLogs.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = {
        pageSize: data.meta.per_page,
        current: data.meta.page,
        total: data.meta.total,
      };
    },
    [getLoginLog.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.currentRow = data;
    },
  },
});
export const { setLoginLogs } = slice.actions;
export const selectLoginLog = state => state.loginLog;
export default slice.reducer;
