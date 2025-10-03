import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({
  items,    // filtered items for this page
  editId,   // which id is editing
  text,     // draft text
  setText,  // setter
  toggle,   // (id) => toggle
  start,    // (todo) => start editing
  save,     // (id) => save
  cancel,   // () => cancel
  remove    // (id) => delete
}) {
  return (
    <>
      <ul className="todo-list">
        {items.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editId={editId}
            text={text}
            setText={setText}
            toggle={toggle}
            start={start}
            save={save}
            cancel={cancel}
            remove={remove}
          />
        ))}
      </ul>

      <p className="tip">
        Tip: You can only delete completed items. Check the box first, then delete.
      </p>
    </>
  );
}

