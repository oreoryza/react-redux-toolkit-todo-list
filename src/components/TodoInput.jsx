// src/components/TodoInput.js
import React, {useEffect, useState} from "react";
import  { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../redux/slices/todosSlice";
// import { addTodo, updateTodo } from "../redux/async/todosSlice";
import {v4 as uuidv4} from "uuid";

const TodoInput = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const {isUpdate, todo, loading} = useSelector((state) => state.todos);
  const lang = useSelector((state) => state.lang.lang);

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
          placeholder={lang == "en" ? "Add a new todo.." : "Tambahkan to-do baru.."}
          value={text}
          cy-data="input-todo"
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button cy-data="input-button" type="submit" disabled={loading} className={`btn ${isUpdate ? "btn-warning" : "btn-primary"}`}>{isUpdate ? `${lang == "en" ? "Update" : "Perbarui"}` : `${lang == "en" ? "Add" : "Tambah"}`}</button>
      </form>
    </div>
  );
};

export default TodoInput;
