import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getAppAcctLogs = createAsyncThunk(
  "appAcctLogs/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/appacctlogs",
      method: "get",
      params,
    });
    return res;
  },
);

export const slice = createSlice({
  name: "appAcctLogs",
  initialState: {
    list: [],
    meta: {},
  },
  reducers: {
    setCards: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: {
    [getAppAcctLogs.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = metaToPagin(data.meta);
    },
  },
});
export const { setAppAcctLogs } = slice.actions;
export const selectAppAcctLog = state => state.appAcctLog;
export default slice.reducer;
