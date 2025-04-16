// چک کردن اینکه آیا تسکی ذخیره شده یا نه
if (localStorage.getItem('tasks') === null) {
  localStorage.setItem('tasks', JSON.stringify([])); // اگر هیچ تسکی نباشه، یک آرایه خالی می‌سازیم
}

// تابع برای نمایش تسک‌ها
function renderTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const taskContainer = document.getElementById('task-container');
  taskContainer.innerHTML = ''; // پاک کردن محتوا قبلی

  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task-card');
    taskElement.innerHTML = `
      <h2>${task.title}</h2>
      <p>${task.description}</p>
      <div class="progress-bar" style="width: ${task.progress}%;"></div>
      <p>پیشرفت: ${task.progress}%</p>
      <input type="date" value="${task.dueDate}" onchange="updateDueDate(event, '${task.title}')">
      <button class="delete" onclick="removeTask('${task.title}')">حذف تسک</button>
    `;
    taskContainer.appendChild(taskElement);
  });
}

// تابع برای افزودن تسک جدید
function addTask() {
  const title = prompt("عنوان تسک جدید:");
  const description = prompt("توضیحات تسک:");
  const dueDate = prompt("تاریخ سررسید (به فرمت YYYY-MM-DD):");
  const progress = 0; // تسک جدید پیشرفت صفر درصد داره

  const tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.push({ title, description, dueDate, progress });
  localStorage.setItem('tasks', JSON.stringify(tasks));

  renderTasks();
}

// تابع برای حذف تسک
function removeTask(title) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const updatedTasks = tasks.filter(task => task.title !== title);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));

  renderTasks();
}

// تابع برای بروزرسانی تاریخ سررسید
function updateDueDate(event, title) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const task = tasks.find(task => task.title === title);
  task.dueDate = event.target.value;
  localStorage.setItem('tasks', JSON.stringify(tasks));

  renderTasks();
}

// فراخوانی تابع renderTasks برای نمایش تسک‌ها هنگام بارگذاری
renderTasks();
