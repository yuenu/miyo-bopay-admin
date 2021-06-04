import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";

export const getDevelopers = createAsyncThunk(
  "developer/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/developers",
      method: "get",
      params,
    });
    return res;
  },
);

export const getDeveloper = createAsyncThunk(
  "developer/getDetail",
  async id => {
    const res = await request({
      url: `/api/developers/${id}`,
      method: "get",
    });
    return res;
  },
);
export const editDeveloper = async params => {
  const res = await request({
    url: `/api/developers/${params.id}`,
    method: "post",
    data: params.formModel,
  });
  return res;
};

export const deleteDeveloper = async id => {
  const res = await request({
    url: `/api/developers/${id}`,
    method: "delete",
  });
  return res;
};

export const slice = createSlice({
  name: "developer",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
  },
  reducers: {
    setDevelopers: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: {
    [getDevelopers.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = {
        pageSize: data.meta.per_page,
        current: data.meta.page,
        total: data.meta.total,
      };
    },
    [getDeveloper.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.currentRow = data;
    },
  },
});
export const { setDevelopers } = slice.actions;
export const selectDeveloper = state => state.developer;
export default slice.reducer;
