// Action names (avoid typos)
export const TYPES = {
  INIT: "INIT",            // replace whole list (used for LocalStorage load)
  ADD: "ADD",              // add new todo at TOP
  TOGGLE: "TOGGLE",        // flip completed
  SAVE_TITLE: "SAVE_TITLE",// save edited title
  DELETE: "DELETE"         // remove by id
};

// The reducer: how the todos array changes for each action
export function todosReducer(todos, action) {
  switch (action.type) {
    case TYPES.INIT: {
      return action.todos;
    }
    case TYPES.ADD: {
      const text = action.title.trim();
      if (!text) return todos;
      const newTodo = { id: action.id, title: text, completed: false };
      return [newTodo, ...todos]; // NEW at TOP (rubric)
    }
    case TYPES.TOGGLE: {
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    }
    case TYPES.SAVE_TITLE: {
      const text = action.title.trim();
      if (!text) return todos; // keep old title if blank edit attempted
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, title: text } : todo
      );
    }
    case TYPES.DELETE: {
      return todos.filter((todo) => todo.id !== action.id);
    }
    default:
      return todos;
  }
}
