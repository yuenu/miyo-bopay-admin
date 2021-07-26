import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getCardAccts = createAsyncThunk(
  "cardAcct/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/card_accts",
      method: "get",
      params,
    });
    return res;
  },
);
export const getCardAcct = createAsyncThunk("cardAcct/getDetail", async id => {
  const res = await request({
    url: `/api/card_accts/${id}`,
    method: "get",
  });
  return res;
});
export const addCardAcct = async params => {
  const res = await request({
    url: `/api/card_accts`,
    method: "post",
    data: params,
  });
  return res;
};
export const editCardAcct = async params => {
  const res = await request({
    url: `/api/card_accts/${params.id}`,
    method: "post",
    data: params.formModel,
  });
  return res;
};

export const slice = createSlice({
  name: "cardAcct",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
  },
  reducers: {
    setCards: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: {
    [getCardAccts.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      // state.list = data.data;
      // state.meta = metaToPagin(data.meta);
    },
    [getCardAcct.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.currentRow = data;
    },
  },
});
export const { setCardAccts } = slice.actions;
export const selectCardAcct = state => state.cardAcct;
export default slice.reducer;
