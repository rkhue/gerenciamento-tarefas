const API_URL = 'http://localhost:3000/api/tasks';

window.onload = () => {
  const savedFilter = sessionStorage.getItem('filter') || 'all';
  document.getElementById('filter').value = savedFilter;
  loadTasks();
};

function addTask() {
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  
  if (!title) {
    alert('Por favor, insira um título para a tarefa');
    return;
  }

  const task = { title, description, completed: false };
  localStorage.setItem(title, JSON.stringify(task));

  // Clear inputs
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  }).then(loadTasks).catch(() => renderTasks());
}

function loadTasks() {
  fetch(API_URL)
    .then(res => res.json())
    .then(tasks => {
      tasks.forEach(task => localStorage.setItem(task.title, JSON.stringify(task)));
      renderTasks();
    })
    .catch(() => renderTasks());
}

function renderTasks() {
  const filter = sessionStorage.getItem('filter') || 'all';
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  const tasks = [];
  Object.keys(localStorage).forEach(key => {
    try {
      const task = JSON.parse(localStorage.getItem(key));
      if (task && typeof task === 'object' && task.title) {
        tasks.push(task);
      }
    } catch (e) {
      // Skip invalid JSON
    }
  });

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed' && !task.completed) return false;
    if (filter === 'pending' && task.completed) return false;
    return true;
  });

  if (filteredTasks.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
      <div class="empty-icon">📝</div>
      <div class="empty-text">Nenhuma tarefa encontrada</div>
      <div class="empty-subtext">Adicione uma nova tarefa para começar</div>
    `;
    taskList.appendChild(emptyState);
    return;
  }

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';

    li.innerHTML = `
      <div class="task-content">
        <span class="task-status">${task.completed ? "✅" : "⏳"}</span>
        <div class="task-text">
          <span class="task-title">${task.title}</span>
          ${task.description ? `<span class="task-description">- ${task.description}</span>` : ''}
        </div>
      </div>
      <div class="task-actions">
        <button class="task-btn toggle-btn" onclick="toggleComplete('${task.title.replace(/'/g, "\\'")}')">
          ${task.completed ? 'Desmarcar' : 'Concluir'}
        </button>
        <button class="task-btn delete-btn" onclick="deleteTask('${task.title.replace(/'/g, "\\'")}')">
          Excluir
        </button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function toggleComplete(taskTitle) {
  const task = JSON.parse(localStorage.getItem(taskTitle));
  if (!task) return;
  
  task.completed = !task.completed;
  localStorage.setItem(task.title, JSON.stringify(task));

  fetch(`${API_URL}/${task._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  }).then(loadTasks).catch(() => renderTasks());
}

function deleteTask(taskTitle) {
  if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;
  
  const task = JSON.parse(localStorage.getItem(taskTitle));
  localStorage.removeItem(taskTitle);

  if (task && task._id) {
    fetch(`${API_URL}/${task._id}`, {
      method: 'DELETE'
    }).then(loadTasks).catch(() => renderTasks());
  } else {
    renderTasks();
  }
}

function applyFilter() {
  const selected = document.getElementById('filter').value;
  sessionStorage.setItem('filter', selected);
  renderTasks();
}