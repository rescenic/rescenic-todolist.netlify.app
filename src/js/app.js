// Get form and task list elements
const form = document.querySelector("#task-form");
const taskList = document.querySelector("#task-list");
const taskInput = document.querySelector("#task-input");

// Check for existing tasks in local storage
let tasks;
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
} else {
  tasks = [];
}

// Add task
form.addEventListener("submit", (e) => {
  e.preventDefault();
  tasks.push({ task: taskInput.value, done: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  displayTasks();
});

// Display tasks
function displayTasks() {
  let taskListHtml = tasks
    .map((task, i) => {
      return `
        <li class="list-group-item">
          <input type="checkbox" class="mr-2" ${task.done ? "checked" : ""}>
          ${task.task}
          <button class="btn btn-danger btn-sm float-right delete-task" data-index=${i}>Delete</button>
          <button class="btn btn-info btn-sm float-right mr-2 edit-task" data-index=${i}>Edit</button>
        </li>
      `;
    })
    .join("");
  taskList.innerHTML = taskListHtml;

  //delete task
  let deleteButtons = document.querySelectorAll(".delete-task");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let index = e.target.dataset.index;
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    });
  });

  let editButtons = document.querySelectorAll(".edit-task");
  editButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let index = e.target.dataset.index;
      taskInput.value = tasks[index].task;
      form.removeEventListener("submit", addTask);
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        tasks[index].task = taskInput.value;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        form.removeEventListener("submit", editTask);
        form.addEventListener("submit", addTask);
        displayTasks();
      });
    });
  });
}

displayTasks();