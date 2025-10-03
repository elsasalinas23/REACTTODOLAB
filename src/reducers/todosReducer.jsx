// Action names (keep them in one place so you don't mistype strings)
export const TYPES = {
  INIT: "INIT",          // replace whole list (used by LocalStorage load)
  ADD: "ADD",            // add new todo at TOP
  TOGGLE: "TOGGLE",      // flip completed
  SAVE_TITLE: "SAVE_TITLE", // save edited title
  DELETE: "DELETE"       // remove by id
};

export function todosReducer(todos, action) {
  if (action.type === TYPES.INIT) {
    // Replace the entire list (guard against bad payloads)
    return Array.isArray(action.todos) ? action.todos : todos;

  } else if (action.type === TYPES.ADD) {
    const text = (action.title || "").trim();
    if (!text) return todos; // ignore empty adds
    const newTodo = { id: action.id, title: text, completed: false };
    // Requirement: new items appear at the TOP
    return [newTodo, ...todos];

  } else if (action.type === TYPES.TOGGLE) {
    // Flip completed for the item with this id
    return todos.map((todo) =>
      todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
    );

  } else if (action.type === TYPES.SAVE_TITLE) {
    const text = (action.title || "").trim();
    if (!text) return todos; // ignore blank saves (keep old title)
    return todos.map((todo) =>
      todo.id === action.id ? { ...todo, title: text } : todo
    );

  } else if (action.type === TYPES.DELETE) {
    // Remove the item with this id (UI keeps button disabled unless completed)
    return todos.filter((todo) => todo.id !== action.id);

  } else {
    // Unknown action: return current state unchanged
    return todos;
  }
}
