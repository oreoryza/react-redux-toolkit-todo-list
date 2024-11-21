import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./async/todosSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});