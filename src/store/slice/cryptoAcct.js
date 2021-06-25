import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getCryptoAccts = createAsyncThunk(
  "cryptoAcct/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/cryptoaccts",
      method: "get",
      params,
    });
    return res;
  },
);

export const getCryptoAcct = createAsyncThunk(
  "cryptoAcct/getDetail",
  async id => {
    const res = await request({
      url: `/api/cryptoaccts/${id}`,
      method: "get",
    });
    return res;
  },
);
export const addCryptoAcct = async params => {
  const res = await request({
    url: `/api/cryptoaccts`,
    method: "post",
    data: params,
  });
  return res;
};
export const editCryptoAcct = async params => {
  const res = await request({
    url: `/api/cryptoaccts/${params.id}`,
    method: "post",
    data: params.formModel,
  });
  return res;
};
export const activeCryptoAcct = async params => {
  const res = await request({
    url: `/api/cryptoaccts/set-active`,
    method: "post",
    data: params,
  });
  return res;
};

export const deleteCryptoAcct = async id => {
  const res = await request({
    url: `/api/cryptoaccts/${id}`,
    method: "delete",
  });
  return res;
};

export const slice = createSlice({
  name: "cryptoAcct",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
  },
  reducers: {
    setCryptoAccts: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: {
    [getCryptoAccts.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data.sort((a, b) => a.seq - b.seq);
      state.meta = metaToPagin(data.meta);
    },
    [getCryptoAcct.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.currentRow = data;
    },
  },
});
export const { setCryptoAccts } = slice.actions;
export const selectCryptoAcct = state => state.cryptoAcct;
export default slice.reducer;
