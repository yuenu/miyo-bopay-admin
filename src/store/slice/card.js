import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";

export const getCards = createAsyncThunk(
  "card/getList",
  async (params = {}) => {
    const res = await request({
      url: "/api/cards",
      method: "get",
      params,
    });
    return res;
  },
);
export const getCard = createAsyncThunk("card/getDetail", async id => {
  const res = await request({
    url: `/api/cards/${id}`,
    method: "get",
  });
  return res;
});
export const addCard = async params => {
  const res = await request({
    url: `/api/cards`,
    method: "post",
    data: params,
  });
  return res;
};
export const editCard = async params => {
  const res = await request({
    url: `/api/cards/${params.id}`,
    method: "post",
    data: params.formModel,
  });
  return res;
};

export const deleteCard = async id => {
  const res = await request({
    url: `/api/cards/${id}`,
    method: "delete",
  });
  return res;
};

export const slice = createSlice({
  name: "card",
  initialState: {
    list: [],
    meta: {},
    currentRow: {},
  },
  reducers: {
    setCards: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: {
    [getCards.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.list = data.data;
      state.meta = {
        pageSize: data.meta.per_page,
        current: data.meta.page,
        total: data.meta.total,
      };
    },
    [getCard.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status !== 200) return;
      state.currentRow = data;
    },
  },
});
export const { setCards } = slice.actions;
export const selectCard = state => state.card;
export default slice.reducer;
