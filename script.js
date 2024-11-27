// Get references to the input field, task list, switcher button, and switch icon
const inputField = document.getElementById("input");
const taskList = document.getElementById("taskList");
const switcher = document.getElementById('switcher');
const icon = document.getElementById('switchIcon');

// Load tasks and dark mode state from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks(); // Load saved tasks from local storage
    loadMode();  // Load saved dark mode state from local storage
});

// Function to toggle dark mode and save the state to local storage
function modeSwitch() {
    const isDarkMode = document.body.classList.toggle('dark-mode'); // Toggle dark mode class on the body
    if (isDarkMode) {
        icon.className = 'fa-solid fa-sun fa-xl'; // Change icon to sun
        icon.style.color = '#ffffff'; // Change icon color to white
    } else {
        icon.className = 'fa-solid fa-moon fa-rotate-by fa-xl'; // Change icon to moon
        icon.style.color = '#322f2f'; // Change icon color to dark
        icon.style.setProperty('--fa-rotate-angle', '335deg'); // Set rotation angle for moon icon
    }
    saveMode(isDarkMode); // Save the current mode to local storage
}

// Function to save the dark mode state to local storage
function saveMode(isDarkMode) {
    localStorage.setItem('darkMode', isDarkMode); // Save the dark mode state as a boolean
}

// Function to load the dark mode state from local storage
function loadMode() {
    const isDarkMode = JSON.parse(localStorage.getItem('darkMode')); // Retrieve the dark mode state from local storage
    if (isDarkMode) {
        document.body.classList.add('dark-mode'); // Apply dark mode class to the body
        icon.className = 'fa-solid fa-sun fa-xl'; // Change icon to sun
        icon.style.color = '#ffffff'; // Change icon color to white
    } else {
        document.body.classList.remove('dark-mode'); // Remove dark mode class from the body
        icon.className = 'fa-solid fa-moon fa-rotate-by fa-xl'; // Change icon to moon
        icon.style.color = '#322f2f'; // Change icon color to dark
        icon.style.setProperty('--fa-rotate-angle', '335deg'); // Set rotation angle for moon icon
    }
}

// Function to handle task submission
function submitTask() {
    const taskValue = inputField.value.trim(); // Get the task value from the input field
    if (taskValue === '') {
        alert("Empty field"); // Alert if the input field is empty
        return;
    }
    createItem(taskValue); // Create a new task item
    saveTask(taskValue); // Save the task to local storage
}

// Set the background gradient for the task list
taskList.style.background = 'linear-gradient(to bottom, #FFFF00, #A7CD3A)';

// Function to create a new task item
function createItem(task, isCompleted = false) {
    const taskItem = document.createElement('div'); // Create a div for the task item
    taskItem.style.display = 'flex';
    taskItem.style.flexDirection = 'column';
    taskItem.style.overflow = 'hidden';
    taskItem.style.textOverflow = 'ellipsis';
    taskItem.style.whiteSpace = 'pre-wrap';
    taskItem.style.wordBreak = 'break-word';
    taskItem.style.color = '#181a1b';
    taskItem.style.fontWeight = 'bold';
    taskItem.style.padding = '10px';
    taskItem.style.borderRadius = '8px';

    const taskContainer = document.createElement('div'); // Create a container for the task text and buttons
    taskContainer.style.display = 'flex';
    taskContainer.style.alignItems = 'center';

    const taskText = document.createElement('span'); // Create a span for the task text
    taskText.textContent = task;
    if (isCompleted) {
        taskText.style.textDecoration = 'line-through'; // Strike through if the task is completed
    }

    const checkButton = document.createElement('button'); // Create a button to mark the task as completed
    checkButton.innerHTML = isCompleted
        ? '<i class="fa-solid fa-circle-check fa-2x"></i>'
        : '<i class="fa-regular fa-circle-check fa-2x"></i>';
    checkButton.className = 'checkButton';
    checkButton.style.backgroundColor = 'transparent';
    checkButton.style.border = 'none';
    checkButton.style.cursor = 'pointer';
    checkButton.style.marginLeft = '10px';
    checkButton.querySelector('i').style.color = isCompleted ? '#313435' : '#313435';

    // Add event listener to the check button to toggle task completion
    checkButton.addEventListener('click', function () {
        checkItem(taskText, checkButton);
        updateTaskStatus(task, taskText.style.textDecoration === 'line-through');
    });

    taskContainer.appendChild(checkButton); // Add the check button to the task container
    taskContainer.appendChild(taskText); // Add the task text to the task container

    const btnContainer = document.createElement('div'); // Create a container for the edit and delete buttons
    btnContainer.style.display = 'flex';
    btnContainer.style.flexDirection = 'row';
    btnContainer.style.marginTop = '10px';

    const editBtn = document.createElement('button'); // Create an edit button
    editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>Edit';
    editBtn.className = 'buttons';
    editBtn.addEventListener('click', function () {
        editTask(taskText, task);
    });

    const deleteBtn = document.createElement('button'); // Create a delete button
    deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>Delete';
    deleteBtn.className = 'buttons';
    deleteBtn.addEventListener('click', function () {
        taskList.removeChild(taskItem); // Remove the task item from the list
        deleteTask(task); // Delete the task from local storage
    });

    btnContainer.appendChild(editBtn); // Add the edit button to the button container
    btnContainer.appendChild(deleteBtn); // Add the delete button to the button container

    taskItem.appendChild(taskContainer); // Add the task container to the task item
    taskItem.appendChild(btnContainer); // Add the button container to the task item

    taskList.insertBefore(taskItem, taskList.firstChild); // Add the task item to the task list
    inputField.value = ''; // Clear the input field
}

// Function to toggle task completion
function checkItem(taskText, checkButton) {
    if (taskText.style.textDecoration === 'line-through') {
        taskText.style.textDecoration = 'none'; // Remove strike through
        checkButton.innerHTML = '<i class="fa-regular fa-circle-check fa-2x"></i>';
        checkButton.querySelector('i').style.color = '#313435';
    } else {
        taskText.style.textDecoration = 'line-through'; // Add strike through
        checkButton.innerHTML = '<i class="fa-solid fa-circle-check fa-2x"></i>';
        checkButton.querySelector('i').style.color = '#313435';
    }
}


// Function to edit a task
function editTask(taskText, oldTask) {
    const currentTask = taskText.textContent.trim(); // Get the current task text
    const newTask = prompt("Modify your task:", currentTask); // Prompt the user to enter a new task
    if (newTask !== null && newTask.trim() !== '') {
        taskText.textContent = newTask; // Update the task text
        updateTask(oldTask, newTask); // Update the task in local storage
    }
}

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Get tasks from local storage
    tasks.forEach(({ task, isCompleted }) => {
        createItem(task, isCompleted); // Create task items for each task
    });
}

// Function to save a task to local storage
function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Get tasks from local storage
    tasks.push({ task, isCompleted: false }); // Add the new task to the list
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save the updated list to local storage
}

// Function to delete a task from local storage
function deleteTask(taskToDelete) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Get tasks from local storage
    const updatedTasks = tasks.filter(({ task }) => task !== taskToDelete); // Remove the task from the list
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save the updated list to local storage
}

// Function to update the completion status of a task in local storage
function updateTaskStatus(taskToUpdate, isCompleted) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Get tasks from local storage
    const updatedTasks = tasks.map(task => 
        task.task === taskToUpdate ? { ...task, isCompleted } : task
    ); // Update the completion status of the task
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save the updated list to local storage
}

// Function to update a task in local storage
function updateTask(oldTask, newTask) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Get tasks from local storage
    const updatedTasks = tasks.map(task =>
        task.task === oldTask ? { ...task, task: newTask } : task
    ); // Update the task text
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save the updated list to local storage
}
