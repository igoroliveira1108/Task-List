// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks)
    // Add Task Event
    form.addEventListener('submit', addTask);
    // Remove Task Event
    taskList.addEventListener('click', removeTask)
    // Clear All Task Event
    clearBtn.addEventListener("click", removeAllTask)
   // Filter Tasks Event
   filter.addEventListener('keyup', filterTasks)
}

// Get Tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(task => {
        // Create li Element
        const li = document.createElement('li');
        // Add a class to li tag
        li.className = 'collection-item'; 
        // Create text node and append to li
        li.appendChild(document.createTextNode(task)) 
        // Create new link Element - Remove
        const link = document.createElement('a');
        // Add a class to a tag
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fas fa-trash-alt"></i>'
        // Append link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li)
    })
}

// Add Task
function addTask(e){

    e.preventDefault();

    if(taskInput.value === ''){
        alert('Add a Task')
    } 
        // Create li Element
    const li = document.createElement('li');
    // Add a class to li tag
    li.className = 'collection-item'; 
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value)) 
    // Create new link Element - Remove
    const link = document.createElement('a');
     // Add a class to a tag
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fas fa-trash-alt"></i>'
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li)

    //Store in LS
    storeTaskInLocalStorage(taskInput.value);

    // Clear taskInput
    taskInput.value = '';

}

// Store Task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Você tem certeza?'))
        e.target.parentElement.parentElement.remove();
        // Remove from LS
        removeTaskfromLocalStorage(e.target.parentElement.parentElement);
    }
}

// Remove from LS
function removeTaskfromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Clear All Tasks
function removeAllTask(){
    /*  - First way to do it */
    // taskList.innerHTML = '';

    // Second way
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }

    // Clear from LS
    clearTasksfromLocalStorage();
}

    // Clear All Tasks from LS
 function clearTasksfromLocalStorage(){
    localStorage.clear();
 }

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach((task)=>{
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

