const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", doneTask);

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach(function(task) {
    renderTask(task);
  });
}

checkEmptyList();

//Функция добавления задачи
function addTask(e) {
  e.preventDefault(); // Отмена перезагрузки страницы

  const taskText = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false
  };

  //Добавление задачи в массив tasks
  tasks.push(newTask);

  saveToLocalStorage();

  renderTask(newTask);

  //Очищаем поле ввода
  taskInput.value = "";
  taskInput.focus();

  checkEmptyList();
}

//Функция удаления задачи
function deleteTask(e) {
  if (e.target.dataset.action !== "delete") {
    return;
  }

  const parenNode = e.target.closest(".list-group-item");
  // Определяем ID задачи
  const id = Number(parenNode.id);
  //Находим индекс зааачи в массиве
  const index = tasks.findIndex(task => {
    return task.id === id;
  });

  //Удаялем задачу из массива tasks
  tasks.splice(index, 1);

  saveToLocalStorage();

  parenNode.remove();
  checkEmptyList();
}
//Функция выполненной задачи
function doneTask(e) {
  if (e.target.dataset.action !== "done") return;

  const parenNode = e.target.closest(".list-group-item");

  const id = Number(parenNode.id);
  const task = tasks.find(task => task.id === id);

  task.done = !task.done;

  saveToLocalStorage();

  const taskTitle = parenNode.querySelector(".task-title");
  taskTitle.classList.toggle("task-title--done");
}

function checkEmptyList() {
  if (tasks.length === 0) {
    const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/to-do.png" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
    </li>`;
    tasksList.insertAdjacentHTML("afterbegin", emptyListHTML);
  }

  if (tasks.length > 0) {
    const emptyListEl = document.querySelector("#emptyList");
    emptyListEl ? emptyListEl.remove() : null;
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(task) {
  const cssClass = task.done ? "task-title task-title--done" : "task-title";

  const taskHTML = `
      <li id="${task.id}"class="list-group-item d-flex justify-content-between task-item">
      <span class="${cssClass}">${task.text}</span>
      <div class="task-item__buttons">
          <button type="button" data-action="done" class="btn-action">
              <img src="./img/tick.svg" alt="Done" width="18" height="18">
          </button>
          <button type="button" data-action="delete" class="btn-action">
              <img src="./img/cross.svg" alt="Done" width="18" height="18">
          </button>
      </div>
      </li>`;

  //Добавдение разметки на страницу
  tasksList.insertAdjacentHTML("beforeend", taskHTML);
}
