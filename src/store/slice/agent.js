import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getAgents = createAsyncThunk(
  "agent/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/agents",
      method: "get",
      params,
    });
    return res;
  },
);
export const getAgent = createAsyncThunk("agent/getDetail", async id => {
  const res = await request({
    url: `/api/agents/${id}`,
    method: "get",
  });
  return res;
});

export const addAgent = async params => {
  const res = await request({
    url: `/api/agents`,
    method: "post",
    data: params,
  });
  return res;
};
export const editAgent = async params => {
  const res = await request({
    url: `/api/agents/${params.id}`,
    method: "post",
    data: params.formModel,
  });
  return res;
};

// 預設代理處理
export const getConfigAgent = createAsyncThunk(
  "agent/getConfigAgent",
  async () => {
    const res = await request({
      url: `/api/config/agent`,
      method: "get",
    });
    return res;
  },
);
export const configAgent = async params => {
  const res = await request({
    url: `/api/config/agent`,
    method: "post",
    data: params,
  });
  return res;
};

export const slice = createSlice({
  name: "agent",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
    configAgentData: {},
  },
  reducers: {
    setAgents: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: {
    [getAgents.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = metaToPagin(data.meta);
    },
    [getAgent.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.currentRow = data;
    },
    [getConfigAgent.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.configAgentData = data;
    },
  },
});
export const { setAgents } = slice.actions;
export const selectAgent = state => state.agent;
export default slice.reducer;
