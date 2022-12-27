function drag(ev) {
  let todoElement = ev.currentTarget;
  todoElement.parentElement.classList.add('todo_hover')
  console.log(todoElement.parentElement)
  ev.dataTransfer.setData("todo", todoElement.id);
}
function allowDrop(ev) {
  ev.preventDefault();
  ev.currentTarget.classList.add('todo_hover')
}
function dragLeave(ev){
  if(ev.currentTarget.id != ev.dataTransfer.getData("todo"))
  ev.currentTarget.classList.remove('todo_hover')
}
function drop(ev) {
  ev.preventDefault();
  let childElements = ev.currentTarget.children;
  let todo = ev.dataTransfer.getData("todo");
  let todoElement = document.getElementById(todo);
  if (childElements.length > 0) {
    todoElement.parentElement.appendChild(childElements[0]);
  }
  Array.from(
    document.querySelectorAll(".todo_wrapper"),
    (el) => (el.classList.remove('todo_hover'))
  );
  ev.currentTarget.appendChild(todoElement);
}
