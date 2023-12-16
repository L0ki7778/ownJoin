/**
 * Initializes the application by fetching all tasks, contacts, and user information,
 * rendering components, and updating the board.
 *
 * @return {Promise} A promise that resolves when the initialization is complete.
 */
async function init() {
    await getAllTasks(tasksKey);
    await getContacts(contactKey);
    getUser(sessionKey);
    renderComponents(activeUser);
    navActive(2);
    updateBoard();
}


/**
 * Updates the board based on the provided search array.
 *
 * @param {Array} searchArr - The array to be used for filtering the tasks. If not provided, allTasks will be used.
 *                          - usecase for searchArr is to search for a specific task using the Find-Task input
 * @return {undefined} This function does not return a value.
 */
function updateBoard(searchArr) {
    const fliterArr = searchArr || allTasks;
    taskFilter(fliterArr, "To-Do", todoArr);
    taskFilter(fliterArr, "In-Progress", progressArr)
    taskFilter(fliterArr, "Await-Feedback", awaitArr);
    taskFilter(fliterArr, "Done", doneArr);
    checkDragArea();
    hideBar();
    renderTodoIcons()
}


/**
 * Filters an array based on a given string and updates the HTML of an element with the filtered results.
 *
 * @param {Array} arr - The array to filter.
 * @param {string} string - The string to filter by.
 * @return {Array} - The filtered array.
 */
function taskFilter(arr, string) {
    let statusArr = arr.filter(e => e.status == string);
    document.getElementById(string).innerHTML = '';
    for (let i = 0; i < statusArr.length; i++) {
        const element = statusArr[i];
        document.getElementById(string).innerHTML += generateTodoHTML(element)
    }
    return parentArr = statusArr
}


/**
 * Sets the current dragged element to the given ID.
 *
 * @param {string} id - The ID of the element being dragged.
 */
function startDragging(id) {
    currentDraggedElement = id;
}


/**
 * sets a specific area to be able to get dropped elements
 *
 * @param {type} ev - description of parameter
 * @return {type} description of return value
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * Moves the dragged element to the given status.
 *
 * @param {string} status - The status to move the element to.
 */
async function moveTo(status) {
    const draggedTask = allTasks.find(task => task.id === currentDraggedElement);

    if (draggedTask) {
        setTimeout(() => {
            draggedTask.status = status; //after dragging a task to another "status", the task gets the new status
            draggedTask.id = Date.now(); //after dragging a task, the task gets a timestamp as new id
            sortArray(); // the latest task(timestamp) gets the last position; board.js:123
            setAllTasks(tasksKey, allTasks); // update the tasks and send them to remote storage; script.js:186
            updateBoard();//the board gets updated immediately after the drop; board.js:24
            hideBar(); //if no subtasks exist within a todo/task, the progressbar gets hidden; board.js:137
        }, 50);
    }
}


/**
 * Highlights the empty dragarea with the specified ID by adding the 'drag-area-highlight' class.
 *
 * @param {string} id - The ID of the element to highlight.
 */
function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}


/**
 * Remove the 'drag-area-highlight' class from the element with the given id.
 *
 * @param {string} id - The id of the element to remove the class from.
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}



/**
 * Sorts the array of tasks based on their ID in ascending order.
 *
 * @param {Array} allTasks - The array of tasks to be sorted.
 * @return {Array} The sorted array of tasks.
 */
function sortArray() {
    return allTasks.sort((a, b) => a.id - b.id)
}


/**
 * Converts a category string into a hyphenated format.
 * For example, "Technical Task" will be converted to "technical-task".
 * Usecase-function: gernerateVarObj(); board.js: 255
 *
 * @param {object} element - The element containing the category string.
 * @return {string} The hyphenated category string.
 */
function convertCategory(element) {
    let categories = element.category.split(' ');
    let capitalizedCategories = categories.map((category) => {
        return category.charAt(0).toLowerCase() + category.slice(1);
    });
    let category = capitalizedCategories.join('-');
    return category;
}


/**
 * Hides the `sub` bar for tasks that have no subtasks.
 *
 * @param {Array} allTasks - The array of all tasks.
 */
function hideBar() {
    for (let i = 0; i < allTasks.length; i++) {
        let element = allTasks[i];
        if (element.totalSubTasks === 0) {
            let bar = document.getElementById(`sub${element.id}`);
            if (bar) {
                bar.classList.add('d-none')
            }
        }
    }
}


/**
 * Closes the pop-up window by clearing tasks, hiding the pop-up element, and resetting the pop-up container.
 *
 */
function closePopUp() {
    clearTasks()
    let popup = document.getElementById('add-pop-up');
    let container = document.getElementById('pop-up-container');
    container.style.animation = "slide-out 0.15s ease-in-out forwards"
    setTimeout(() => {
        popup.classList.add('d-none')
        container.style.animation = "";
        container.innerHTML = "";
    }, 150);
}


/**
 * Opens a pop-up for adding a task.
 * Clears the pop-up through overriding the content of
 * the pop-up container.
 * Turns the pop-up visible.
 * Adds input event listeners for coloring of inputfields
 * and adding subtasks-enter-keyEvent
 *
 */
function openPopUp() {
    renderPopUpAddTask()
    let popup = document.getElementById('add-pop-up');
    popup.classList.remove('d-none');
    addInputHandler(); // adds the input event; add_task.js: 340
    addSubtaskListener(); //adds the key.event; add_task.js: 305
}


/**
 * Opens a pop-up for showing a single task in detail.
 * Clears the pop-up through overriding the content of
 * the pop-up container.
 *
 * @param {number} id - The id of the todo.
 */
function openTodoPopup(id) {
    renderSingleTodo(id); // render-function-delivering the necessary HTML; board-components.js: 150
    let popup = document.getElementById('add-pop-up');
    popup.classList.remove('d-none')
}


/**
 * Deletes a task from the list of all tasks based on the provided ID.
 *
 * @param {number} id - The ID of the task to be deleted.
 * @return {Promise<void>} - A promise that resolves after the task is deleted.
 */
async function deleteTask(id) {
    let object = allTasks.find((task) => task.id == id);

    if (object) {
        let index = allTasks.indexOf(object);
        allTasks.splice(index, 1);
    }
    await setAllTasks(tasksKey, allTasks);
    closePopUp(); //board.js: 169
    updateBoard(); //board.js: 24
}


/**
 * Sets the onclick attribute of the 'createTaskButton' 
 * element to call the 'addTask' function with the 
 * given string as a parameter.
 * This way, every task/todo, created within a specific category
 * will created with the same category.
 *
 * @param {string} string - The string to be passed as a parameter to the 'addTask' function.
 */
function changeStatus(string) {
    let btn = document.getElementById('createTaskButton')
    btn.setAttribute('onclick', `addTask('${string}')`)
}


/**
 * Checks the drag area for specific content and updates the styling accordingly.
 *
 */
function checkDragArea() {
    let dragArea = document.getElementsByClassName('drag-area')
    for (let i = 0; i < dragArea.length; i++) {
        if (dragArea[i].innerHTML.includes('Technical Task') || dragArea[i].innerHTML.includes('User Story')) {
            if (dragArea[i].firstElementChild) {
                dragArea[i].style = 'justify-content: flex-start';
                dragArea[i].style = 'border:none;background-color: transparent;border-radius:3rem;justify-content: flex-start'
            }
        } else {
            dragArea[i].style = '';
            dragArea[i].innerText = 'No tasks to do';
        }
    }
}

/////////////////////////Do-not-touch////////////////////////////////
// /**
//  * Adds assignees to the task and returns an array of their IDs.
//  *
//  * @return {Array} An array of IDs of the assigned tasks.
//  */
// function addAssignees() {
//     let idArr = [];
//     for (let i = 0; i < assignees.length; i++) {
//         idArr.push(allTasks[assignees[i]].id)
//     }
//     return idArr
// }
/////////////////////Please-wait-and-look-for-occuring-errors////////////////


/**
 * Adds a search bar handler to the page.
 * Filters all tasks based on the search term.
 * and updates the board accordingly.
 */
function addSearchBarHandler() {
    let input = document.getElementById("find-task");
    function search() {
        let searchTerm = input.value.toLowerCase();
        let filteredTasks = allTasks.filter(task => {
            let title = task.title.toLowerCase();
            let description = task.description.toLowerCase();
            return title.includes(searchTerm) || description.includes(searchTerm);
        });
        updateBoard(filteredTasks);
    }
    input.oninput = search;
}


/**
 * Focuses the input element with the id "find-task".
 * onclick-function for magnifying glass
 */
function focusInput() {rentTodo
    let input = document.getElementById("find-task");
    input.focus();
}


/**
 * Generates a variable object based on the provided input object.
 * The converted object is needed within the rednerSingleTodo function; board-components.js: 150
 *
 * @param {object} obj - The input object containing properties like description, date, prio, and category.
 * @return {object} The generated variable object with properties like text, date, priority, and category.
 */
function generateVarObj(obj) {
    let todoObject = {
        text: obj.description.split('\n').join('<br/>'),
        date: obj.date.split('-').reverse().join('/'),
        priority: obj.prio.slice(0, 1).toUpperCase() + obj.prio.slice(1),
        category: convertCategory(obj)
    }
    return todoObject, editTaskObj = todoObject
}


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
    console.log(width)
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