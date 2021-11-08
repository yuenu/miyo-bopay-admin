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
export const getTransfersSum = createAsyncThunk(
  "tranfser/getListSum",
  async (params = {}) => {
    const res = await request({
      url: "/api/transfers/sum",
      method: "get",
      params,
    });
    return res;
  },
);
export const getTransfers2Total = createAsyncThunk(
  "tranfser/getStatus2List",
  async () => {
    const res = await request({
      url: "/api/transfers",
      method: "get",
      params: { status: 2 },
    });
    return res;
  },
);
export const getTransfersGateways = createAsyncThunk(
  "tranfser/getGatewayList",
  async ({ id, ...params }) => {
    const res = await request({
      url: `/api/transfers/${id}/gateways`,
      method: "get",
      params,
    });
    return res;
  },
);
export const getTransfersOfflineGateways = createAsyncThunk(
  "tranfser/getOfflineGatewayList",
  async ({ id }) => {
    const res = await request({
      url: `/api/transfers/${id}/offline/gateways`,
      method: "get",
    });
    return res;
  },
);
export const queryTransfer = async id => {
  const res = await request({
    url: `/api/transfers/${id}/query`,
    method: "post",
  });
  return res;
};
export const claimTransfer = async ({ id, formModel }) => {
  const res = await request({
    url: `/api/transfers/${id}/paid/claim`,
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
    data: formModel,
  });
  return res;
};
export const paidClaimTransfer = async ({ id, formModel }) => {
  const res = await request({
    url: `/api/transfers/${id}/paid/claim`,
    method: "post",
    data: { id, ...formModel },
  });
  return res;
};
export const paidTransfer = async ({ id, formModel }) => {
  const res = await request({
    url: `/api/transfers/${id}/paid`,
    method: "post",
    data: { id, ...formModel },
  });
  return res;
};
export const succeededTransfer = async ({ id, formModel }) => {
  const res = await request({
    url: `/api/transfers/${id}/succeeded`,
    method: "post",
    data: { id, ...formModel },
  });
  return res;
};
export const failedTransfer = async ({ id, formModel }) => {
  const res = await request({
    url: `/api/transfers/${id}/failed`,
    method: "post",
    data: { id, ...formModel },
  });
  return res;
};
export const notifyTransfer = async ({ id }) => {
  const res = await request({
    url: `/api/transfers/${id}/notify`,
    method: "post",
  });
  return res;
};
export const cancelTransfer = async ({ id }) => {
  const res = await request({
    url: `/api/transfers/${id}/paid/cancel`,
    method: "post",
  });
  return res;
};
export const repaidTransfer = async ({ id, formModel }) => {
  const res = await request({
    url: `/api/transfers/${id}/repaid`,
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
    gateways: [],
    offlineGateways: [],
    status2Total: 0,
    sum: {},
  },
  extraReducers: {
    [getTransfers.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = metaToPagin(data.meta);
    },
    [getTransfersSum.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.sum = data;
    },
    [getTransfers2Total.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.status2Total = data.meta.total;
    },
    [getTransfersGateways.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.gateways = data;
    },
    [getTransfersOfflineGateways.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.offlineGateways = data;
    },
  },
});
export const selectTransfer = state => state.transfer;
export default slice.reducer;
