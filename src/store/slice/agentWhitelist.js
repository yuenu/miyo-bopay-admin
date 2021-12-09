import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";

export const getList = createAsyncThunk(
  "agentWhitelist/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/agentwhitelist",
      method: "get",
      params,
    });
    return res;
  },
);

export const addIps = async params => {
  const res = await request({
    url: `/api/agentwhitelist`,
    method: "post",
    data: params,
  });
  return res;
};

export const deleteIp = async params => {
  const res = await request({
    url: `/api/agentwhitelist?ip=${params.ip}`,
    method: "delete",
  });
  return res;
};

export const slice = createSlice({
  name: "agentWhitelist",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
  },
  reducers: {},
  extraReducers: {
    [getList.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.map(i => ({ ip: i }));
    },
  },
});
export const selectAgentWhitelist = state => state.agentWhitelist;
export default slice.reducer;
