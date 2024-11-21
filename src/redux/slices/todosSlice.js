import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  todo: {},
  isUpdate: false,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    currentTodo: (state, action) => {
      state.todo = action.payload;
      state.isUpdate = true;
    },
    updateTodo: (state, action) => {
      state.isUpdate = false;
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    },
  },
});

export const { currentTodo, addTodo, deleteTodo, toggleTodo, updateTodo } =
  todosSlice.actions;

export default todosSlice.reducer;
