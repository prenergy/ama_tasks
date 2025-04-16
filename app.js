// تابع برای افزودن تسک جدید
function addTask() {
  console.log("دکمه افزودن تسک جدید فشرده شد");  // این خط رو برای تست اضافه کن

  const title = prompt("عنوان تسک جدید:");
  const description = prompt("توضیحات تسک:");
  const dueDate = prompt("تاریخ سررسید (به فرمت YYYY-MM-DD):");
  const progress = 0; // تسک جدید پیشرفت صفر درصد داره

  // بررسی اینکه آیا اطلاعات وارد شده برای تسک معتبر است یا نه
  if (title && description && dueDate) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ title, description, dueDate, progress });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTasks();  // دوباره تسک‌ها رو رندر می‌کنیم
  } else {
    alert("لطفاً تمام اطلاعات را وارد کنید.");
  }
}

// فراخوانی اولیه برای رندر تسک‌ها
renderTasks();

// تابع رندر تسک‌ها
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
      <div class="progress-bar" style="width: ${task.progress}%;"></div>
      <p>پیشرفت: ${task.progress}%</p>
      <input type="date" value="${task.dueDate}" onchange="updateDueDate(event, '${task.title}')">
      <button onclick="removeTask('${task.title}')">حذف تسک</button>
    `;
    taskContainer.appendChild(taskElement);
  });
}
