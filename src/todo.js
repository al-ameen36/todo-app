import closeIcon from "./images/icon-cross.svg";

export default function Todo(props) {
  // TODO FUNCTIONS
  function deleteTodo(ev) {
    let id = +ev.currentTarget.parentElement.id.replace("todo-", "");
    props.setTodos((prevTodos) => {
      let newTodos = prevTodos.filter((todo) => todo.id !== id);
      return newTodos;
    });
    props.updateTodoIds();
  }

  // update isCompleted property of the clicked todo item
  function updateIsCompleted(ev) {
    let isCompleted = !ev.currentTarget.checked;
    props.setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === prevTodos.length)
          return { ...todo, isCompleted: !isCompleted };
        else return todo;
      });
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
      <h2 className="visually_hidden">todo item {props.id}</h2>
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
