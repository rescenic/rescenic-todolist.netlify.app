const addTask = document.getElementById("add-task");
const task = document.getElementById("task");
const list = document.getElementById("list");

// Mengambil list tugas dari local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Fungsi untuk memuat list tugas yang sudah ada
function loadTasks() {
  tasks.forEach(function(task, index) {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.appendChild(document.createTextNode(task));
    const delBtn = document.createElement("button");
    delBtn.classList.add("btn", "btn-danger", "delete-btn");
    delBtn.appendChild(document.createTextNode("X"));
    li.appendChild(delBtn);
    list.appendChild(li);
    delBtn.addEventListener("click", function() {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      li.remove();
    });
  });
}

// Fungsi untuk menambah tugas yang baru
addTask.addEventListener("click", function(e) {
  e.preventDefault();
  if (task.value === "") return;
  tasks.push(task.value);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  const li = document.createElement("li");
  li.classList.add("list-group-item");
  li.appendChild(document.createTextNode(task.value));
  const delBtn = document.createElement("button");
  delBtn.classList.add("btn", "btn-danger", "delete-btn");
  delBtn.appendChild(document.createTextNode("X"));
  li.appendChild(delBtn);
  list.appendChild(li);
  task.value = "";
  delBtn.addEventListener("click", function() {
    tasks.splice(tasks.indexOf(task.value), 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.remove();
  });
});

// Memanggil fungsi loadTasks di halaman saat ini
loadTasks();
