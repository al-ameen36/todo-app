import Todo from "./todo";

export default function TodoList(props) {
  // update sessionStorage to match the new order of items in UI
  function updateTodoSessionIds() {
    let newTodos = Array.from(document.querySelectorAll(".todo_item")).map(
      (el, index) => {
        return {
          id: index + 1,
          title: el.querySelector(".todo_text").textContent,
          isCompleted: el.querySelector("input[type=checkbox]").checked,
        };
      }
    );
    sessionStorage.setItem("todos", JSON.stringify(newTodos));
  }

  // DRAG AND DROP
  function removeHoverOutline() {
    document.querySelectorAll(".todo_item").forEach((el) => {
      el.style.borderBottom = "";
      el.style.borderTop = "";
    });
  }

  function getElementInfo(ev) {
    let hoveredElement = ev.target.closest(".todo_item");
    let dropPos = ev.clientY - +document.querySelector("main").offsetTop; // position drop was made
    let todoItemPos = +hoveredElement.offsetTop; // todo item's position within its container
    let halfPos = dropPos - todoItemPos < +hoveredElement.offsetHeight / 2; // top/bottom part of the todo being hovered
    return [hoveredElement, halfPos];
  }
  function allowDrop(ev) {
    ev.preventDefault();
    // remove borders from all todos
    removeHoverOutline();

    // get hovered todo element info
    let [hoveredElement, halfPos] = getElementInfo(ev);

    // check if the mouse is at the top/bottom half part of the hovered todo
    // add border to indicate the drop position
    if (halfPos)
      hoveredElement.style.borderTop = "2px solid hsl(280, 87%, 65%)";
    else hoveredElement.style.borderBottom = "2px solid hsl(280, 87%, 65%)";
  }
  function drop(ev) {
    let draggedElement = document.querySelector(".todo_item.active");

    // get element info
    let [hoveredElement, halfPos] = getElementInfo(ev);
    // check if the mouse is at the top/bottom half part of the hovered todo
    if (halfPos) hoveredElement.before(draggedElement); // insert todo
    else hoveredElement.after(draggedElement); // insert todo
    // remove borders from all todos
    removeHoverOutline();
    draggedElement.classList.remove("active"); // remove active class from dragged todo

    // update sessionStorage to match the new order of items
    updateTodoSessionIds();
  }

  function dragLeave() {
    removeHoverOutline();
  }

  let todoData = props.todos;
  let todoElements = todoData.map((todo) => (
    <Todo
      key={todo.id}
      id={todo.id}
      title={todo.title}
      isCompleted={todo.isCompleted}
      setTodos={props.setTodos}
      updateTodoSessionIds={updateTodoSessionIds}
    />
  ));
  let todoListClassName =
    todoElements.length > 0 ? "todo_list" : "todo_list empty";

  return (
    <div
      className={todoListClassName}
      onDragLeave={dragLeave}
      onDragOver={allowDrop}
      onDrop={drop}
    >
      {todoElements.length > 0 ? todoElements : <p>No items yet.</p>}
    </div>
  );
}
