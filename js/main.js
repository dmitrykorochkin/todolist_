const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

form.addEventListener("submit", addTask);

tasksList.addEventListener("click", deleteTask);

tasksList.addEventListener("click", doneTask);

//Функция добавления задачи
function addTask(e) {
  e.preventDefault(); // Отмена перезагрузки страницы

  const taskText = taskInput.value;

  const taskHTML = `
    <li class="list-group-item d-flex justify-content-between task-item">
    <span class="task-title">${taskText}</span>
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

  //Очищаем поле ввода
  taskInput.value = "";
  taskInput.focus();

  if (tasksList.children.length > 1) {
    emptyList.classList.add("none");
  }
}

//Функция удаления задачи
function deleteTask(e) {
  if (e.target.dataset.action !== "delete") {
    return;
  }

  const parenNode = e.target.closest(".list-group-item");
  parenNode.remove();

  if (tasksList.children.length === 1) {
    emptyList.classList.remove("none");
  }
}

//Функция выполненной задачи
function doneTask(e) {
  if (e.target.dataset.action !== "done") return;

  const parenNode = e.target.closest(".list-group-item");
  const taskTitle = parenNode.querySelector(".task-title");
  taskTitle.classList.toggle("task-title--done");
}
