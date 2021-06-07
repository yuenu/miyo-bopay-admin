import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";

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
export const approveOrder = async params => {
  const res = await request({
    url: `/api/orders/approve`,
    method: "post",
    data: params,
  });
  return res;
};
export const denyOrder = async params => {
  const res = await request({
    url: `/api/orders/deny`,
    method: "post",
    data: params,
  });
  return res;
};
export const cancelOrder = async params => {
  const res = await request({
    url: `/api/orders/cancel`,
    method: "post",
  });
  return res;
};
export const notifyOrder = async params => {
  const res = await request({
    url: `/api/orders/notify`,
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

export const slice = createSlice({
  name: "order",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
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
      state.meta = {
        pageSize: data.meta.per_page,
        current: data.meta.page,
        total: data.meta.total,
      };
    },
    [getOrder.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.currentRow = data;
    },
  },
});
export const { setOrders } = slice.actions;
export const selectOrder = state => state.order;
export default slice.reducer;
