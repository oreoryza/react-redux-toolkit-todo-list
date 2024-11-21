import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/todos";

// Async actions
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const toggleTodo = createAsyncThunk("todos/toggleTodo", async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  const todo = response.data;
  const updatedTodo = { ...todo, completed: !todo.completed };
  await axios.put(`${API_URL}/${id}`, updatedTodo);
  return updatedTodo;
});

export const currentTodo = createAsyncThunk("todos/currentTodo", async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async (todo) => {
  const response = await axios.put(`${API_URL}/${todo.id}`, todo);
  return response.data;
});

// Initial state
const initialState = {
  todos: [],
  loading: false,
  error: null,
  todo: {},
  isSuccess: false,
  isUpdate: false,
};

// Slice
const todosSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder
      // Fetch Todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add Todo
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload); // Add the new todo to the list
        state.isSuccess = true;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete Todo
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Current Todo
      .addCase(currentTodo.fulfilled, (state, action) => {
        state.todo = action.payload;
        state.isUpdate = true;
      })
      // Update Todo
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdate = false;
        const { id, text } = action.payload;
        const todo = state.todos.find((todo) => todo.id === id);
        if (todo) {
          todo.text = text;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Toggle Todo
      .addCase(toggleTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleTodo.fulfilled, (state) => {
        state.loading = false;
        state.isSuccess = !state.isSuccess;
      })
      .addCase(toggleTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default todosSlice.reducer;
