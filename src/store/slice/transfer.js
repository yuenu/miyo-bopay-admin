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
export const claimTransfer = async ({ id, formModel }) => {
  const res = await request({
    url: `/api/transfers/${id}/claim`,
    method: "post",
    data: { id, ...formModel },
  });
  return res;
};
export const approveTransfer = async ({ id, formModel }) => {
  const res = await request({
    url: `/api/transfers/${id}/approve`,
    method: "post",
    data: { id, ...formModel },
  });
  return res;
};
export const denyTransfer = async ({ id, formModel }) => {
  const res = await request({
    url: `/api/transfers/${id}/deny`,
    method: "post",
    data: { id, ...formModel },
  });
  return res;
};

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
  },
});
export const selectTransfer = state => state.transfer;
export default slice.reducer;
