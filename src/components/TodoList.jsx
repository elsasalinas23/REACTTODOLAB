import React from "react";
import TodoItem from "./TodoItem";
import { TYPES } from "../reducers/todosReducer";

export default function TodoList({
  items,           // filtered items for this page
  dispatch,        // reducer dispatch
  editingId,       // which id is in edit mode (null = none)
  draft,           // text while editing
  setDraft,        // setter for draft
  onStartEdit,     // enter edit mode
  onSaveEdit,      // save edit
  onCancelEdit     // cancel edit
}) {
  return (
    <>
      <ul className="todo-list">
        {items.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isEditing={editingId === todo.id}
            draft={draft}
            setDraft={setDraft}
            onToggle={() => dispatch({ type: TYPES.TOGGLE, id: todo.id })}
            onStartEdit={() => onStartEdit(todo)}
            onSaveEdit={() => onSaveEdit(todo.id)}
            onCancelEdit={onCancelEdit}
            onDelete={() => dispatch({ type: TYPES.DELETE, id: todo.id })}
          />
        ))}
      </ul>

    </>
  );
}
