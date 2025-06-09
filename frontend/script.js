const API_URL = 'http://localhost:3000/api/tasks';

window.onload = () => {
  const savedFilter = sessionStorage.getItem('filter') || 'all';
  document.getElementById('filter').value = savedFilter;
  loadTasks();
};

function addTask() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  const task = { title, description, completed: false };
  localStorage.setItem(title, JSON.stringify(task));

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  }).then(loadTasks);
}

function loadTasks() {
  fetch(API_URL)
    .then(res => res.json())
    .then(tasks => {
      tasks.forEach(task => localStorage.setItem(task.title, JSON.stringify(task)));
      renderTasks();
    });
}

function renderTasks() {
  const filter = sessionStorage.getItem('filter') || 'all';
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  Object.keys(localStorage).forEach(key => {
    const task = JSON.parse(localStorage.getItem(key));
    if (filter === 'completed' && !task.completed) return;
    if (filter === 'pending' && task.completed) return;

    const li = document.createElement('li');
    li.textContent = `${task.title}: ${task.description} - ${task.completed ? "✅" : "❌"}`;

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = task.completed ? 'Desmarcar' : 'Concluir';
    toggleBtn.onclick = () => toggleComplete(task);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.onclick = () => deleteTask(task);

    li.appendChild(toggleBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function toggleComplete(task) {
  task.completed = !task.completed;
  localStorage.setItem(task.title, JSON.stringify(task));

  fetch(`${API_URL}/${task._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  }).then(loadTasks);
}

function deleteTask(task) {
  localStorage.removeItem(task.title);

  fetch(`${API_URL}/${task._id}`, {
    method: 'DELETE'
  }).then(loadTasks);
}

function applyFilter() {
  const selected = document.getElementById('filter').value;
  sessionStorage.setItem('filter', selected);
  renderTasks();
}
