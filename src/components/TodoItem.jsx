import React from "react";

export default function TodoItem({
  todo,        // the row data
  editId,      // which id is in edit mode (from parent)
  text,        // draft text while editing
  setText,     // set draft text
  toggle,      // (id) => flip completed
  start,       // (todo) => begin editing this row
  save,        // (id) => save draft to title
  cancel,      // () => stop editing
  remove       // (id) => delete
}) {
  const editing = editId === todo.id;

  return (
    <li className="todo-item">
      {!editing && (
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggle(todo.id)}
        />
      )}

      <div className="todo-main">
        {editing ? (
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
          />
        ) : (
          <span className={todo.completed ? "completed" : ""}>
            {todo.title}
          </span>
        )}
      </div>

      {editing ? (
        <>
          <button onClick={() => save(todo.id)}>Save</button>
          <button onClick={cancel}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={() => start(todo)}>Edit</button>
          <button
            onClick={() => remove(todo.id)}
            disabled={!todo.completed}
            title={!todo.completed ? "Complete it first to delete" : "Delete"}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}
