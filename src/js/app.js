// Ambil referensi dari DOM elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Buat array kosong untuk menyimpan tugas
let tasks = [];

// Periksa apakah ada tugas di penyimpanan lokal dan perbarui array tugas
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

// Render list tugas ke halaman
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${task}
      <button class="btn btn-danger btn-sm delete-task" data-index="${index}">Delete</button>
      <button class="btn btn-info btn-sm edit-task" data-index="${index}">Edit</button>
    `;
    taskList.appendChild(li);
  });
}

// Tambah sebuah tugas ke list
function addTask() {
  const task = taskInput.value;
  tasks.push(task);
  taskInput.value = '';
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Hapus sebuah tugas dari list
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Edit sebuah tugas dari list
function editTask(index) {
  let newTask = prompt("Enter new task: ");
  tasks[index] = newTask;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Tambah event listeners
addTaskButton.addEventListener('click', addTask);
taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-task')) {
    const index = event.target.dataset.index;
    deleteTask(index);
  }
  if (event.target.classList.contains('edit-task')) {
    const index = event.target.dataset.index;
    editTask(index);
  }
});

// Render list tugas
renderTasks();