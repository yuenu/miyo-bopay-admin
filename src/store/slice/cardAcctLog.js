import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getCardAcctLogs = createAsyncThunk(
  "cardAcctLog/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/card_acct_logs",
      method: "get",
      params,
    });
    return res;
  },
);

export const slice = createSlice({
  name: "cardAcctLog",
  initialState: {
    list: [],
    meta: {},
  },
  reducers: {
    setCards: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: {
    [getCardAcctLogs.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      // state.list = data.data;
      // state.meta = metaToPagin(data.meta);
    },
  },
});
export const { setCardAcctLogs } = slice.actions;
export const selectCardAcctLog = state => state.cardAcctLog;
export default slice.reducer;
