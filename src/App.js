import { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import ThemeToggle from "./ThemeToggle";
import { v4 as uuidv4 } from "uuid";
import { Input, Button, Navbar } from "react-daisyui";

const LOCAL_STORAGE_KEY = "todoApp.todos";

let localStorageTodos = null;

if (typeof window !== "undefined") {
  localStorageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
}

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    // runs only once
    // console.log("fetching todos");
    // const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (storedTodos) {
    //   setTodos(storedTodos);
    //   console.log("fetched stored todos");
    // }

    // fetches only once
    if (localStorageTodos) {
      setTodos(localStorageTodos);
      console.log("fetched stored todos");
      localStorageTodos = null;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((to) => to.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    e.preventDefault();
    const name = todoNameRef.current.value;
    if (name === "") return;

    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });

    todoNameRef.current.value = null;
  }

  function handleClearTodos(e) {
    const newTodos = todos.filter((to) => !to.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <Navbar>
        <Navbar.Start>
          <Button color="ghost" className="text-xl normal-case">
            todo
          </Button>
        </Navbar.Start>
        <Navbar.End>
          <ThemeToggle />
        </Navbar.End>
      </Navbar>
      <div className="container mx-auto py-4 max-w-xl">
        <h1 className="text-4xl font-bold text-center">todos</h1>
        <div className="my-4 min-h-6">
          <TodoList todos={todos} toggleTodo={toggleTodo} />
        </div>
        <form className="flex gap-2" onSubmit={handleAddTodo}>
          <Input autoFocus ref={todoNameRef} type="text" className="grow" />
          <Button color="primary" type="submit">
            Add todo
          </Button>
          <Button color="warning" onClick={handleClearTodos}>
            Clear Completed
          </Button>
        </form>
        <div>{todos.filter((to) => !to.complete).length} left to do</div>
      </div>
    </>
  );
}

export default App;
