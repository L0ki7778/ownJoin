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
    hideExcessElements();
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
    renderTodoIcons();
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
    let divs = document.querySelectorAll(".no-tasks");
    let areas = document.querySelectorAll(".drag-area");
    
    divs.forEach(div => div.parentNode.removeChild(div));

    areas.forEach(area => {
        area.style = '';
        area.style.justifyContent = 'flex-start';
    });
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
            hideExcessElements();
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
    clearTasks();
    let popup = document.getElementById('add-pop-up');
    let container = document.getElementById('pop-up-container');
    let body = document.querySelector("body");
    body.removeEventListener("click", handleClickAssign);
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
    let dragAreas = document.getElementsByClassName('drag-area');
    for (let i = 0; i < dragAreas.length; i++) {
        if (dragAreas[i].innerHTML.includes('Technical Task') || dragAreas[i].innerHTML.includes('User Story')) {
            if (dragAreas[i].firstElementChild) {
                dragAreas[i].style = 'justify-content: flex-start; border:none; background-color: transparent; border-radius:3rem;';}
        } else {
            dragAreas[i].style = '';
            if (!dragAreas[i].querySelector('.no-task')) {
                let div = document.createElement('div');
                div.classList.add('no-tasks');
                div.innerText = "No tasks to do";
                dragAreas[i].appendChild(div);
            }
        }
    }
}


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
        hideExcessElements();
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
 * Hides the elements in the assigne container of the tasks if there are more than 5.
 * Shows the excess elements as + and the number.
 * 
 */
function hideExcessElements() {
    let containers = document.querySelectorAll('.profile-initials-container');
    let existingContacts=[];
    containers.forEach(function(container) {
      let dataValue = container.getAttribute('data-value');
      let elements = dataValue.split(',').map(function(item) {
        return item.trim();
      });
      let countSpan = container.querySelector(`span[id^="hidden-elements-count"]`);
  
      if (!countSpan) {
        countSpan = document.createElement('span');
        countSpan.id = 'hidden-elements-count' + container.id.replace('footer', '');
        container.parentNode.insertBefore(countSpan, container.nextSibling);
      }
      elements.forEach((e,i)=>{if(contacts[i] && contacts[i].id == e){if(!existingContacts.includes(e)){existingContacts.push(e)}}})
      if (existingContacts.length > 5) {
        for (let i = 5; i < elements.length; i++) {
          container.children[i].style.display = 'none';
        }
        let hiddenElementsCount = elements.length - 5;
        countSpan.textContent = hiddenElementsCount > 0 ? '+' + hiddenElementsCount : '';
      } else {
        countSpan.textContent = '';
      }
    });
  }