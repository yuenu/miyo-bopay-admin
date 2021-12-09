import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";

export const getList = createAsyncThunk(
  "developerWhitelist/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/developerwhitelist",
      method: "get",
      params,
    });
    return res;
  },
);

export const addIps = async params => {
  const res = await request({
    url: `/api/developerwhitelist`,
    method: "post",
    data: params,
  });
  return res;
};

export const deleteIp = async params => {
  const res = await request({
    url: `/api/developerwhitelist?ip=${params.ip}`,
    method: "delete",
  });
  return res;
};

export const slice = createSlice({
  name: "developerWhitelist",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
  },
  reducers: {},
  extraReducers: {
    [getList.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200 || !Array.isArray(data)) return;
      state.list = data.map(i => ({ ip: i }));
    },
  },
});
export const selectDeveloperWhitelist = state => state.developerWhitelist;
export default slice.reducer;
