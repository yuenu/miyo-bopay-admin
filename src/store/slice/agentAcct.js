import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";
import { metaToPagin } from "@/utils/format";

export const getAgentAccts = createAsyncThunk(
  "agentAcct/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/agentaccts",
      method: "get",
      params,
    });
    return res;
  },
);

export const getAgentAcct = createAsyncThunk(
  "agentAcct/getDetail",
  async id => {
    const res = await request({
      url: `/api/agentaccts/${id}`,
      method: "get",
    });
    return res;
  },
);

export const balanceAgentAcct = async ({ id, formModel }) => {
  const res = await request({
    url: `/api/agentaccts/${id}/balance`,
    method: "post",
    data: { ...formModel },
  });
  return res;
};

export const slice = createSlice({
  name: "agentacct",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
  },
  reducers: {
    setAgentAccts: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: {
    [getAgentAccts.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = metaToPagin(data.meta);
    },
    [getAgentAcct.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.currentRow = data;
    },
  },
});

export const { setAgentAccts } = slice.actions;
export const selectAgentAcct = state => state.agentAcct;
export default slice.reducer;
