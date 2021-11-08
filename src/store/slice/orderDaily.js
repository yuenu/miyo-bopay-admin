import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getOrderDaily = createAsyncThunk(
  "report/getOrderDaily",
  async params => {
    const res = await request({
      url: "/api/report/order/daily",
      method: "get",
      params,
    });
    return res;
  },
);
export const getOrderDailySum = createAsyncThunk(
  "report/getOrderDailySum",
  async params => {
    const res = await request({
      url: "/api/report/order/daily/sum",
      method: "get",
      params,
    });
    return res;
  },
);

export const slice = createSlice({
  name: "orderDaily",
  initialState: {
    list: [],
    meta: {},
    sum: {},
  },
  extraReducers: {
    [getOrderDaily.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = metaToPagin(data.meta);
    },
    [getOrderDailySum.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.sum = data;
    },
  },
});
export const selectOrderDaily = state => state.orderDaily;
export default slice.reducer;
