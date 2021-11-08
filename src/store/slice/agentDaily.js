import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getAgentDaily = createAsyncThunk(
  "report/getAgentDaily",
  async params => {
    const res = await request({
      url: "/api/report/agent/daily",
      method: "get",
      params,
    });
    return res;
  },
);
export const getAgentDailySum = createAsyncThunk(
  "report/getAgentDailySum",
  async params => {
    const res = await request({
      url: "/api/report/agent/daily/sum",
      method: "get",
      params,
    });
    return res;
  },
);

export const slice = createSlice({
  name: "agentDaily",
  initialState: {
    list: [],
    meta: {},
    sum: {},
  },
  extraReducers: {
    [getAgentDaily.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = metaToPagin(data.meta);
    },
    [getAgentDailySum.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.sum = data;
    },
  },
});
export const selectAgentDaily = state => state.agentDaily;
export default slice.reducer;
