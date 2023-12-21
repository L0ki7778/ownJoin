/**
 * Array wich contains the priority of an created Task
 */
let prioArray = [];

/**
 * Initializes the application by performing the necessary setup tasks.
 *
 * @return {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function init() {
  await getAllTasks(tasksKey);
  await getContacts(contactKey);
  getUser(sessionKey);
  renderAddTaskPage(activeUser);
  navActive(1);
  addAssigneesSelection();
  addInputHandler();
  addSubtaskListener();
  clickMedium('medium')
}

/**
 * Renders the task creation page for the active user.
 * 
 * @param {any} activeUser - The active user object.
 */
function renderAddTaskPage(activeUser) {
  let header = document.querySelector('header');
  let nav = document.querySelector('nav');
  let taskContainer = document.createElement('div')
  taskContainer.id = 'task-container'
  header.innerHTML = renderHeader(activeUser);
  nav.innerHTML = renderNavBar();
  document.querySelector('main').append(taskContainer);
  taskContainer.innerHTML = renderAddTaskSections()
}

/**
 * Pushes the created task into the 'allTasks' array.
 * 
 * @param {string} status - The status of the task.
 */
async function addTask(status) {
  let title = document.getElementById("title").value;
  let taskArr;
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let prio = getPrioValue();
  let category = document.getElementById("category").value;
  let task = createNewTaskObject(title, taskArr, description, date, prio, category, status);
  allTasks.push(task);
  await setAllTasks(tasksKey, allTasks);
  assignees = [];
  subTasks = [];
  let btn = document.getElementById('createTaskButton');
  btn.disabled = true
  pushInfo();
}


/**
 * Creates a new task by taking the value of the inputfields.
 * 
 * @param {string} title - This is the 'title' value.
 * @param {string} taskArr - ?
 * @param {string} description - This is the 'description' value.
 * @param {string} date - This is the 'date' value.
 * @param {string} prio - This is the 'prio' value.
 * @param {string} category - This is the 'category' value.
 * @param {string} status - This is the 'status' value.
 * @returns 
 */
function createNewTaskObject(title, taskArr, description, date, prio, category, status) {
  let task = {
    title: title,
    description: description,
    date: date,
    prio: prio || "low",
    category: category,
    status: status,
    counter: 0,
    subTask: taskArr = [...subTasks],
    finishedTaskList: [],
    id: Date.now(),
    assignees: assignees,
    totalSubTasks: subTasks.length
  }; return task
}

/**
 * Gets the priority by wich one of the priority buttons is clicked.
 * 
 * @param {string} priority - The priority button thats clicked.
 */
function checkBoxClicked(priority) {
  let checkbox = document.getElementById(priority);
  let image = document.getElementById(priority + "-img");
  let span = document.getElementById(priority + "-span");
  resetColor();
  resetBoardColor();
  if (checkbox.checked) {
    deactivateOtherCheckboxes(priority);
    span.style.backgroundColor = getColor(priority);
    changeImageSrc(priority, image);
  } else {image.src = "/assets/img/" + priority.toLowerCase() + "-priority.png"}
}


/**
 * A function that handles the click event on medium priority
 * for every new task/todo by default.
 *
 * @param {string} priority - The priority of the medium element.
 */
function clickMedium(priority){
  let image = document.getElementById(priority + "-img");
  let span = document.getElementById(priority + "-span");
  deactivateOtherCheckboxes(priority);
    span.style.backgroundColor = getColor(priority);
    span.style.color= "white";
    changeImageSrc(priority, image);
}


/**
 * Resets the color if the priority button is not clicked anymore.
 */
function resetColor() {
  let span = document.getElementsByClassName('priority-span');
  for (let i = 0; i < span.length; i++) {
    span[i].style.backgroundColor = "";
  } checkBoxClicked
}


function resetBoardColor() {
  let span = document.getElementsByClassName('edit-priority-span');
  for (let i = 0; i < span.length; i++) {
    span[i].style.backgroundColor = "";
  } checkBoxClicked
}


/**
 * Deactivates the color of the priority buttons that are not clicked anymore.
 */
function deactivateOtherCheckboxes(currentPriority) {
  const priorities = ["urgent", "medium", "low"];
  for (const priority of priorities) {
    if (priority !== currentPriority) {
      document.getElementById(priority).checked = false;
      document.getElementById(priority).parentNode.parentNode.style.backgroundColor = "";
      document.getElementById(priority + "-span").style.color = "";
      document.getElementById(priority).closest(".prio").querySelector(".prioImgs").src ="/assets/img/" + priority.toLowerCase() + "-priority.png";
    }
  }
  pushCurrentPriority(currentPriority);
}


/**
 * Pushes the selected priority into the 'prioArray' array.
 * 
 * @param {string} currentPriority - The selected priority.
 */
function pushCurrentPriority(currentPriority) {
  if (prioArray.length > 0) {
    prioArray[0] = currentPriority;
  } else {
    prioArray.push(currentPriority);
  }
}


/**
 * Changes the backgroundcolor of the selected priority.
 * 
 * @param {string} priority - The selected priority.
 * @returns the backgroundcolor of the selected priority.
 */
function getColor(priority) {
  switch (priority) {
    case "urgent":
      return "#FF3D00";
    case "medium":
      return "#FFA800";
    case "low":
      return "#7AE229";
    default:
      return "";
  }
}


/**
 * Changes the imagepath of the selected priority.
 * 
 * @param {string} priority - The selected priority.
 * @param {source} image - The image of the selected priority.
 */
function changeImageSrc(priority, image) {
  let basePath = "/assets/img/";
  let activeFileName = priority.toLowerCase() + "-active.png";
  let newSrc = basePath + activeFileName;
  checkImageExists(newSrc, function (exists) {
    if (exists) {
      if (image instanceof HTMLImageElement) {
        image.onload = function () { };
        image.onerror = function () { };
        image.src = newSrc} 
    } 
  });
}

/**
 * Checks if the image source is correct.
 * 
 * @param {source} url - The source of the image.
 * @param {string} callback - The function that checks the image.
 */
function checkImageExists(url, callback) {
  let img = new Image();
  img.onload = function () {
    callback(true);};
  img.onerror = function () {
    callback(false);};
  img.src = url;
}


/**
 * 
 * @returns the value of the 'prioArray' array.
 */
function getPrioValue() {
  let arr = prioArray.slice(-1)
  return arr[0]
}


/**
 * Sets the value of the priority from the current task.
 * 
 * @param {string} string - The current priority.
 */
function setValue(string) {
  let input = document.getElementById('category')
  input.innerText = string
  input.setAttribute('placeholder', string)
  input.setAttribute('value', string)
}


/**
 * Clears the category value from the current task. 
 */
function clearCategoryValue() {
  let input = document.getElementById('category')
  input.innerText = ''
  input.setAttribute('placeholder', 'Select task category')
  input.setAttribute('value', '');
}

/**
 * Opens a list by changing the styles and classes of the specified elements.
 * If the list is already open, it is closed.
 *
 * @param {string} containerID - Die ID des Container-Elements.
 * @param {string} inputID - Die ID des Eingabeelements.
 * @param {string} ulID - Die ID des ungeordneten Listen-Elements.
 * @param {string} iconID - Die ID des Icon-Elements.
 */
function openList(containerID, inputID, ulID, iconID) {
  let ul = document.getElementById(ulID);
  if (ul.classList.contains('d-none')) {
    let input = document.getElementById(inputID);
    let container = document.getElementById(containerID);
    let btn = document.getElementById(iconID);
    btn.style = 'transform:rotate(180deg)'
    input.style = 'z-index:6'
    container.style = 'z-index:6'
    ul.classList.remove('d-none')
    ul.style = 'z-index:5'
  } else {return closeList(containerID, inputID, ulID, iconID)}
}

/**
 * Closes a list by resetting the styles and classes of the specified elements.
 *
 * @param {string} containerID - Die ID des Container-Elements.
 * @param {string} inputID - Die ID des Eingabeelements.
 * @param {string} ulID - Die ID des ungeordneten Listen-Elements.
 * @param {string} iconID - Die ID des Icon-Elements.
 */
function closeList(containerID, inputID, ulID, iconID) {
  let input = document.getElementById(inputID);
  let container = document.getElementById(containerID);
  let ul = document.getElementById(ulID);
  let btn = document.getElementById(iconID);
  btn.style = ''
  input.style = ''
  container.style = ''
  ul.classList.add('d-none')
  ul.style = ''
  input.blur()
}

/**
 * Activates the subtask by changing the visibility of the plus and subtask buttons.
 */
function subTaskActive() {
  let plus = document.getElementById('sub-btn-plus');
  let subBtn = document.getElementById('sub-btn');
  plus.classList.add('d-none');
  subBtn.classList.remove('d-none');
}

/**
 * Closes the subtask by changing the visibility of the plus and subtask buttons.
 */
function subTaskClose() {
  let plus = document.getElementById('sub-btn-plus');
  let subBtn = document.getElementById('sub-btn');
  plus.classList.remove('d-none');
  subBtn.classList.add('d-none');
}

/**
 * Adds a subtask to the subTasks array and updates the subtask list.
 * If the subtask input is empty, it sets a custom validity message.
 */
function pushSubTasks() {
  let task = document.getElementById('subtask-input')
  if (task.value.length > 0) {
    subTasks.push(task.value)
    task.value = ''
    renderSubTasksList()
    return subTaskClose()
  } else if (task.value.length == 0) {
    task.setCustomValidity('Kindly type in a subtask before adding one.')
    task.reportValidity()}
}

/**
 * Clears all input and textarea fields, clears the assignees, resets the category value, and disables the create/edit task button.
 */
function clearAll() {
  clearAssignees()
  let input = document.querySelectorAll('input');
  let textarea = document.querySelectorAll('textarea');
  for (let i = 0; i < input.length; i++) {
    input[i].value = '';}
    for (let i = 0; i < textarea.length; i++) {
      textarea[i].value = '';};
  clearCategoryValue()
  let btn = document.getElementById('createTaskButton')||document.getElementById('edit-ok-btn');
  btn.disabled = true
}


/**
 * Clears the assignees by resetting the clickList array.
 */
function clearAssignees(){
  let clickList = [];
  clickList.push(...assignees)
  for(let i=0; i < clickList.length; i++){
    addboxClick(i,checkList[i])
  }
}

/**
 * Adds the 'push-up' class to the info element and navigates to the board after a delay.
 */
function pushInfo() {
  let info = document.getElementById('info')
  info.classList.add('push-up');
  setTimeout(() => {goToBoard()}, 2000)
};

/**
 * Navigates to the board page.
 */
function goToBoard() {
  window.location.href = '/html/board.html';
};

/**
 * Handles the click event for the checkbox, updates the checkbox and image, and re-renders the edit icons.
 *
 * @param {number} i - The index of the checkbox.
 */
function addboxClick(i,id) {
  let checkbox = document.getElementById(`check${i}`);
  let img = document.getElementById(`img-box${i}`);
  logTaskCheckBox(checkbox, img, id);
  renderEditIcons()
}

/**
 * Updates the checkbox and image based on the checkbox state and updates the assignees array.
 *
 * @param {HTMLInputElement} box - The checkbox element.
 * @param {HTMLImageElement} img - The image element.
 * @param {number} i - The index of the checkbox.
 */
function logTaskCheckBox(box, img, id) {
  if (box.checked) {
    box.checked = false;
    img.src = '/assets/img/checkbox.png';
    img.style = "";
    assignees.splice(assignees.indexOf(id), 1)
  } else if (!box.checked) {
    box.checked = true;
    img.src = '/assets/img/checked-box.png';
    img.style = 'width: 18px; height: 18px;transform:translate(6px,0px);margin-right:12px;right:.8rem';
    assignees.push(contacts[contacts.findIndex((e) => e.id == id)].id)
  }
}

/**
 * Adds a keyup event listener to the subtask input. If the Enter key is pressed and the input is not empty, a subtask is added.
 */
function addSubtaskListener() {
  let input = document.getElementById('subtask-input')
  input.addEventListener('keyup', function (event) {
    if (event.key === 'Enter' && input.value.length > 0) {
      pushSubTasks();
    } else if (event.key === 'Enter' && input.value.length == 0) {
      event.preventDefault();}
  });
}

/**
 * Resets the assignees array and adds the assignees of the specified task.
 *
 * @param {Object} task - The task object.
 */
function pushEditAssignees(task) {
  assignees = [];//emptying global array
  let index = contacts.filter((e) => task.assignees.includes(e.id))
  index.forEach((element) => {addboxClick(contacts.indexOf(element),element.id)})
}

/**
 * Sets the editArr array to contain only the specified priority.
 *
 * @param {string} newPrio - The new priority.
 */
function editPrio(newPrio) {editArr = [newPrio]}

/**
 * Checks all input fields for validity. If all inputs are valid, the create/edit task button is enabled.
 */
function checkAllInputs(){
  let btn = document.getElementById('createTaskButton')||document.getElementById('edit-ok-btn');
  if(validateTitleInput() && validateDescriptionInput() && validateDateInput()&& categoryResponse()){
    btn.disabled = false;}
}

