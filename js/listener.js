/**
 * Adds event listeners to input elements in the document.
 *
 * @param {None} None
 * @return {None} None
 */
function addInputHandler() {
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let date = document.getElementById("date");
    let assignSelect = document.getElementById("assign-select");
    let categorySelect = document.getElementById("category-select");
    title.addEventListener("click", addTitleListener);
    description.addEventListener("click", addDescriptionListener);
    date.addEventListener("focusout", validateDateInput);
    assignSelect.addEventListener("click", setClosingAssign);
    categorySelect.addEventListener("click", setClosingCategory);
}


/**
* Adds a title listener to the 'title' input element.
*
* @param {HTMLElement} input - The input element to attach the listener to.
* @return {void} This function does not return a value.
*/
function addTitleListener() {
    let input = document.getElementById("title");
    input.addEventListener("input", validateTitleInput);
}


/**
 * Adds a description listener to the input element with the id 'description'.
 *
 * @param {Element} input - The input element to add the listener to.
 * @return {void} No return value.
 */
function addDescriptionListener() {
    let input = document.getElementById("description");
    input.addEventListener("input", validateDescriptionInput);
}


/**
* Validates the title input field.
*
* @return {boolean} Returns true if the title input field is valid, false otherwise.
*/
function validateTitleInput() {
    let title = document.getElementById("title");
    let container = document.getElementById("add-task-titlte-container");
    let message = document.getElementById("title-requirement") || document.getElementById("title-requirement-edit");
    let btn = document.getElementById("createTaskButton") || document.getElementById("edit-ok-btn");
    if (title.value.length === 0) {
        container.style = "box-shadow: inset 0 0 1px 1px #FF4646!important;";
        message.classList.remove("d-none");
        btn.disabled = true;
    } else {
        message.classList.add("d-none");
        container.style = "";
        return true;
    }
}


/**
 * Validates the input of the description field.
 *
 * @return {boolean} Returns true if the description field is not empty, false otherwise.
 */
function validateDescriptionInput() {
    let description = document.getElementById("description");
    let container = document.getElementById("area-container");
    let message = document.getElementById("description-requirement") || document.getElementById("description-requirement-edit");
    let btn = document.getElementById("createTaskButton") || document.getElementById("edit-ok-btn");
    if (description.value.length === 0) {
        container.style = "box-shadow: inset 0 0 1px 1px #FF4646!important;";
        message.classList.remove("d-none");
        btn.disabled = true;
    } else {
        container.style = "";
        message.classList.add("d-none");
        return true;
    }
}


/**
 * Validates the date input provided by the user.
 *
 * @return {boolean} Returns true if the date input is valid, false otherwise.
 */
function validateDateInput() {
    let input = document.getElementById("date");
    let div = document.getElementById("add-task-date-input");
    let selectedDate = new Date(input.value);
    let currentDate = new Date();
    let message = document.getElementById("date-requirement") || document.getElementById("date-requirement-edit");
    let btn = document.getElementById("createTaskButton") || document.getElementById("edit-ok-btn");
    if (selectedDate == "Invalid Date") {
        div.style = "box-shadow: inset 0 0 1px 1px #FF4646!important;";
        message.classList.remove("d-none");
        btn.disabled = true;
    } else if (selectedDate < currentDate) {
        div.style = "box-shadow: inset 0 0 1px 1px #FF4646!important;";
        message.classList.remove("d-none");
        btn.disabled = true;
    } else {
        message.classList.add("d-none");
        div.style = "";
        return true;
    }
}

/**
 * Checks the selected category and enables or disables the create task button
 * based on the category value.
 *
 * @return {boolean} Returns true if the category is "Technical Task" or "User Story",
 *                   otherwise returns false.
 */
function categoryResponse() {
    let category = document.getElementById("category");
    let btn = document.getElementById("createTaskButton") || document.getElementById("edit-ok-btn");
    if (category.value == "Technical Task" || category.value == "User Story") {
        return true;
    } else {
        btn.disabled = true;
        return false;
    }
}



/**
 * Sets the closing category functionality.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function setClosingCategory() {
    let categoryContainer = document.getElementById("category-select");
    let body = document.querySelector("body");
    body.addEventListener("click", handleClick);
    categoryContainer.removeEventListener("click", setClosingCategory);
}


function handleClick(event) {
    let categoryContainer = document.getElementById("category-select");
    let body = document.querySelector("body");
    let categoryInput = document.getElementById("category");
    let btn = document.getElementById("category-icon");
    let list = document.getElementById("category-ul");
    let popUp = document.getElementById("popup-img")
    if (event.target === popUp) {
        body.removeEventListener("click", handleClick);
    } else if (
        event.target != categoryContainer &&
        event.target != categoryInput &&
        event.target != btn &&
        event.target != list
    ) {{ closeList("category-select", "category", "category-ul", "category-icon"); }}
}


/**
 * Sets the closing assign behavior.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function setClosingAssign() {
    let assignContainer = document.getElementById("assign-select");
    let body = document.querySelector("body");
    body.addEventListener("click", handleClickAssign);
    assignContainer.removeEventListener("click", setClosingAssign);
}



function handleClickAssign(event) {
    let assignContainer = document.getElementById("assign-select");
    let body = document.querySelector("body");
    let assignInput = document.getElementById("assign");
    let btn = document.getElementById("assign-icon");
    let list = document.getElementById("assign-ul");
    let popUp = document.getElementById("popup-img")
    if (event.target === popUp) {
        body.removeEventListener("click", handleClickAssign);
    } else if (
        event.target != assignContainer &&
        event.target != assignInput &&
        event.target != btn &&
        event.target != list
    ) { closeList("assign-select", "assign", "assign-ul", "assign-icon")}
}

function removeBodyHandler(){
    let body = document.querySelector("body");
    body.removeEventListener("click", handleClickAssign);
}


/**
* Sets the subtasks to be editable.
*
* @param {Array} subTasks - The array of subtasks.
* @return {void} This function does not return anything.
*/
function setEditableSubtask() {
    if (subTasks.length > 0) {
        let subtaskListItems = document.getElementsByClassName("single-subtask");
        for (let i = 0; i < subtaskListItems.length; i++) {
            let sub = subtaskListItems[i];
            sub.addEventListener("dblclick", (event) => {
                editListItem(sub.id);
            });
        }
    }
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
            return true;} else {
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
