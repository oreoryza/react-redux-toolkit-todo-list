import React, { useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { useSelector, useDispatch } from "react-redux";
import { langToggle } from "./redux/slices/langSlice";
import { toggleTheme } from "./redux/slices/themeSlice";

const App = () => {
  const lang = useSelector((state) => state.lang.lang);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);
  }, [theme]);
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex justify-content-end align-items-center gap-2">
                <button onClick={() => dispatch(langToggle())} className={`btn ${theme === "light" ? "btn-outline-primary" : "btn-outline-light"} p-2`}>{lang === "en" ? "EN" : "ID"}</button>
                <button onClick={() => dispatch(toggleTheme())} className={`btn ${theme === "light" ? "btn-outline-primary" : "btn-outline-light"} p-2`}>{theme === "light" ? <i className="bi bi-sun"></i> : <i className="bi bi-moon"></i>}</button>
              </div>
              <h1 className="card-title text-center mb-4">{lang === "en" ? "To-Do List" : "Daftar To-Do"}</h1>
              <TodoInput />
              <TodoList />
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default App;
