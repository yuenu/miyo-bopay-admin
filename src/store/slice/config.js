import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";

export const getExchange = createAsyncThunk("config/getExchange", async () => {
  const res = await request({
    url: "/api/config/exchange",
    method: "get",
  });
  return res;
});
export const editExchange = async params => {
  const res = await request({
    url: `/api/config/exchange`,
    method: "post",
    data: params,
  });
  return res;
};

export const slice = createSlice({
  name: "config",
  initialState: {
    exchange: {},
  },
  reducers: {},
  extraReducers: {
    [getExchange.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.exchange = data;
    },
  },
});
export const selectConfig = state => state.config;
export default slice.reducer;
