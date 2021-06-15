import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";

export const getCryptoWallets = createAsyncThunk(
  "cryptoWallet/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/cryptowallets",
      method: "get",
      params,
    });
    return res;
  },
);

export const getCryptoWallet = createAsyncThunk(
  "cryptoWallet/getDetail",
  async id => {
    const res = await request({
      url: `/api/cryptowallets/${id}`,
      method: "get",
    });
    return res;
  },
);
export const addCryptoWallet = async params => {
  const res = await request({
    url: `/api/cryptowallets`,
    method: "post",
    data: params,
  });
  return res;
};
export const editCryptoWallet = async params => {
  const res = await request({
    url: `/api/cryptowallets/${params.id}`,
    method: "post",
    data: params.formModel,
  });
  return res;
};

export const deleteCryptoWallet = async id => {
  const res = await request({
    url: `/api/cryptowallets/${id}`,
    method: "delete",
  });
  return res;
};

export const getCryptoAccts = createAsyncThunk(
  "cryptoAcct/getList",
  async params => {
    const res = await request({
      url: `/api/cryptoaccts`,
      method: "get",
      params,
    });
    return res;
  },
);
export const addCryptoAccts = async params => {
  const res = await request({
    url: `/api/cryptoaccts`,
    method: "post",
    data: params,
  });
  return res;
};
export const editCryptoAccts = async params => {
  const res = await request({
    url: `/api/cryptoaccts/${params.id}`,
    method: "post",
    data: params.formModel,
  });
  return res;
};

export const getCryptoAcctLogs = createAsyncThunk(
  "cryptoAcct/getLogList",
  async () => {
    const res = await request({
      url: "/api/cryptoacctlogs",
      method: "get",
    });
    return res;
  },
);

export const slice = createSlice({
  name: "cryptoWallet",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
    accts: [],
    acctsMeta: {},
    acctLogs: [],
    acctLogsMeta: {},
  },
  reducers: {
    setCryptoWallets: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: {
    [getCryptoWallets.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = {
        pageSize: data.meta.per_page,
        current: data.meta.page,
        total: data.meta.total,
      };
    },
    [getCryptoWallet.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.currentRow = data;
    },
    [getCryptoAccts.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.accts = data.data;
      state.acctsMeta = {
        pageSize: data.meta.per_page,
        current: data.meta.page,
        total: data.meta.total,
      };
    },
    [getCryptoAcctLogs.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.acctLogs = data.data;
      state.acctLogsMeta = {
        pageSize: data.meta.per_page,
        current: data.meta.page,
        total: data.meta.total,
      };
    },
  },
});
export const { setCryptoWallets } = slice.actions;
export const selectCryptoWallet = state => state.cryptoWallet;
export default slice.reducer;
