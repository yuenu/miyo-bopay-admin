import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getGatewayDaily = createAsyncThunk(
  "report/getDaily",
  async params => {
    const res = await request({
      url: "/api/report/app/gateway/daily",
      method: "get",
      params,
    });
    return res;
  },
);
export const getGatewayDailySum = createAsyncThunk(
  "report/getDailySum",
  async params => {
    const res = await request({
      url: "/api/report/app/gateway/daily/sum",
      method: "get",
      params,
    });
    return res;
  },
);

export const slice = createSlice({
  name: "GatewayDaily",
  initialState: {
    list: [],
    meta: {},
    sum: {},
  },
  extraReducers: {
    [getGatewayDaily.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = metaToPagin(data.meta);
    },
    [getGatewayDailySum.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.sum = data;
    },
  },
});
export const selectGatewayDaily = state => state.gatewayDaily;
export default slice.reducer;
