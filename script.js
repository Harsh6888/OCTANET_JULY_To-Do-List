const form = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let tasks = [];

// Check if tasks are stored in localStorage
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    displayTasks();
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    addTask(taskInput.value);
    taskInput.value = '';
});

function addTask(taskName) {
    if (taskName.trim() !== '') {
        const task = {
            id: Date.now(),
            name: taskName,
            completed: false
        };
        tasks.push(task);
        saveTasks();
        displayTasks();
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);
        li.innerHTML = `
            <span>${task.name}</span>
            <div>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="done" onclick="toggleTask(${task.id})">${task.completed ? 'Undo' : 'Done'}</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function toggleTask(id) {
    const selectedTask = tasks.find(task => task.id === id);
    if (selectedTask) {
        selectedTask.completed = !selectedTask.completed;
        saveTasks();
        displayTasks();
    }
}

function editTask(id) {
    const selectedTask = tasks.find(task => task.id === id);
    if (selectedTask) {
        const newName = prompt('Edit task:', selectedTask.name);
        if (newName !== null) {
            selectedTask.name = newName;
            saveTasks();
            displayTasks();
        }
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    displayTasks();
}
