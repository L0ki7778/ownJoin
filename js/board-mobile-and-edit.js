/**
 * Start the editing process of the current task.
 *
 */
function startEdit() {
    editCurrentTodo(editTask); //empties the popup and renders an editable task; board_editing-components.js: 2
    writeDescription(editTask) // deploys existing description as input-value within the textarea
}


/**
 * Clears the task lists by resetting the finished subtasks and subtasks arrays.
 *
 */
function clearTasks() {
    finishedSubTasks = []
    subTasks = []
}


/**
 * Deploys existing description as input-value within the textarea
 *
 * @param {object} task - The task object containing the description.
 * @return {undefined}
 */
function writeDescription(task) {
    let description = document.getElementById("description");
    let value = task.description;
    description.innerHTML = value;
}


/**
 * Corresponding function to addTask. Edits the status of a task at a specific index with a given priority.
 *
 * @param {boolean} status - The new status of the task ("OK" or not)
 * @param {number} index - The index of the task to be edited
 * @param {number} prio - The priority level of the task
 */
function editOk(status, index, prio) {
    editTodoInAllTasks(status, index, prio);
    closePopUp();
    updateBoard();
    hideExcessElements();
}

/**
 * Specific checkBoxClick function for sub-task boxes
 * Moves subtasks from subtasks array to finishedSubTasks array
 * and vice versa.
 *
 * @param {number} i - The index of the sub box.
 */
function subBoxClick(i) {
    let checkbox = document.getElementById(`check${i}`);
    let img = document.getElementById(`img-box${i}`);
    subCheckBox(checkbox, img);
}


/**
 * Toggles the state of a checkbox and updates the corresponding image.
 * Updating the subtask counter for finished-subtasks-logic.
 * data-counter = 1 --> task is finished
 * data-counter = 0 --> task is not finished
 *
 * @param {HTMLInputElement} box - The checkbox element.
 * @param {HTMLImageElement} img - The image element to be updated.
 */
function subCheckBox(box, img) {
    if (box.checked) {
        box.checked = false;
        img.src = '/assets/img/checkbox.png';
        img.style = "";
        img.setAttribute('data-counter', '0');
    } else if (!box.checked) {
        box.checked = true;
        img.src = '/assets/img/checked-box.png';
        img.style = 'width: 0.9rem;height: .9rem';
        img.setAttribute('data-counter', '1');
    }
}


/**
 * Looks for changes in the sub-checkboxes and updates the corresponding sub-tasks.
 * Gets the data-counter attribute and compares it to 1 or 0.
 * Push tasks to corresponding arrays and updates the specific task.
 *
 */
function lookForSubChange() {
    let checkbox = document.getElementsByClassName('sub-checkbox')
    let subText = document.getElementsByClassName('sub-text')
    for (let i = 0; i < checkbox.length; i++) {
        let check = checkbox[i];
        let text = subText[i];
        if (check.getAttribute('data-counter') === '1') {
            finishedSubTasks.push(text.innerText)
        } else if (check.getAttribute('data-counter') === '0') {
            subTasks.push(text.innerText)
        }
    }
    safeSubTasks()
}


/**
 * Updates the subtasks of a task and refreshes the progress bar.
 * Updated subtasks get saved and sent to the remote storage.
 * Progress bar gets refreshed.
 *
 * @param {Element} newSubs - The DOM element representing the subtask list.
 */
function safeSubTasks() {
    let newSubs = document.getElementById('subtask-list');
    let id = newSubs.getAttribute('data-id');
    let index = allTasks.findIndex(task => task.id == id);
    let task = allTasks[index];
    task.subTask = subTasks;
    task.finishedTaskList = finishedSubTasks;
    task.counter = finishedSubTasks.length;
    setAllTasks(tasksKey, allTasks);
    subTasks = [];
    finishedSubTasks = [];
    refreshProgressBar(id, task)
}


/**
 * Updates the progress bar and task counters for a given task.
 *
 * @param {string} id - The ID of the progress bar element.
 * @param {Object} task - The task object containing information about the task.
 */
function refreshProgressBar(id, task) {
    let bar = document.getElementById(`progress${id}`);
    let counter = document.getElementById(`counter${task.id}`);
    let length = document.getElementById(`length${task.id}`);
    let max = task.totalSubTasks;
    let min = task.finishedTaskList.length;
    let width = Math.round((min / max) * 100);
    counter.innerHTML = min;
    length.innerHTML = "/" + max;
    setTimeout(() => {
        bar.setAttribute('style', `width: ${width}%`)
    }, 500);
}


/**
 * Calculates the initial progress width of a task.
 *
 * @param {object} task - The task object containing totalSubTasks and finishedTaskList.
 * @return {number} The initial progress width as a percentage.
 */
function initialProgressWidth(task) {
    let max = task.totalSubTasks;
    let min = task.finishedTaskList.length;
    let width = Math.round((min / max) * 100);
    return width
}



/**
 * Opens the popup menu for the mobile "drag and drop".
 * 
 */
function openMoveTaskMenu() {
    let div = document.getElementById('moveButtons');
    let btn = document.getElementById('openMoveTaskMenu');
    div.classList.remove('d-none');
    div.classList.add('d-flex');
    btn.classList.add('d-none');
}
/**
 * Closes the popup menu for the mobile "drag and drop".
 * 
 */
function closeMoveTaskMenu() {
    let div = document.getElementById('moveButtons');
    let btn = document.getElementById('openMoveTaskMenu');
    div.classList.add('d-none');
    div.classList.remove('d-flex');
    btn.classList.remove('d-none');
}
/**
 * Moves the Task from its current status to 'Await-Feedback'.
 * 
 * @param {string} id = The id of the current task. 
 */
async function moveTaskToFeedback(id) {
    let newStatus = 'Await-Feedback';
    allTasks[id].status = newStatus;
    await setAllTasks(tasksKey, allTasks);
    closePopUp();
    updateBoard();
    hideExcessElements();
}
/**
 * Moves the Task from its current status to 'In-Progress'.
 * 
 * @param {string} id = The id of the current task. 
 */
async function moveTaskToInProgress(id) {
    let newStatus = 'In-Progress';
    allTasks[id].status = newStatus;
    await setAllTasks(tasksKey, allTasks);
    closePopUp();
    updateBoard();
    hideExcessElements();
}
/**
 * Moves the Task from its current status to 'To-Do'.
 * 
 * @param {string} id = The id of the current task. 
 */
async function moveTaskToToDo(id) {
    let newStatus = 'To-Do';
    allTasks[id].status = newStatus;
    await setAllTasks(tasksKey, allTasks);
    closePopUp();
    updateBoard();
    hideExcessElements();
}
/**
 * Moves the Task from its current status to 'Done'.
 * 
 * @param {string} id = The id of the current task. 
 */
async function moveTaskToDone(id) {
    let newStatus = 'Done';
    allTasks[id].status = newStatus;
    await setAllTasks(tasksKey, allTasks);
    closePopUp();
    updateBoard();
    hideExcessElements();
}
