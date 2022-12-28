export default function Filters(props) {
  // get data stored in localStorage or set to empty array
  let localStorageData = JSON.parse(localStorage.getItem("todos")) || [];

  function highlightFilterBtn(ev) {
    let filterButtons = Array.from(
      document.querySelectorAll(".todo_filters button")
    );
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    ev.currentTarget.classList.add("active");
  }

  function filterTodos(ev) {
    let newTodos;
    let filterBtnText = ev.currentTarget.textContent;
    if (filterBtnText === "Active")
      newTodos = localStorageData.filter((todo) => todo.isCompleted === false);
    else if (filterBtnText === "Completed")
      newTodos = localStorageData.filter((todo) => todo.isCompleted === true);
    else newTodos = [...localStorageData];
    props.setTodos(newTodos);
    // highlight the active filter button
    highlightFilterBtn(ev);
  }

  return (
    <article className="todo_filters">
      <h2 className="visually_hidden">list filters</h2>
      <button onClick={filterTodos} className="active">
        All
      </button>
      <button onClick={filterTodos}>Active</button>
      <button onClick={filterTodos}>Completed</button>
    </article>
  );
}
