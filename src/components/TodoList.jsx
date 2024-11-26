import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTodo,
  toggleTodo,
  currentTodo,
} from "../redux/slices/todosSlice";

// import { fetchTodos, deleteTodo, currentTodo, toggleTodo } from "../redux/async/todosSlice";

const TodoList = () => {
  const { todos, loading, error, isSuccess } = useSelector(
    (state) => state.todos
  );
  const lang = useSelector((state) => state.lang.lang);
  const dispatch = useDispatch();
  
  // useEffect(() => {
  //   dispatch(fetchTodos());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(fetchTodos());
  //   }
  // }, [isSuccess]);

  const handleToggle = (id) => {
    dispatch(toggleTodo(id))
    // .then(() => {
    //   dispatch(fetchTodos());
    // });
  };

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

  const handleEdit = (id) => {
    dispatch(currentTodo(id));
  };

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            todo.completed ? "list-group-item-success" : ""
          }`}
          onClick={() => handleToggle(todo.id)}
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
              cy-data="btn-delete"
              className="btn btn-danger btn-sm"
              disabled={loading}
            >
              {lang === "en" ? "Delete" : "Hapus"}
            </button>
            <button
              onClick={(e) => {handleEdit(todo.id), e.stopPropagation()}}
              cy-data="btn-edit"
              className="btn btn-warning btn-sm"
              disabled={loading}
            >
              {lang === "en" ? "Edit" : "Ubah"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
