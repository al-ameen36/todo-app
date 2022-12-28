export default function Summary(props) {
  let sessionData = JSON.parse(sessionStorage.getItem("todos")) || [];

  // highlight 'All' filter button
  function highlightFilterBtn() {
    let filterButtons = Array.from(
      document.querySelectorAll(".todo_filters button")
    );
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.textContent === "All") btn.classList.add("active");
    });
  }
  function clearCompleted() {
    props.setTodos(sessionData.filter((todo) => !todo.isCompleted));
    // update sessionStorage
    sessionStorage.setItem(
      "todos",
      JSON.stringify(sessionData.filter((todo) => !todo.isCompleted))
    );
    highlightFilterBtn();
  }
  return (
    <>
      <article className="todo_summary">
        <h2>
          {props.todos.length} item{props.todos.length !== 1 ? "s" : ""} left
        </h2>
        <button onClick={clearCompleted}>Clear Completed</button>
      </article>
    </>
  );
}
