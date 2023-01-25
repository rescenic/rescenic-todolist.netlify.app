const addTask = document.getElementById("add-task");
const task = document.getElementById("task");
const list = document.getElementById("list");

addTask.addEventListener("click", function(e) {
  e.preventDefault();
  if (task.value === "") return;
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(task.value));
  list.appendChild(li);
  task.value = "";
});