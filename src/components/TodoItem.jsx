import React from "react";

export default function TodoItem({
  todo,           // current item
  isEditing,      // is this row in edit mode?
  draft,          // text while editing
  setDraft,       // update edit text
  onToggle,       // checkbox handler
  onStartEdit,    // enter edit mode
  onSaveEdit,     // save
  onCancelEdit,   // cancel
  onDelete        // delete (UI disables unless completed)
}) {
  return (
    <li className="todo-item">
      {/* checkbox hidden during edit for a simpler UI */}
      {!isEditing && (
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          aria-label={`Toggle ${todo.title}`}
        />
      )}

      <div className="todo-main">
        {isEditing ? (
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
          />
        ) : (
          <span className={todo.completed ? "completed" : ""}>
            {todo.title}
          </span>
        )}
      </div>

      {isEditing ? (
        <>
          <button onClick={onSaveEdit}>Save</button>
          <button onClick={onCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={onStartEdit}>Edit</button>
          <button
            onClick={onDelete}
            disabled={!todo.completed} // delete disabled unless completed (rubric)
            title={!todo.completed ? "Complete it first to delete" : "Delete"}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}
