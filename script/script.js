const form = document.getElementById('form');
const taskInput = document.getElementById('taskAdded'); 
const tasks = document.getElementById('tasks');

document.addEventListener('DOMContentLoaded', loadTasks);
form.addEventListener('submit', addTask);

function sortTasks() {
    const list = Array.from(tasks.children);
    const sorted = list.sort((a, b) => {
        const aText = a.querySelector('p').innerText.toLowerCase();
        const bText = b.querySelector('p').innerText.toLowerCase();
        return aText.localeCompare(bText);
    });
    tasks.innerHTML = '';

    sorted.forEach(task => {
        tasks.appendChild(task);
    });

    taskTLS();
}

function addTask(e) {
    e.preventDefault();
    if (taskInput.value.trim() === '') {
        return;
    }

    const task = {
        id: Date.now(),
        name: taskInput.value,
        createdDate: new Date().toISOString(),
        completed: false
    };

    const taskElement = document.createElement('li');
    taskElement.dataset.id = task.id;
    taskElement.innerHTML = `
        <input type="checkbox">
        <p>${task.name}</p>
        <button type="button">X</button>
    `;

    taskElement.querySelector('input[type="checkbox"]').addEventListener('change', toggleDone);
    taskElement.querySelector('button').addEventListener('click', removeTask);

    tasks.appendChild(taskElement);
    taskInput.value = '';

    taskTLS();
    sortTasks();
}
