import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import {
//   deleteTodo,
//   toggleTodo,
//   currentTodo,
// } from "../redux/slices/todosSlice";

import { fetchTodos, deleteTodo, currentTodo } from "../redux/async/todosSlice";

const TodoList = () => {
  const { todos, loading, error, isSuccess } = useSelector(
    (state) => state.todos
  );
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchTodos());
    }
  }, [isSuccess]);

  if (loading) {
    return <div className="alert alert-info text-center">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  if (todos.length === 0) {
    return (
      <div className="alert alert-secondary text-center">No todos found.</div>
    );
  }


  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            todo.completed ? "list-group-item-success" : ""
          }`}
          onClick={() => dispatch(toggleTodo(todo.id))}
        >
          <span
            style={{
              cursor: "pointer",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </span>
          <div className="btn-group">
            <button
              onClick={(e) =>
                dispatch(deleteTodo(todo.id), e.stopPropagation())
              }
              className="btn btn-danger btn-sm"
              disabled={loading}
            >
              Delete
            </button>
            <button
              onClick={(e) => dispatch(currentTodo(todo.id), e.stopPropagation())}
              className="btn btn-warning btn-sm"
              disabled={loading}
            >
              Edit
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
