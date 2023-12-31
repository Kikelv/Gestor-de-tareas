const taskList = document.querySelector("#task-list"); // es el <ul> del que van a colgar as tareas <li>
const newTaskInput = document.querySelector("#new-task-input");
const addTaskButton = document.querySelector("#add-task-button");

const tasks = [];

const app = {
  tasks: tasks,
  taskList: taskList,
  newTaskInput: newTaskInput,
};

function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  app.tasks = savedTasks.map((task) => {
    return createTask(task.title, task.isCompleted);
  });
  app.tasks.forEach((tasks) => {
    return addTaskToList(tasks, app.taskList);
  });
};

function createTask(title, isCompleted = false) {
  return {
    id: Date.now(),
    title,
    isCompleted,
  };
}
function addTaskToList(task, taskList) {
  const taskElement = createTaskElement(task);
  taskList.appendChild(taskElement);
}

function addTask(app) {
  const newTaskTitle = app.newTaskInput.value;
  const newTask = createTask(newTaskTitle);

  app.tasks.push(newTask);
  addTaskToList(newTask, app.taskList);
  saveTasksToLocalStorage(app.tasks);
  app.newTaskInput.value = "";
}

function createTaskElement(task) {
  const taskElement = document.createElement("li");
  const taskCheckBox = document.createElement("input");
  taskCheckBox.type = "checkbox";
  taskCheckBox.checked = task.isCompleted;
  taskCheckBox.addEventListener("change", () => {
    task.isCompleted = taskCheckBox.checked;
    taskText.classList.toggle("completed", task.isCompleted);
    saveTasksToLocalStorage(app.tasks);
  });

  const taskText = document.createElement("span");
  taskText.textContent = task.title;
  taskText.classList.toggle("completed", task.isCompleted);

  const taskDeleteButton = document.createElement("button");
  taskDeleteButton.textContent = "Eliminar";
  taskDeleteButton.className = "delete-button";
  taskDeleteButton.addEventListener("click", () => {
    taskElement.remove();

    const taskIndex = app.tasks.indexOf(task);
    if (taskIndex > -1) {
      app.tasks.splice(taskIndex, 1);
    }
    saveTasksToLocalStorage(app.tasks);
  });

  taskElement.appendChild(taskCheckBox);
  taskElement.appendChild(taskText);
  taskElement.appendChild(taskDeleteButton);

  return taskElement;
}
function createDeleteAllButton(tasks) {
  if (app.tasks.length > 1) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.className = "delete-button";
  }
  return console.log("hola", app.tasks);
}

addTaskButton.addEventListener("click", () => {
  addTask(app);
});
newTaskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask(app);
  }
});
