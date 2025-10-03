import React, { useReducer, useState, useRef, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Tabs from "./components/Tabs";
import TodoList from "./components/TodoList";
import initialTodos from "./data/initialTodos";
import { todosReducer, TYPES } from "./reducers/todosReducer";

// Filter helper for each page
function filterByPath(todos, pathname) {
  if (pathname === "/active") return todos.filter((todo) => !todo.completed);
  if (pathname === "/completed") return todos.filter((todo) => todo.completed);
  return todos; // "/" → all
}

export default function App() {
  // useReducer: main list state
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);

  // useState: small UI pieces
  const [newText, setNewText] = useState(""); // add-input (controlled)
  const [editingId, setEditingId] = useState(null); // which row is editing
  const [draft, setDraft] = useState(""); // edit-input (controlled)

  // id generator for new items
  const nextId = useRef(1000);

  // read current path to filter view
  const location = useLocation();

  // Load from LocalStorage ONCE (if present). Otherwise keep initialTodos.
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          dispatch({ type: TYPES.INIT, todos: parsed });
        }
      } catch {
        // ignore bad JSON; stay with initialTodos
      }
    }
  }, []);

  // Save to LocalStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add new todo at TOP
  function handleAdd(e) {
    e.preventDefault();
    const id = nextId.current++;
    dispatch({ type: TYPES.ADD, id, title: newText });
    setNewText("");
  }

  // Start editing one row
  function startEditing(todo) {
    setEditingId(todo.id);
    setDraft(todo.title);
  }

  // Save edit
  function saveEditing(id) {
    dispatch({ type: TYPES.SAVE_TITLE, id, title: draft });
    setEditingId(null);
    setDraft("");
  }

  // Cancel edit
  function cancelEditing() {
    setEditingId(null);
    setDraft("");
  }

  // Which items to show on this page?
  const visible = filterByPath(todos, location.pathname);

  return (
    <div className="todo-app">
      <h1>Todo List</h1>

      {/* page tabs */}
      <Tabs />

      {/* add form (controlled) */}
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

      {/* routes (All / Active / Completed) render the same list component */}
      <Routes>
        <Route
          path="/"
          element={
            <TodoList
              items={visible}
              dispatch={dispatch}
              editingId={editingId}
              draft={draft}
              setDraft={setDraft}
              onStartEdit={startEditing}
              onSaveEdit={saveEditing}
              onCancelEdit={cancelEditing}
            />
          }
        />
        <Route
          path="/active"
          element={
            <TodoList
              items={visible}
              dispatch={dispatch}
              editingId={editingId}
              draft={draft}
              setDraft={setDraft}
              onStartEdit={startEditing}
              onSaveEdit={saveEditing}
              onCancelEdit={cancelEditing}
            />
          }
        />
        <Route
          path="/completed"
          element={
            <TodoList
              items={visible}
              dispatch={dispatch}
              editingId={editingId}
              draft={draft}
              setDraft={setDraft}
              onStartEdit={startEditing}
              onSaveEdit={saveEditing}
              onCancelEdit={cancelEditing}
            />
          }
        />
        {/* unknown paths → redirect to All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}



