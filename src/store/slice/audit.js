import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";

export const getAudits = createAsyncThunk(
  "audit/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/audits",
      method: "get",
      params,
    });
    return res;
  },
);
export const getAudit = createAsyncThunk("card/getDetail", async id => {
  const res = await request({
    url: `/api/audits/${id}`,
    method: "get",
  });
  return res;
});

export const slice = createSlice({
  name: "audit",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
  },
  extraReducers: {
    [getAudits.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = {
        pageSize: data.meta.per_page,
        current: data.meta.page,
        total: data.meta.total,
      };
    },
    [getAudit.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.currentRow = data;
    },
  },
});
export const selectAudit = state => state.audit;
export default slice.reducer;
