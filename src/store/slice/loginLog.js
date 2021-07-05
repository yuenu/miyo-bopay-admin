import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getLoginLogs = createAsyncThunk(
  "loginLog/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/loginlogs",
      method: "get",
      params,
    });
    return res;
  },
);

export const getLoginLog = createAsyncThunk("loginLog/getDetail", async id => {
  const res = await request({
    url: `/api/loginlogs/${id}`,
    method: "get",
  });
  return res;
});
export const slice = createSlice({
  name: "loginLog",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
  },
  extraReducers: {
    [getLoginLogs.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = metaToPagin(data.meta);
    },
    [getLoginLog.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.currentRow = data;
    },
  },
});
export const selectLoginLog = state => state.loginLog;
export default slice.reducer;
