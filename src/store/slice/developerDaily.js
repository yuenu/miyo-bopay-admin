import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getDeveloperDaily = createAsyncThunk(
  "report/getDeveloperDaily",
  async params => {
    const res = await request({
      url: "/api/report/developer/daily",
      method: "get",
      params,
    });
    return res;
  },
);
export const getDeveloperDailySum = createAsyncThunk(
  "report/getDeveloperDailySum",
  async params => {
    const res = await request({
      url: "/api/report/developer/daily/sum",
      method: "get",
      params,
    });
    return res;
  },
);

export const slice = createSlice({
  name: "developerDaily",
  initialState: {
    list: [],
    meta: {},
    sum: {},
  },
  extraReducers: {
    [getDeveloperDaily.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = metaToPagin(data.meta);
    },
    [getDeveloperDailySum.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.sum = data;
    },
  },
});
export const selectDeveloperDaily = state => state.developerDaily;
export default slice.reducer;
