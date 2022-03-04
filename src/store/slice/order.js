import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getOrders = createAsyncThunk(
  "order/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/orders",
      method: "get",
      params,
    });
    return res;
  },
);
export const getOrdersSum = createAsyncThunk(
  "order/getListSum",
  async (params = {}) => {
    const res = await request({
      url: "/api/orders/sum",
      method: "get",
      params,
    });
    return res;
  },
);
export const getOrder = createAsyncThunk("order/getDetail", async id => {
  const res = await request({
    url: `/api/orders/${id}`,
    method: "get",
  });
  return res;
});
export const addOrder = async params => {
  const res = await request({
    url: `/api/orders`,
    method: "post",
    data: params,
  });
  return res;
};
export const editOrder = async params => {
  const res = await request({
    url: `/api/orders/${params.id}`,
    method: "post",
    data: params.formModel,
  });
  return res;
};

// 審核
export const approveOrder = async params => {
  const res = await request({
    url: `/api/orders/approve`,
    method: "post",
    data: { id: params.id, ...params.formModel },
  });
  return res;
};

// 拒絕
export const denyOrder = async params => {
  const res = await request({
    url: `/api/orders/deny`,
    method: "post",
    data: { id: params.id, ...params.formModel },
  });
  return res;
};

// 取消
export const cancelOrder = async id => {
  const res = await request({
    url: `/api/orders/${id}/cancel`,
    method: "post",
  });
  return res;
};

// 回收
export const recycleOrder = async id => {
  const res = await request({
    url: `/api/orders/${id}/recycle`,
    method: "get",
  });
  return res;
};

// 通知
export const notifyOrder = async id => {
  const res = await request({
    url: `/api/orders/${id}/notify`,
    method: "post",
  });
  return res;
};
export const deleteOrder = async id => {
  const res = await request({
    url: `/api/orders/${id}`,
    method: "delete",
  });
  return res;
};
export const bindOrder = async params => {
  const res = await request({
    url: `/api/orders/bind`,
    method: "post",
    data: params,
  });
  return res;
};
export const slice = createSlice({
  name: "order",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
    sum: {},
  },
  reducers: {
    setOrders: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: {
    [getOrders.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = metaToPagin(data.meta);
    },
    [getOrder.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.currentRow = data;
    },
    [getOrdersSum.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.sum = data;
    },
  },
});
export const { setOrders } = slice.actions;
export const selectOrder = state => state.order;
export default slice.reducer;
