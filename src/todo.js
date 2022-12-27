import closeIcon from "./images/icon-cross.svg";

export default function Todo(props) {
  // TODO FUNCTIONS
  /* JSON.stringify is required to store objects as strings 
    in the sessionStorage, else the string "[Object object]" is literaly stored */
  function deleteTodo(ev) {
    let id = +ev.currentTarget.parentElement.id.replace("todo-", "");
    props.setTodos((oldTodos) => {
      let newTodos = oldTodos.filter((todo) => todo.id !== id);
      // also update the sessionStorage data
      sessionStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
    props.updateTodoSessionIds();
  }

  // update isCompleted property of the clicked todo item
  function updateIsCompleted(ev) {
    let id = +ev.currentTarget.id.replace("todo-check-", "");
    let isCompleted = !ev.currentTarget.checked;
    props.setTodos((oldTodos) => {
      let newTodos = oldTodos.map((todo) => {
        if (todo.id === id) return { ...todo, isCompleted: !isCompleted };
        else return todo;
      });
      // also update the sessionStorage data
      sessionStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  }

  // DRAG AND DROP
  function drag(ev) {
    // remove active class any other todo
    document
      .querySelectorAll(".todo_item.active")
      .forEach((todo) => todo.classList.remove("active"));
    // adding an active class to allow for future selection of element
    ev.target.closest(".todo_item").classList.add("active");
  }

  return (
    <article
      id={"todo-" + props.id}
      className="todo_item"
      draggable="true"
      onDragStart={drag}
    >
      <input
        type="checkbox"
        name={props.title}
        id={"todo-check-" + props.id}
        checked={props.isCompleted}
        onChange={updateIsCompleted}
      />
      <label className="input_label" htmlFor={"todo-check-" + props.id}></label>
      <label className="todo_text" htmlFor={"todo-check-" + props.id}>
        {props.title}
      </label>
      <button className="delete_btn" onClick={deleteTodo}>
        <img src={closeIcon} alt="" />
      </button>
    </article>
  );
}
