import React from "react";
import { Checkbox } from "react-daisyui";

function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }
  return (
    <div className="form-control max-w-fit">
      <label className="cursor-pointer label">
        <Checkbox
          checked={todo.complete}
          onChange={handleTodoClick}
          className="mr-4"
        />
        <div className="text-lg whitespace-normal">{todo.name}</div>
      </label>
    </div>
  );
}

export default Todo;
