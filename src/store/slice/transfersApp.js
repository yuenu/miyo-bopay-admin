import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getTransfersApp = createAsyncThunk(
  "tranfsersApp/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/transfers/app",
      method: "get",
      params,
    });
    return res;
  },
);

export const slice = createSlice({
  name: "transfer",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
    gateways: [],
    status2Total: 0,
  },
  extraReducers: {
    [getTransfersApp.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = metaToPagin(data.meta);
    },
  },
});
export const selectTransfersApp = state => state.transfersApp;
export default slice.reducer;
