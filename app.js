const addTask = document.getElementById("add-task");
const task = document.getElementById("task");
const list = document.getElementById("list");

// Mengambil list tugas dari local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || []

// Fungsi untuk memuat list tugas yang sudah ada
function loadTasks() {
  tasks.forEach(function(task) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(task));
    list.appendChild(li);
  });
}

// Fungsi untuk menambah tugas yang baru
addTask.addEventListener("click", function(e) {
  e.preventDefault();
  if (task.value === "") return;
  tasks.push(task.value);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(task.value));
  list.appendChild(li);
  task.value = "";
});

// Memanggil fungsi loadTasks untuk memuat list tugas yang sudah ada
loadTasks();