document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const dateInput = document.getElementById('date-input');
    const timeInput = document.getElementById('time-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const currentDate = document.getElementById('current-date');
    const currentTime = document.getElementById('current-time');

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task.text, task.date, task.time, task.completed));
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(item => {
            tasks.push({
                text: item.querySelector('.task-text').textContent,
                date: item.querySelector('.task-date').textContent,
                time: item.querySelector('.task-time').textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add a task to the list
    const addTask = (text, date, time, completed = false) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        if (completed) taskItem.classList.add('completed');

        const taskDetails = document.createElement('div');
        taskDetails.className = 'task-details';

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = text;
        taskDetails.appendChild(taskText);

        const taskDate = document.createElement('span');
        taskDate.className = 'task-date';
        taskDate.textContent = date;
        taskDetails.appendChild(taskDate);

        const taskTime = document.createElement('span');
        taskTime.className = 'task-time';
        taskTime.textContent = time;
        taskDetails.appendChild(taskTime);

        taskItem.appendChild(taskDetails);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            taskItem.remove();
            saveTasks();
        });
        taskItem.appendChild(deleteBtn);

        taskText.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            saveTasks();
        });

        taskList.appendChild(taskItem);
        saveTasks();
    };

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const taskDate = dateInput.value;
        const taskTime = timeInput.value;
        if (taskText !== '' && taskDate !== '' && taskTime !== '') {
            addTask(taskText, taskDate, taskTime);
            taskInput.value = '';
            dateInput.value = '';
            timeInput.value = '';
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    loadTasks();

    // Update the date and time
    const updateDateTime = () => {
        const now = new Date();
        currentDate.textContent = now.toLocaleDateString();
        currentTime.textContent = now.toLocaleTimeString();
    };

    updateDateTime();
    setInterval(updateDateTime, 1000);
});
