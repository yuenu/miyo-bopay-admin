import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getAppDaily = createAsyncThunk(
  "report/getAppDaily",
  async params => {
    const res = await request({
      url: "/api/report/app/daily",
      method: "get",
      params,
    });
    return res;
  },
);
export const getAppDailySum = createAsyncThunk(
  "report/getAppDailySum",
  async params => {
    const res = await request({
      url: "/api/report/app/daily/sum",
      method: "get",
      params,
    });
    return res;
  },
);

export const slice = createSlice({
  name: "appDaily",
  initialState: {
    list: [],
    meta: {},
    sum: {},
  },
  extraReducers: {
    [getAppDaily.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = metaToPagin(data.meta);
    },
    [getAppDailySum.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.sum = data;
    },
  },
});
export const selectAppDaily = state => state.appDaily;
export default slice.reducer;
