let prioArray = [];

async function init() {
  await getAllTasks(tasksKey);
  await getContacts(contactKey);
  getUser(sessionKey);
  renderAddTaskPage(activeUser);
  navActive(1);
  addAssigneesSelection();
  addInputHandler();
  addSubtaskListener();
}

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
  pushInfo();
}

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

async function editTodoInAllTasks(status, index, prio) {
  let title = document.getElementById("title").value;
  let taskArr;
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let category = document.getElementById("category").value;
  let task = {
    title: title,
    description: description,
    date: date,
    prio: editArr[0] || prio,
    category: category,
    status: status,
    counter: finishedSubTasks.length,
    subTask: taskArr = [...subTasks],
    finishedTaskList: taskArr = [...finishedSubTasks],
    totalSubTasks: subTasks.length + finishedSubTasks.length,
    id: Date.now(),
    assignees: assignees
  };
  allTasks.splice(index, 1, task);
  await setAllTasks(tasksKey, allTasks);
  assignees = [];
  subTasks = [];
  finishedSubTasks = [];
  pushInfo();
}

function createEditTaskObject(){
  let task = {
    title: title,
    description: description,
    date: date,
    prio: editArr[0] || prio,
    category: category,
    status: status,
    counter: finishedSubTasks.length,
    subTask: taskArr = [...subTasks],
    finishedTaskList: taskArr = [...finishedSubTasks],
    totalSubTasks: subTasks.length + finishedSubTasks.length,
    id: Date.now(),
    assignees: assignees
  }
}


function checkBoxClicked(priority) {
  let checkbox = document.getElementById(priority);
  let image = document.getElementById(priority + "-img");
  let span = document.getElementById(priority + "-span");
  resetColor()
  if (checkbox.checked) {
    deactivateOtherCheckboxes(priority);
    span.style.backgroundColor = getColor(priority);
    changeImageSrc(priority, image);
  } else {
    image.src = "/assets/img/" + priority.toLowerCase() + "-priority.png";
  }
}


function resetColor() {
  let span = document.getElementsByClassName('priority-span');
  for (let i = 0; i < span.length; i++) {
    span[i].style.backgroundColor = "";
  } checkBoxClicked
}


function deactivateOtherCheckboxes(currentPriority) {
  const priorities = ["urgent", "medium", "low"];
  for (const priority of priorities) {
    if (priority !== currentPriority) {
      document.getElementById(priority).checked = false;
      document.getElementById(priority).parentNode.parentNode.style.backgroundColor = "";
      document
        .getElementById(priority)
        .closest(".prio")
        .querySelector(".prioImgs").src =
        "/assets/img/" + priority.toLowerCase() + "-priority.png";
    }
  }
  pushCurrentPriority(currentPriority);
}

function pushCurrentPriority(currentPriority) {
  if (prioArray.length > 0) {
    prioArray[0] = currentPriority;
  } else {
    prioArray.push(currentPriority);
  }
}

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

function changeImageSrc(priority, image) {
  let basePath = "/assets/img/";
  let activeFileName = priority.toLowerCase() + "-active.png";
  let newSrc = basePath + activeFileName;

  checkImageExists(newSrc, function (exists) {
    if (exists) {
      if (image instanceof HTMLImageElement) {
        image.onload = function () { };

        image.onerror = function () { };

        image.src = newSrc;
      } else {
      }
    } else {
    }
  });
}

function checkImageExists(url, callback) {
  let img = new Image();
  img.onload = function () {
    callback(true);
  };
  img.onerror = function () {
    callback(false);
  };
  img.src = url;
}


function getPrioValue() {
  let arr = prioArray.slice(-1)
  return arr[0]
}


function setValue(string) {
  let input = document.getElementById('category')
  input.innerText = string
  input.setAttribute('placeholder', string)
  input.setAttribute('value', string)
}

function clearCategoryValue() {
  let input = document.getElementById('category')
  input.innerText = ''
  input.setAttribute('placeholder', 'Select task category')
  input.setAttribute('value', '');
  checkAllInputs()
}

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
  } else {
    return closeList(containerID, inputID, ulID, iconID)
  }
}


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


function subTaskActive() {
  let plus = document.getElementById('sub-btn-plus');
  let subBtn = document.getElementById('sub-btn');
  plus.classList.add('d-none');
  subBtn.classList.remove('d-none');
}


function subTaskClose() {
  let plus = document.getElementById('sub-btn-plus');
  let subBtn = document.getElementById('sub-btn');

  plus.classList.remove('d-none');
  subBtn.classList.add('d-none');
}


function pushSubTasks() {
  let task = document.getElementById('subtask-input')
  if (task.value.length > 0) {
    subTasks.push(task.value)
    task.value = ''
    renderSubTasksList()
    return subTaskClose()
  } else if (task.value.length == 0) {
    task.setCustomValidity('Kindly type in a subtask before adding one.')
    task.reportValidity()
  }
}


function clearAll() {
  let input = document.querySelectorAll('input');
  let textarea = document.querySelectorAll('textarea');
  for (let i = 0; i < input.length; i++) {
    input[i].value = '';
  }
  for (let i = 0; i < textarea.length; i++) {
    textarea[i].value = '';
  };
  clearCategoryValue()
}

function pushInfo() {
  let info = document.getElementById('info')
  info.classList.add('push-up');

  setTimeout(() => {
    goToBoard()
  }, 2000)
};

function goToBoard() {
  window.location.href = '/assets/templates/board.html';
};


function addboxClick(i) {
  let checkbox = document.getElementById(`check${i}`);
  let img = document.getElementById(`img-box${i}`);
  logTaskCheckBox(checkbox, img, i);
  renderEditIcons()
}

function logTaskCheckBox(box, img, i) {
  if (box.checked) {
    box.checked = false;
    img.src = '/assets/img/checkbox.png';
    img.style = "";
    assignees.splice(assignees.indexOf(i), 1)
  } else if (!box.checked) {
    box.checked = true;
    img.src = '/assets/img/checked-box.png';
    img.style = 'width: 18px; height: 18px;transform:translate(6px,0px);margin-right:12px;right:.8rem';
    assignees.push(i)
  }
}

function addSubtaskListener() {
  let input = document.getElementById('subtask-input')
  input.addEventListener('keyup', function (event) {
    if (event.key === 'Enter' && input.value.length > 0) {
      pushSubTasks();
    } else if (event.key === 'Enter' && input.value.length == 0) {
      event.preventDefault();
    }
  });
}


function pushEditAssignees(task) {
  assignees = [];
  let index = task.assignees
  index.forEach((element) => {
    addboxClick(element)
  })

}


function editPrio(newPrio) {
  editArr = [newPrio]
}


function checkAllInputs(){
  let btn = document.getElementById('createTaskButton')||document.getElementById('edit-ok-btn');
  if(validateTitleInput() && validateDescriptionInput() && validateDateInput()&& categoryResponse()){
    btn.disabled = false;
  }
}


function addInputHandler() {
  let title = document.getElementById("title");
  let description = document.getElementById("description");
  let date = document.getElementById("date");

  title.addEventListener('click', addTitleListener);
  description.addEventListener('click', addDescriptionListener);
  date.addEventListener('focusout', validateDateInput);
  date.addEventListener('focusout',checkAllInputs)
}


function addTitleListener() {
  let input = document.getElementById('title');
  input.addEventListener('input', validateTitleInput);
  input.addEventListener('input',checkAllInputs)
}


function addDescriptionListener() {
  let input = document.getElementById('description');
  input.addEventListener('input', validateDescriptionInput);
  input.addEventListener('input',checkAllInputs)
}


function validateTitleInput() {
  let title = document.getElementById("title");
  let container = document.getElementById('add-task-titlte-container');
  let message= document.getElementById('title-requirement')||document.getElementById('title-requirement-edit');
  let btn = document.getElementById('createTaskButton')||document.getElementById('edit-ok-btn');
  if (title.value.length === 0) {
    container.style="box-shadow: inset 0 0 1px 1px #FF4646!important;"
    message.classList.remove('d-none')
    btn.disabled = true;
  } else {
    message.classList.add('d-none')
    container.style=""
    return true
  }
}

function validateDescriptionInput() {
  let description = document.getElementById("description");
  let container = document.getElementById('area-container');
  let message= document.getElementById('description-requirement')||document.getElementById('description-requirement-edit');
  let btn = document.getElementById('createTaskButton')||document.getElementById('edit-ok-btn');

  if (description.value.length === 0) {
    container.style="box-shadow: inset 0 0 1px 1px #FF4646!important;";
    message.classList.remove('d-none')
    btn.disabled = true;
  } else {
    container.style=""
    message.classList.add('d-none')
    return true
  }
}

function validateDateInput() {
  let input = document.getElementById('date');
  let div = document.getElementById("add-task-date-input");
  let selectedDate = new Date(input.value);
  let currentDate = new Date();
  let message= document.getElementById('date-requirement')||document.getElementById('date-requirement-edit');
  let btn = document.getElementById('createTaskButton')||document.getElementById('edit-ok-btn');
  if (selectedDate=='Invalid Date'){
    div.style = "box-shadow: inset 0 0 1px 1px #FF4646!important;";
    message.classList.remove('d-none');
    btn.disabled = true;
  } else if (selectedDate < currentDate) {
    div.style = "box-shadow: inset 0 0 1px 1px #FF4646!important;";
    message.classList.remove('d-none');
    btn.disabled = true;
  } else {message.classList.add('d-none');div.style = "";return true}
}

function categoryResponse() {
  let category = document.getElementById("category");
  let btn = document.getElementById('createTaskButton')||document.getElementById('edit-ok-btn');
  if (category.value == "Technical Task"||category.value == "User Story") {
    return true
  } else {
    btn.disabled = true;
    return false
  }
}
    