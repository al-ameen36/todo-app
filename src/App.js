import { useEffect, useState } from "react";
import Header from "./header";
import Summary from "./summary";
import TodoList from "./todoList";
import Filters from "./filters";

function App() {
  // get data stored in localStorage or set to empty array
  let localStorageData = JSON.parse(localStorage.getItem("todos")) || [];
  let [todos, setTodos] = useState(localStorageData || []);
  // A temporary variable to store todo item while user is typing
  let [todoItem, setTodoItem] = useState({ id: "", title: "" });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Header
        todoItem={todoItem}
        setTodoItem={setTodoItem}
        todos={todos}
        setTodos={setTodos}
      />
      <main>
        <TodoList todos={todos} setTodos={setTodos} />
        <Summary todos={todos} setTodos={setTodos} />
        <Filters todos={todos} setTodos={setTodos} />
      </main>
      <footer>Drag and drop to reorder list</footer>
    </>
  );
}

export default App;
