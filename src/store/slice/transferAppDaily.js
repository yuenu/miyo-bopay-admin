import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getTransferAppDaily = createAsyncThunk(
  "report/getAppDaily",
  async params => {
    const res = await request({
      url: "/api/report/transfer/app/daily",
      method: "get",
      params,
    });
    return res;
  },
);
export const getTransferAppDailySum = createAsyncThunk(
  "report/getAppDailySum",
  async params => {
    const res = await request({
      url: "/api/report/transfer/app/daily/sum",
      method: "get",
      params,
    });
    return res;
  },
);

export const slice = createSlice({
  name: "TransferAppDaily",
  initialState: {
    list: [],
    meta: {},
    sum: {},
  },
  extraReducers: {
    [getTransferAppDaily.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = metaToPagin(data.meta);
    },
    [getTransferAppDailySum.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.sum = data;
    },
  },
});
export const selectTransferAppDaily = state => state.transferAppDaily;
export default slice.reducer;
