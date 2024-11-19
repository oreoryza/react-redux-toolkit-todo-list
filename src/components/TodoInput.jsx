// src/components/TodoInput.js
import React from "react";

const TodoInput = () => {
  return (
    <div className="mb-3">
      <form className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task..."
          required
        />
        <button className="btn btn-primary">Add</button>
      </form>
    </div>
  );
};

export default TodoInput;
