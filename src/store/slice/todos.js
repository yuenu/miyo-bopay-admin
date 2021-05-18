import { createSlice } from "@reduxjs/toolkit";
export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todolist: [
      { id: 1, name: "first todo on redux" },
      { id: 2, name: "second todo in list" },
    ],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todolist.push(action.payload);
    },
  },
});
export const { addTodo } = todoSlice.actions;
export const selectTodo = state => state.todo;
