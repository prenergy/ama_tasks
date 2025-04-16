// نمایش تسک‌ها
function renderTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskContainer = document.getElementById('task-container');
  taskContainer.innerHTML = ''; // پاک کردن محتوا قبلی

  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task-card');
    taskElement.innerHTML = `
      <h2>${task.title}</h2>
      <p>${task.description}</p>
      <p>تاریخ ایجاد (میلادی): ${task.createdDateMiladi}</p>
      <p>تاریخ ایجاد (شمسی): ${task.createdDateShamsi}</p>
      <p>تاریخ سررسید: ${task.dueDate}</p>
      <div class="progress-bar" style="width: ${task.progress}%;"></div>
      <p>پیشرفت: ${task.progress}%</p>
      <button onclick="removeTask('${task.title}')">حذف تسک</button>
    `;
    taskContainer.appendChild(taskElement);
  });
}

// حذف تسک
function removeTask(title) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(task => task.title !== title);  // فیلتر کردن تسک حذف شده
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));  // ذخیره تغییرات در localStorage
  renderTasks();  // رندر مجدد تسک‌ها
}

// اجرای رندر تسک‌ها
renderTasks();
