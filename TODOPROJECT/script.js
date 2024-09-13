document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    const addTaskButton = document.getElementById('addTaskButton');
    const updateTaskButton = document.getElementById('updateTaskButton');
    const editForm = document.getElementById('editForm');
    let currentTaskId = null;

    // Fetch tasks and display them
    function fetchTasks() {
        fetch('https://to-do-api-ij68.onrender.com/tasks')
            .then(response => response.json())
            .then(data => {
                taskList.innerHTML = '';
                data.tasks.forEach(task => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <h3>${task.title}</h3>
                        <p>${task.description}</p>
                        <button class="delete" onclick="deleteTask(${task.id})">Изтрий</button>
                    `;
                    taskList.appendChild(li);
                });
            });
    }

    // Add a new task
    addTaskButton.addEventListener('click', () => {
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;

        fetch('https://to-do-api-ij68.onrender.com/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        })
        .then(response => response.json())
        .then(() => {
            fetchTasks();
            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDescription').value = '';
        });
    });

    // Edit a task
    window.editTask = function(taskId) {
        fetch(`https://to-do-api-ij68.onrender.com/tasks/${taskId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('editTitle').value = data.task.title;
                document.getElementById('editDescription').value = data.task.description;
                currentTaskId = taskId;
                editForm.style.display = 'block';
            });
    }

    // Update a task
    updateTaskButton.addEventListener('click', () => {
        const title = document.getElementById('editTitle').value;
        const description = document.getElementById('editDescription').value;

        fetch(`https://to-do-api-ij68.onrender.com/tasks/${currentTaskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        })
        .then(response => response.json())
        .then(() => {
            fetchTasks();
            editForm.style.display = 'none';
            currentTaskId = null;
        });
    });

    // Mark a task as done
    window.markTaskDone = function(taskId) {
        fetch(`https://to-do-api-ij68.onrender.com//tasks/${taskId}/done`, {
            method: 'PUT'
        })
        .then(() => fetchTasks());
    }

    // Delete a task
    window.deleteTask = function(taskId) {
        fetch(`https://to-do-api-ij68.onrender.com/tasks/${taskId}`, {
            method: 'DELETE'
        })
        .then(() => fetchTasks());
    }

    // Initial fetch
    fetchTasks();
});
