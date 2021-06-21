import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getGateways = createAsyncThunk(
  "gateway/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/gateways",
      method: "get",
      params,
    });
    return res;
  },
);

export const getGateway = createAsyncThunk("gateway/getDetail", async id => {
  const res = await request({
    url: `/api/gateways/${id}`,
    method: "get",
  });
  return res;
});
export const addGateway = async params => {
  const res = await request({
    url: `/api/gateways`,
    method: "post",
    data: params,
  });
  return res;
};
export const editGateway = async params => {
  const res = await request({
    url: `/api/gateways/${params.id}`,
    method: "post",
    data: params.formModel,
  });
  return res;
};

export const deleteGateway = async id => {
  const res = await request({
    url: `/api/gateways/${id}`,
    method: "delete",
  });
  return res;
};

export const slice = createSlice({
  name: "gateway",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
  },
  reducers: {
    setGateways: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: {
    [getGateways.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = metaToPagin(data.meta);
    },
    [getGateway.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.currentRow = data;
    },
  },
});
export const { setGateways } = slice.actions;
export const selectGateway = state => state.gateway;
export default slice.reducer;
