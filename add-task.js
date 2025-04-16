document.getElementById('taskForm').addEventListener('submit', function(event) {
  event.preventDefault();  // جلوگیری از ارسال فرم به صورت پیش‌فرض

  // دریافت اطلاعات وارد شده
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('dueDate').value;
  const progress = document.getElementById('progress').value;

  // چک کردن اینکه ورودی‌ها خالی نباشند
  if (!title || !description || !dueDate || !progress) {
    alert("لطفاً تمام اطلاعات را وارد کنید.");
    return;
  }

  // تاریخ میلادی و شمسی
  const createdDateMiladi = new Date().toLocaleDateString();  // تاریخ میلادی
  const createdDateShamsi = convertToJalaali(new Date());    // تاریخ شمسی

  const task = {
    title,
    description,
    createdDateMiladi,
    createdDateShamsi,
    dueDate,
    progress: parseInt(progress)
  };

  // ذخیره تسک در localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // انتقال به صفحه اصلی بعد از ذخیره تسک
  window.location.href = 'index.html';
});

// تبدیل تاریخ میلادی به تاریخ شمسی
function convertToJalaali(date) {
  const jalaaliDate = jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
  return `${jalaaliDate.jy}/${jalaaliDate.jm}/${jalaaliDate.jd}`;
}
