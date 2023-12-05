let allTasks = [];
let prioArray = [];

async function init() {
  await getAllTasks(tasksKey);
  await getContacts(contactKey);
  getUser(sessionKey);
  renderAddTaskPage(activeUser)
  checkInputs();
  setupInputListeners();
  addAssignees()
}

function renderAddTaskPage(activeUser) {
  let body = document.querySelector('body');
  let taskContainer = document.createElement('div')
  taskContainer.id='task-container'
  body.innerHTML = renderNavBar();
  body.innerHTML+= renderHeader(activeUser);
  document.querySelector('main').append(taskContainer);
  taskContainer.innerHTML=renderAddTaskSections()
}

async function addTask() {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let prio = getPrioValue();
  let category = document.getElementById("category").value;
  let subTask = document.getElementById("subTask").value;
  let task = {
    title: title,
    description: description,
    date: date,
    prio: prio,
    category: category,
    subTask: subTask,
  };
  allTasks.push(task);
  setAllTasks(tasksKey, allTasks);
}


function checkInputs() {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let category = document.getElementById("category").value;

  let button = document.querySelector(".createTaskButton");

  if (title && description && date && category) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "true");
  }
}

function setupInputListeners() {
  const inputIds = ["title", "description", "date", "category"];

  inputIds.forEach((id) => {
    const input = document.getElementById(id);

    if (input) {
      console.log(`Element with ID ${id}:`, input);
      input.addEventListener("input", checkInputs);
    } else {
      console.error(`Element with ID ${id} not found.`);
    }
  });
}

function checkBoxClicked(priority) {
  let checkbox = document.getElementById(priority);
  let image = checkbox.closest(".prio").querySelector(".prioImgs");

  if (checkbox.checked) {
    deactivateOtherCheckboxes(priority);
    checkbox.parentNode.parentNode.style.backgroundColor = getColor(priority);
    changeImageSrc(priority, image);
  } else {
    checkbox.parentNode.parentNode.style.backgroundColor = "";
    image.src = "/assets/img/" + priority.toLowerCase() + "-priority.png";
  }
}

function deactivateOtherCheckboxes(currentPriority) {
  const priorities = ["urgent", "medium", "low"];
  for (const priority of priorities) {
    if (priority !== currentPriority) {
      document.getElementById(priority).checked = false;
      document.getElementById(
        priority
      ).parentNode.parentNode.style.backgroundColor = "";
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
        image.onload = function () {};

        image.onerror = function () {};

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


function getPrioValue(){
  let arr = prioArray.slice(-1)
  return arr[0]
}


function addAssignees(){
  let box = document.getElementById('assign')
  for(let i = 0; i < contacts.length; i++){
    let name = contacts[i].firstName
    if(name!== ''){
      box.innerHTML+=/*html*/`
        <option value="${name}">${name}</option>
      `
    }
  }
}