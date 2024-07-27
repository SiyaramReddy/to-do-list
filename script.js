document.addEventListener('DOMContentLoaded', function() {
    const taskTitleInput = document.getElementById('task-title');
    const taskDescInput = document.getElementById('task-desc');
    const taskDateInput = document.getElementById('task-date');
    const taskPriorityInput = document.getElementById('task-priority');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task';
            if (task.completed) {
                taskItem.classList.add('completed');
            }

            const priorityClass = `priority-${task.priority.toLowerCase()}`;
            
            taskItem.innerHTML = `
                <div class="task-details">
                    <strong class="${priorityClass}">${task.title}</strong>
                    <p>${task.description}</p>
                    <small>Due: ${task.dueDate}</small>
                </div>
                <div class="task-actions">
                    <button class="complete-btn">✓</button>
                    <button class="delete-btn">✗</button>
                </div>
            `;

            taskItem.querySelector('.complete-btn').addEventListener('click', function() {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            });

            taskItem.querySelector('.delete-btn').addEventListener('click', function() {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            taskList.appendChild(taskItem);
        });
    }

    addTaskBtn.addEventListener('click', function() {
        const taskTitle = taskTitleInput.value.trim();
        const taskDesc = taskDescInput.value.trim();
        const taskDate = taskDateInput.value;
        const taskPriority = taskPriorityInput.value;

        if (taskTitle && taskDate) {
            tasks.push({
                title: taskTitle,
                description: taskDesc,
                dueDate: taskDate,
                priority: taskPriority,
                completed: false
            });
            saveTasks();
            renderTasks();
            taskTitleInput.value = '';
            taskDescInput.value = '';
            taskDateInput.value = '';
            taskPriorityInput.value = 'Low';
        }
    });

    renderTasks();
});
