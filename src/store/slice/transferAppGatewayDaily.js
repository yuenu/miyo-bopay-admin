import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getTransferAppGatewayDaily = createAsyncThunk(
  "report/getTransferAppGatewayAppDaily",
  async params => {
    const res = await request({
      url: "/api/report/transfer/app/gateway/daily",
      method: "get",
      params,
    });
    return res;
  },
);
export const getTransferAppGatewayDailySum = createAsyncThunk(
  "report/getTransferAppGatewayAppDailySum",
  async params => {
    const res = await request({
      url: "/api/report/transfer/app/gateway/daily/sum",
      method: "get",
      params,
    });
    return res;
  },
);

export const slice = createSlice({
  name: "TransferAppGatewayDaily",
  initialState: {
    list: [],
    meta: {},
    sum: {},
  },
  extraReducers: {
    [getTransferAppGatewayDaily.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = metaToPagin(data.meta);
    },
    [getTransferAppGatewayDailySum.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.sum = data;
    },
  },
});
export const selectTransferAppGatewayDaily = state =>
  state.transferAppGatewayDaily;
export default slice.reducer;
