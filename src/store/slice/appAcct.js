import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getAppAccts = createAsyncThunk(
  "appAcct/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/appaccts",
      method: "get",
      params,
    });
    return res;
  },
);

export const getAppAcct = createAsyncThunk("appAcct/getDetail", async id => {
  const res = await request({
    url: `/api/appaccts/${id}`,
    method: "get",
  });
  return res;
});
export const addAppAcct = async params => {
  const res = await request({
    url: `/api/appaccts`,
    method: "post",
    data: params,
  });
  return res;
};
export const editAppAcct = async params => {
  const res = await request({
    url: `/api/appaccts/${params.id}`,
    method: "post",
    data: params.formModel,
  });
  return res;
};

export const deleteAppAcct = async id => {
  const res = await request({
    url: `/api/appaccts/${id}`,
    method: "delete",
  });
  return res;
};

export const slice = createSlice({
  name: "appacct",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
  },
  reducers: {
    setAppAcctAccts: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: {
    [getAppAccts.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = metaToPagin(data.meta);
    },
    [getAppAcct.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.currentRow = data;
    },
  },
});
export const { setAppAccts } = slice.actions;
export const selectAppAcct = state => state.appAcct;
export default slice.reducer;
