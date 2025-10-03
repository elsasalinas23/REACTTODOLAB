import React, { useReducer, useState, useRef, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Tabs from "./components/Tabs";
import TodoList from "./components/TodoList";
import initialTodos from "./data/initialTodos";
import { todosReducer, TYPES } from "./reducers/todosReducer";
import "./App.css";

// filter for each page
function filterByPath(todos, pathname) {
  if (pathname === "/active") return todos.filter((todo) => !todo.completed);
  if (pathname === "/completed") return todos.filter((todo) => todo.completed);
  return todos; // "/" → all
}

export default function App() {
  // ---------- hooks (MUST come before using them) ----------
  const [todos, dispatch] = useReducer(todosReducer, initialTodos); // reducer state
  const [newText, setNewText] = useState("");       // add-input
  const [editingId, setEditingId] = useState(null); // which row is editing
  const [draft, setDraft] = useState("");           // edit-input text
  const nextId = useRef(1000);
  const location = useLocation();

  // ---------- LocalStorage load once ----------
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          dispatch({ type: TYPES.INIT, todos: parsed });
        }
      } catch {
        // ignore bad JSON
      }
    }
  }, []);

  // ---------- LocalStorage save on change ----------
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ---------- add new (goes to TOP) ----------
  function handleAdd(e) {
    e.preventDefault();
    const id = nextId.current++;
    dispatch({ type: TYPES.ADD, id, title: newText });
    setNewText("");
  }

  // ---------- compact callbacks (these caused your error if outside/above) ----------
  const toggle = (id) => dispatch({ type: TYPES.TOGGLE, id });
  const remove = (id) => dispatch({ type: TYPES.DELETE, id });
  const start  = (todo) => { setEditingId(todo.id); setDraft(todo.title); };
  const save   = (id) => { dispatch({ type: TYPES.SAVE_TITLE, id, title: draft }); setEditingId(null); setDraft(""); };
  const cancel = () => { setEditingId(null); setDraft(""); };

  // ---------- filter by current page ----------
  const visible = filterByPath(todos, location.pathname);

  return (
    <div className="todo-app">
      <h1>Todo List</h1>

      <Tabs />

      <form onSubmit={handleAdd} className="add-form">
        <input
          placeholder="Add a new todo…"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          aria-label="New todo"
        />
        <button type="submit" disabled={!newText.trim()}>
          Add
        </button>
      </form>

      <Routes>
        <Route
          path="/"
          element={
            <TodoList
              items={visible}
              editId={editingId}
              text={draft}
              setText={setDraft}
              toggle={toggle}
              start={start}
              save={save}
              cancel={cancel}
              remove={remove}
            />
          }
        />
        <Route
          path="/active"
          element={
            <TodoList
              items={visible}
              editId={editingId}
              text={draft}
              setText={setDraft}
              toggle={toggle}
              start={start}
              save={save}
              cancel={cancel}
              remove={remove}
            />
          }
        />
        <Route
          path="/completed"
          element={
            <TodoList
              items={visible}
              editId={editingId}
              text={draft}
              setText={setDraft}
              toggle={toggle}
              start={start}
              save={save}
              cancel={cancel}
              remove={remove}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}




