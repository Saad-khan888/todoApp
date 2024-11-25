
const inputField = document.getElementById("input");
const taskList = document.getElementById("taskList");
const switcher = document.getElementById('switcher');

function modeSwitch() {
    document.body.classList.toggle('dark-mode');
    if(modeSwitch== true){
        console.log('working');
        
    } else{
        log.console('f')
    }
}

function submitTask() {
    const taskValue = inputField.value.trim();
    if (taskValue === '') {
        alert("Empty field");
        return;
    }
    createItem(taskValue);
}

taskList.style.background = 'linear-gradient(to bottom, #FFFF00, #A7CD3A)';

function createItem(task) {
    // Create the main container for the task item
    const taskItem = document.createElement('div');
    taskItem.style.display = 'flex';
    taskItem.style.flexDirection = 'column';
    taskItem.style.overflow = 'hidden';
    taskItem.style.textOverflow = 'ellipsis';
    taskItem.style.whiteSpace = 'pre-wrap';
    taskItem.style.wordBreak = 'break-word';
    taskItem.style.color = 'white';
    taskItem.style.padding = '10px';
    taskItem.style.borderRadius = '8px';
    
    // Create a container for the task text and check button
    const taskContainer = document.createElement('div');
    taskContainer.style.display = 'flex';
    taskContainer.style.alignItems = 'center';
    
    // Create a span for the task text
    const taskText = document.createElement('span');
    taskText.textContent = task;

    // Create the check button
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fa-regular fa-circle-check fa-2x"></i>'; // Use larger size
    checkButton.className = 'checkButton';
    checkButton.style.backgroundColor = 'transparent'; // Remove background color
    checkButton.style.border = 'none'; // Remove border
    checkButton.style.cursor = 'pointer'; // Change cursor to pointer
    checkButton.style.marginLeft = '10px'; // Add some space between text and button
    checkButton.addEventListener('click', function() {
        checkItem(taskText, checkButton); // Pass the taskText span instead of taskItem
    });

    // Append the task text and check button to the task container
    taskContainer.appendChild(checkButton);
    taskContainer.appendChild(taskText);
    
    // Create the container for other buttons
    const btnContainer = document.createElement('div');
    btnContainer.style.display = 'flex';
    btnContainer.style.flexDirection = 'row';
    btnContainer.style.marginTop = '10px';

    // Create the edit button
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>' + 'Edit';
    editBtn.className = 'buttons';
    editBtn.addEventListener('click', function() {
        editTask(taskText);
    });

    // Create the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>' + 'Delete';
    deleteBtn.className = 'buttons';
    deleteBtn.addEventListener('click', function() {
        taskList.removeChild(taskItem);
    });

    // Append buttons to the button container
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    // Append the task container first, then the button container to the task item
    taskItem.appendChild(taskContainer);
    taskItem.appendChild(btnContainer);

    // Append the task item as the first child of the task list
    taskList.insertBefore(taskItem, taskList.firstChild);

    // Clear the input field
    inputField.value = '';
}

function checkItem(taskText, checkButton) {
    if (taskText.style.textDecoration === 'line-through') {
        taskText.style.textDecoration = 'none';
        taskText.style.marginTop = '2px';
        checkButton.innerHTML = '<i class="fa-regular fa-circle-check fa-2x"></i>'; 
        checkButton.querySelector('i').style.color = 'black'; // Set the color to black
    } else {
        taskText.style.textDecoration = 'line-through';
        checkButton.innerHTML = '<i class="fa-solid fa-circle-check fa-2x"></i>';
        checkButton.querySelector('i').style.color = 'black'; // Set the color to black
    }
}

function editTask(taskText) {
    const currentTask = taskText.textContent.trim();
    const newTask = prompt("Modify your task:", currentTask);
    if (newTask !== null && newTask.trim() !== '') {
        taskText.textContent = newTask;
    }
}
