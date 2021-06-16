import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";

export const getCryptoAcctLogs = createAsyncThunk(
  "cryptoAcctLog/getList",
  async params => {
    const res = await request({
      url: "/api/cryptoacctlogs",
      method: "get",
      params,
    });
    return res;
  },
);
export const getCryptoAcctLog = createAsyncThunk(
  "cryptoAcctLog/getDetail",
  async id => {
    const res = await request({
      url: `/api/cryptoacctlogs/${id}`,
      method: "get",
    });
    return res;
  },
);
export const slice = createSlice({
  name: "cryptoWallet",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
  },
  extraReducers: {
    [getCryptoAcctLogs.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = {
        pageSize: data.meta.per_page,
        current: data.meta.page,
        total: data.meta.total,
      };
    },
    [getCryptoAcctLog.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.currentRow = data;
    },
  },
});
export const selectCryptoAcctLog = state => state.cryptoAcctLog;
export default slice.reducer;
