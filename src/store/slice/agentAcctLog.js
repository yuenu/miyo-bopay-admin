import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getAgentAcctLogs = createAsyncThunk(
  "agentAcctLogs/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/agentacctlogs",
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
    setLogs: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: {
    [getAgentAcctLogs.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = metaToPagin(data.meta);
    },
  },
});
export const { setAgentAcctLogs } = slice.actions;
export const selectAgentAcctLog = state => state.agentAcctLog;
export default slice.reducer;
