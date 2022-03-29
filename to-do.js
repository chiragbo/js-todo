function loadData() {
  //   localStorage.clear();
  let todoList = localStorage.getItem("todoList");
  if (todoList === null) {
    localStorage.setItem("todoList", []);
  } else {
    todoList = JSON.parse(todoList);
    document.getElementById("to-do").innerHTML = todoList
      .map(({ todo, id }) => {
        return createTodoElement(todo, id);
      })
      .join("");
    document.getElementById("to-do").innerHTML = todoList
      .map(({ todo, id, isCompleted }) => {
        return `<div class="single-todo">
      ${
        isCompleted
          ? `<span class="todo"><s>${todo}</s></span>
          <span class="chk-box">
             <input type="checkbox"  onchange="handleComplete(${id})" checked></input>
        </span>
        <span className="btn-delete">
            <button class="delete-bnt" onclick= handleDelete(${id})>
             Delete
          </button>
        </span>
        </div>`
          : `<span class="todo">${todo}</span><span class="chk-box">
          <input type="checkbox" onchange="handleComplete(${id})"></input>
        </span>
        <span className="btn-delete">
            <button class="delete-bnt" onclick= handleDelete(${id})>
             Delete
          </button>
        </span>
        </div>`
      }`;
      })
      .join("");
  }
}
function addTodo(event) {
  event.preventDefault();
  const txtTodo = document.getElementById("txtTodo").value;
  let todoList = localStorage.getItem("todoList");
  if (txtTodo.trim().length === 0) {
    document.getElementById("taskError").style.display = "block";
    return;
  } else {
    document.getElementById("taskError").style.display = "none";
  }

  //   return;
  todoList !== "" ? (todoList = JSON.parse(todoList)) : "";
  todoList = [
    ...todoList,
    { id: Date.now(), todo: txtTodo, isCompleted: false },
  ];
  document.getElementById("to-do").innerHTML = todoList
    .map(({ todo, id }) => {
      return createTodoElement(todo, id);
    })
    .join("");
  document.getElementById("txtTodo").value = "";
  renderTodoElements(todoList);
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
function handleComplete(id) {
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  console.log(id);
  todoList = todoList.map((todo) => {
    return todo.id === id
      ? { id: todo.id, todo: todo.todo, isCompleted: !todo.isCompleted }
      : todo;
  });
  renderTodoElements(todoList);
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
function handleDelete(id) {
  let todoList = JSON.parse(localStorage.getItem("todoList"));

  todoList = todoList.filter((todo) => {
    return todo.id !== id;
  });
  renderTodoElements(todoList);
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
const createTodoElement = (todo, id) => {
  return document
    .querySelector("#todoTemplate")
    .innerHTML.replace("##TODO_LABEL##", todo)
    .replace("##TODO_ID##", id);
};
const renderTodoElements = (todoList) => {
  document.getElementById("to-do").innerHTML = todoList
    .map(({ todo, id, isCompleted }) => {
      return `<div class="single-todo">
      ${
        isCompleted
          ? `<span class="todo"><s>${todo}</s></span>
          <span class="chk-box">
             <input type="checkbox"  onchange="handleComplete(${id})" checked></input>
        </span>
        <span className="btn-delete">
            <button class="delete-bnt" onclick= handleDelete(${id})>
             Delete
          </button>
        </span>
        </div>`
          : `<span class="todo">${todo}</span><span class="chk-box">
          <input type="checkbox" onchange="handleComplete(${id})"></input>
        </span>
        <span className="btn-delete">
            <button class="delete-bnt" onclick= handleDelete(${id})>
             Delete
          </button>
        </span>
        </div>`
      }`;
    })
    .join("");
};
