let todoList = [];
const createTodoElement = (todo, id) => {
  return document
    .querySelector("#todoTemplate")
    .innerHTML.replace("##TODO_LABEL##", todo)
    .replace("##TODO_ID##", id);
};
function addTodo(event) {
  event.preventDefault();
  const txtTodo = document.getElementById("txtTodo").value;
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
}
function handleComplete(id) {
  console.log(id);
  todoList = todoList.map((todo) => {
    return todo.id === id
      ? { id: todo.id, todo: todo.todo, isCompleted: !todo.isCompleted }
      : todo;
  });
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
        <span className="btn-delete"></span>
        </div>`
      }`;
    })
    .join("");
}

function handleDelete(id) {
  console.log(id);
  todoList = todoList.filter((todo) => {
    return todo.id !== id;
  });
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
      <span className="btn-delete"></span>
      </div>`
    }`;
    })
    .join("");
}
