import moonLogo from "./images/icon-moon.svg";
import sunLogo from "./images/icon-sun.svg";

export default function Header(props) {
  // get data stored in sessionStorage or set to empty array
  let sessionData = JSON.parse(sessionStorage.getItem("todos")) || [];

  // keep track of input changes when user typing
  function updateTodo(e) {
    props.setTodoItem({
      id: sessionData.length + 1,
      title: e.target.value,
    });
  }

  function addTodo(e) {
    e.preventDefault();
    // get the value of the checkbox 'isCompleted'
    let isCompleted = document.getElementById("isCompleted");
    props.setTodos(() => {
      let newTodos = [
        ...sessionData,
        { ...props.todoItem, isCompleted: isCompleted.checked },
      ];
      // update the sessionStorage
      sessionStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
    // reset the 'isComplete' checkbox
    // isCompleted.checked = false;
    // reset todoItem
    props.setTodoItem({ id: "", title: "" });
  }

  // toggle the theme
  function changeTheme() {
    let themes = ["light_theme", "dark_theme"];
    let themeIconImage = document.getElementById("themeIcon");
    themeIconImage.src =
      themeIconImage.src.search(moonLogo) >= 0 ? sunLogo : moonLogo;
    themes.forEach((theme) =>
      document.getElementById("root").classList.toggle(theme)
    );
  }

  return (
    <>
      <header>
        <div className="header_inner">
          <div className="app_title">
            <h1>TODO</h1>
            <button id="themeToggler" onClick={changeTheme}>
              {/* <img src="images/icon-sun.svg" alt=""> */}
              <img id="themeIcon" src={moonLogo} alt="" />
            </button>
          </div>

          <form className="todo_inputs" onSubmit={addTodo}>
            <input type="checkbox" name="isCompleted" id="isCompleted" />
            <label className="input_label" htmlFor="isCompleted"></label>
            <input
              id="todoItem-input"
              onChange={updateTodo}
              type="text"
              name="todoItem"
              placeholder="Create a new todo..."
              autoFocus={true}
              value={props.todoItem.title}
            />
          </form>
        </div>
      </header>
    </>
  );
}
