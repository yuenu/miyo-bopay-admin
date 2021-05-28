import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@/utils/request";

export const getUsers = createAsyncThunk(
  "user/getList",
  async (userId, thunkAPI) => {
    const { status, data } = await request({
      url: "/api/users",
      method: "GET",
    });
    return status === 200 ? data.data : [];
  },
);

export const slice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: {
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
  },
});
export const { setUsers } = slice.actions;
export const selectUser = state => state.user;
export default slice.reducer;
