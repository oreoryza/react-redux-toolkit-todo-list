// src/components/TodoInput.js
import React, {useEffect, useState} from "react";
import  { useDispatch, useSelector } from "react-redux";
// import { addTodo, updateTodo } from "../redux/slices/todosSlice";
import { addTodo, updateTodo } from "../redux/async/todosSlice";
import {v4 as uuidv4} from "uuid";

const TodoInput = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const {isUpdate, todo, loading} = useSelector((state) => state.todos);

  useEffect(() => {
    if (isUpdate) {
      setText(todo.text);
    }
  }, [isUpdate, todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      if (isUpdate) {
        dispatch(updateTodo({ ...todo, text }));
        setText("");
      } else {
      dispatch(addTodo({ id: uuidv4(), text, completed: false }));
      setText("");
      }
    }
  };

  return (
    <div className="mb-3">
      <form onSubmit={handleSubmit} className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit" disabled={loading} className={`btn ${isUpdate ? "btn-warning" : "btn-primary"}`}>{isUpdate ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default TodoInput;
