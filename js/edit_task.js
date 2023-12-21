// date form-validation, title description, (addinputhandler)listener,

/**
 * Pushes the eddited task into the 'allTasks' array.
 *
 * @param {string} status - The status of the task.
 * @param {string} index - The index of the task.
 * @param {string} prio - The prio of the task.
 */
async function editTodoInAllTasks(status, index, prio) {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let category = document.getElementById("category").value;
  let task = createEditTaskObject(status,title,description,date,category,prio);
  allTasks.splice(index, 1, task);
  await setAllTasks(tasksKey, allTasks);
  assignees = [];
  subTasks = [];
  finishedSubTasks = [];
  pushInfo();
}


/**
 * Creates an eddited task by taking the value of the inputfields.
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
function createEditTaskObject(status,title,description,date,category,prio) {
  let taskArr;
  let task = {
    title: title,
    description: description,
    date: date,
    prio: editArr[0] || prio,
    category: category,
    status: status,
    counter: finishedSubTasks.length,
    subTask: (taskArr = [...subTasks]),
    finishedTaskList: (taskArr = [...finishedSubTasks]),
    totalSubTasks: subTasks.length + finishedSubTasks.length,
    id: Date.now(),
    assignees: assignees,
  };
  return task;
}


/**
 * Generates a string representing the current date in the format 'YYYY-MM-DD'.
 *
 * @return {string} - A string representing the current date.
 */
function getMinDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Monate sind nullbasiert
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}


/**
 * Generate the function comment for the given function body.
 *
 * @param {array} subtaskList - The list of subtasks.
 * @param {array} finishedTaskList - The list of finished tasks.
 * @returns {array} The merged sublist and finished list.
 */
function getSubList(subtaskList, finishedTaskList) {
  subTasks = []
  let subLiArr = [];
  let finListArr = getEditFinishedList(finishedTaskList);
  for (let i = 0; i < subtaskList.length; i++) {
    let sub = subtaskList[i];
    subTasks.push(sub);
    subLiArr.push(`<div class="subTaskListFlex"><li class="single-subtask" onclick="editListItem(${i})" id="${i}">${sub}</li><img class="deleteSubtaskImg" onclick="deleteSubtask(${i})" src="/assets/img/delete.png" alt=""></div>`);
  }
  return mergeSublists(subLiArr, finListArr);
}


/**
 * Generates a list of finished tasks with HTML list items.
 *
 * @param {Array} finishedTaskList - the list of finished tasks.
 * @return {Array} - the list of HTML list items representing the finished tasks.
 */
function getEditFinishedList(finishedVariable) {
  let finArr=finishedVariable
  let finLiArr = [];
  if (finArr.length === 0) {
    return false;
  }
  for (let i = 0; i < finArr.length; i++) {
    let fin = finArr[i];
    finishedSubTasks=[];
    finishedSubTasks.push(fin);
    finLiArr.push(`<li class="single-finished-task" id="f${i}">${fin}</li>`);
  }
  return finLiArr;
}


/**
 * Edits the subtask list with the specified ID.
 *
 * @param {string} id - The ID of the element containing the subtask list.
 * @return {undefined} This function does not return a value.
 */
function editSubaskList(id) {
  let subtaskList = document.getElementById(`${id}`).innerHTML;
  subtaskList.contentEditable = true;
  subtaskList.focus();
}

function editListItem(id) {
  // Erstelle ein textInput-Element
  let item = document.getElementById(`${id}`);
  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.value = item.textContent;
  textInput.classList.add("subtask-input");
  textInput.classList.add("edit-input");

  // Ersetze das li-Element durch das textInput-Element
  item.parentNode.replaceChild(textInput, item);

  // Füge ein Eventlistener für die "Enter"-Taste hinzu, um die Bearbeitung zu beenden
  textInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // Beende die Bearbeitung und setze den neuen Text im li-Element
      item.textContent = textInput.value;
      // Ersetze das textInput-Element durch das ursprüngliche li-Element
      textInput.parentNode.replaceChild(item, textInput);
    }
  });

  // Setze den Fokus auf das Texteingabefeld
  textInput.focus();
}


/**
 * Deletes a subtask at the specified index.
 *
 * @param {number} index - The index of the subtask to delete.
 * @return {Array} - The updated array of subtasks.
 */
function deleteSubtask(index) {
    // Check if the index is within the valid range
    if (index >= 0 && index < subTasks.length) {
        // Splice removes 1 element at the specified index
        subTasks.splice(index, 1);
        return refreshSubtaskList();
    } else {
        console.error("Invalid index:", index);
    }
}


/**
 * Merges two sublists and returns the concatenated result.
 *
 * @param {Array} sub - The first sublist to merge.
 * @param {Array|boolean} fin - The second sublist to merge. If set to false, only the first sublist will be returned.
 * @return {string} - The concatenated result of the two sublists.
 */
function mergeSublists(sub, fin){
  if (fin !== false) {
      sub = sub.concat(fin)
      return sub.join('')
  } else {
      return sub.join('')
  }
}


/**
 * Refreshes the subtask list.
 *
 * @return {string} The updated HTML of the subtask list.
 */
function refreshSubtaskList(){
  let list = document.getElementById('task-list');
  return list.innerHTML=getSubList(subTasks, finishedSubTasks);
}

/**
 * Adds event listeners to the full name and email input fields in the profile form.
 * When the full name input field is changed, it checks for duplicate names and displays an error message if found.
 * When the email input field is changed, it checks for duplicate emails and displays an error message if found.
 *
 * @param {HTMLElement} fullName - The input field for the full name.
 * @param {HTMLElement} email - The input field for the email.
 * @return {boolean} Returns true if a duplicate name or email is found, otherwise returns undefined.
 */
function addContactFormListener() {
  let fullName = document.getElementById("profileName");
  let email = document.getElementById("profileEmail");
  fullName.addEventListener("input", () => {
    if (checkForDuplicateName(fullName.value)) {
      fullName.setCustomValidity(doubleName);
      return true;
    } else {
      fullName.setCustomValidity("");
    }
  });
  email.addEventListener("input", () => {
    if (checkForDuplicateMail(email.value)) {
      email.setCustomValidity(doubleMail);
      return true;
    } else {
      email.setCustomValidity("");
    }
  });
}

/**
 * Checks if a given name is a duplicate in the contacts list.
 *
 * @param {string} fullName - The name to check for duplicates.
 * @return {boolean} True if the name is a duplicate, false otherwise.
 */
function checkForDuplicateName(fullName) {
  for (let i = 0; i < contacts.length; i++) {
    if (fullName === contacts[i].fullName) {
      return true;
    }
  }
  return false;
}

/**
 * Checks if a given email is a duplicate in the contacts list.
 *
 * @param {string} mail - The email to check for duplicates.
 * @return {boolean} True if the email is a duplicate, false otherwise.
 */
function checkForDuplicateMail(mail) {
  for (let i = 0; i < contacts.length; i++) {
    if (mail === contacts[i].email) {
      return true;
    }
  }
  return false;
}


/**
 * Adds event listeners to the full name and email input fields in the profile form.
 * When the full name input field is changed, it checks for duplicate names and displays an error message if found.
 * When the email input field is changed, it checks for duplicate emails and displays an error message if found.
 *
 * @param {HTMLElement} fullName - The input field for the full name.
 * @param {HTMLElement} email - The input field for the email.
 * @return {boolean} Returns true if a duplicate name or email is found, otherwise returns undefined.
 */
function addContactEditListener() {
  let fullName = document.getElementById("editName");
  let email = document.getElementById("editEmail");
  fullName.addEventListener("input", () => {
    if (checkEditDuplicateName(fullName.value)) {
      fullName.setCustomValidity(doubleName);
      return true;
    } else {
      fullName.setCustomValidity("");
    }
  });
  email.addEventListener("input", () => {
    if (checkEditDuplicateMail(email.value)) {
      email.setCustomValidity(doubleMail);
      return true;
    } else {
      email.setCustomValidity("");
    }
  });
}


/**
 * Checks if a given name is a duplicate in the contacts list.
 *
 * @param {string} fullName - The name to check for duplicates.
 * @return {boolean} True if the name is a duplicate, false otherwise.
 */
function checkEditDuplicateName(fullName) {
  for (let i = 0; i < contacts.length; i++) {
    if (fullName === contacts[i].fullName) {
      return true;
    }
  }
  return false;
}

/**
 * Checks if a given email is a duplicate in the contacts list.
 *
 * @param {string} mail - The email to check for duplicates.
 * @return {boolean} True if the email is a duplicate, false otherwise.
 */
function checkEditDuplicateMail(mail) {
  for (let i = 0; i < contacts.length; i++) {
    if (mail === contacts[i].email) {
      return true;
    }
  }
  return false;
}