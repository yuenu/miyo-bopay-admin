import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getTransfers = createAsyncThunk(
  "tranfser/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/transfers",
      method: "get",
      params,
    });
    return res;
  },
);
export const getTransfer = createAsyncThunk("transfer/getDetail", async id => {
  const res = await request({
    url: `/api/transfer/${id}`,
    method: "get",
  });
  return res;
});

export const slice = createSlice({
  name: "transfer",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
  },
  extraReducers: {
    [getTransfers.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = metaToPagin(data.meta);
    },
    [getTransfer.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.currentRow = data;
    },
  },
});
export const selectTransfer = state => state.transfer;
export default slice.reducer;
