const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = [
  {
    text: "Task 1",
    completed: false,
    createdAt: new Date(),
  },
  {
    text: "Task 2",
    completed: true,
    createdAt: new Date(),
  },
];

const filterCheckbox = document.getElementById("filterCheckbox");
let showOnlyUncompleted = false;

function addTask() {
  const taskText = taskInput.value;
  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  tasks.push({
    text: taskText,
    completed: false,
    createdAt: new Date(),
  });

  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    const li = document.createElement("p");
    li.textContent = "No tasks found";
    taskList.appendChild(li);
    return;
  }

  const filteredTasks = showOnlyUncompleted
    ? tasks.filter((task) => !task.completed)
    : tasks;

  filteredTasks.forEach((task) => {
    const indexInAllTasks = tasks.indexOf(task);

    const li = document.createElement("li");
    li.style.cursor = "pointer";
    li.textContent = task.text;

    if (task.completed) {
      li.style.textDecoration = "line-through";
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(indexInAllTasks, 1);
      renderTasks();
    });
    li.appendChild(deleteButton);

    li.addEventListener("click", () => toggleTask(indexInAllTasks));
    taskList.appendChild(li);
  });
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

window.addEventListener("DOMContentLoaded", renderTasks);

filterCheckbox.addEventListener("change", () => {
  showOnlyUncompleted = filterCheckbox.checked;
  renderTasks();
});
