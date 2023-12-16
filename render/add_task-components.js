//Renders the add task sections, responsible for creating a new task, assigning it to a contact and adding it to the board.
function renderAddTaskSections() {
    return/*html*/`
<h1 class="title">Add Task</h1>
<div class="sections">
    <div class="left-section">
        <h6>Title<span class="span">*</span></h6>
        <div id="add-task-titlte-container" class="input-group sub-container row">
            <input id="title" class="form-control subtask-input" type="text" placeholder="Enter a title" required />
        </div>
        <div id="title-requirement" class="d-none">This field is required</div>
        <h6>Description<span class="span">*</span></h6>
        <div id="area-container" class="input-group sub-container row">
            <textarea id="description" class="form-control subtask-input" placeholder="Enter a Description" cols="30"
                rows="10" required></textarea>
        </div>
        <div id="description-requirement" class="d-none">Please provide a description</div>
        <h6>Assigned to</h6>
        <div class="relative">
            <div id="assign-select" class="input-group sub-container ">
                <input class="form-control subtask-input contact-assign-select select"
                    onclick="openList('assign-select','assign','assign-ul','assign-icon')"
                    placeholder="Select contacts to assign" id="assign">
                <button id="assign-icon" class="divIcon"
                    onclick="openList('assign-select','assign','assign-ul','assign-icon')"><img
                        src="/assets/img/arrow_drop_down.png" alt=""></button>
            </div>
            <div id="assign-ul" class="ul-parent d-none">
                <ul id=assign-list class="drop-down-select-container ">
                    <li class=add-task-contact>
                        <div class="profile">
                            <div class="icon">*Bild*</div>
                            <div class="name">*Name*</div>
                        </div>
                        <div class="checkbox-container">
                            <input type="checkbox" id="check1">
                            <img id="img-box1" src="/assets/img/checkbox.png" onclick="checkboxClick(1)" alt="checkbox">
                        </div>
                    </li>
                </ul>
            </div>
            <div id="added-profile-initials-container" class="add-task-main-page">
            </div>
        </div>
    </div>
    <div class="border"></div>
    <div class="right-section">
        <h6>Due date<span class="span">*</span></h6>
        <div id="add-task-date-input" class="input-group sub-container row">
            <input  id="date" 
                    class="form-control subtask-input" 
                    type="text" 
                    placeholder="tt/mm/yyyy"
                    onfocus="(this.type='date')" 
                    required />
        </div>
        <div id="date-requirement" class="d-none">Please set the actual or a furture date.</div>
        <h6>Prio</h6>
        <div id="prio">
            <div class="prio Urgent">
                <label>
                    <input id="urgent" 
                        type="checkbox" 
                        value="Urgent" 
                        onclick="checkBoxClicked('urgent')">
                    <span class="priority-span" id="urgent-span">Urgent <img class="prioImgs" id="urgent-img"src="/assets/img/urgent-priority.png" alt=""></span>
                </label>
            </div>
            <div class="prio Medium">
                <label>
                    <input id="medium" 
                        type="checkbox" 
                        value="Medium" 
                        onclick="checkBoxClicked('medium')">
                    <span class="priority-span" id="medium-span">Medium <img class="prioImgs" id="medium-img"src="/assets/img/medium-priority.png" alt=""></span>
                </label>
            </div>
            <div class="prio Low">
                <label>
                    <input id="low" 
                        type="checkbox" 
                        value="Low" 
                        onclick="checkBoxClicked('low')">
                    <span class="priority-span" id="low-span">Low <img class="prioImgs" id="low-img"src="/assets/img/low-priority.png" alt=""></span>
                </label>
            </div>
        </div>
        <h6>Category<span class="span">*</span></h6>
        <div class="relative">
            <div id="category-select" class="input-group sub-container">
                <input class="form-control subtask-input contact-assign-select select" 
                    value=""
                    placeholder="Select task category" 
                    id="category"
                    onclick="openList('category-select','category','category-ul','category-icon')" 
                    readonly 
                    required>
                <button id="category-icon" class="divIcon"
                    onclick="openList('category-select','category','category-ul','category-icon')"><img
                        src="/assets/img/arrow_drop_down.png" alt=""></button>
            </div>
            <div id="category-ul" class="ul-parent d-none">
                <ul class="drop-down-select-container">
                    <li class=add-task-contact>
                        <div class="profile">
                            <div class="name"
                                onclick="setValue('Technical Task');closeList('category-select','category','category-ul','category-icon');checkAllInputs()">
                                Technical Task</div>
                        </div>
                    </li>
                    <li class=add-task-contact>
                        <div class="profile">
                            <div class="name"
                                onclick="setValue('User Story');closeList('category-select','category','category-ul','category-icon');checkAllInputs()">
                                User Story</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <h6 id="header-six">Subtasks</h6>
        <div id="sub-container" class="input-group sub-container row">
            <input  id="subtask-input" 
                    type="text" 
                    class="form-control subtask-input" 
                    placeholder="Add new Subtask"
                    aria-label="Recipient's username with two button addons" 
                    onclick="subTaskActive()">
            <button class="btn btn-outline-secondary sub-active" 
                    onclick="subTaskActive()" 
                    id="sub-plus"
                    type="button">
                <img id="sub-btn-plus" src="/assets/img/dark-plus.png" alt="">
            </button>
            <div id="sub-btn" class="d-flex d-none d-rowMobile">
                <button class="btn sub-active" 
                        id="cross-btn" 
                        type="button" 
                        onclick="subTaskClose()"><img id="cross"
                        src="/assets/img/btn-x.png" alt=""></button>
                <div class="input-border"></div>
                <button class="btn sub-active" 
                        id="check-btn" 
                        type="button"
                        onclick="pushSubTasks()">
                            <img id="add-subtask" src="/assets/img/darkCheckmark.png" alt="">
                </button>
            </div>
            <div id="subtask-listed">
                <ul id="task-list"></ul>
            </div>
        </div>
    </div>
</div>
</div>
<div class="add-task-bottom-section">
    <h6 id="required-text"><span class="span">*</span>This field is required</h6>
    <div id="submit-btn-container">
        <button class="clearButton" onclick="clearAll()">Clear <img src="/assets/img/btn-x.png" alt="" /></button>
        <button id="createTaskButton" class="createTaskButton" disabled onclick="addTask('To-Do')">Create Task <img src="/assets/img/checkbtn-checkmark.png"
                alt="" /></button>
    </div>
</div>
`};


function renderSubTasksList() {
    let list = document.getElementById('task-list');
    list.innerHTML = '';
    subTasks.forEach((e) => {
        list.innerHTML += `<li>${e}</li>`
    })
    if (finishedSubTasks.length > 0) {
        finishedSubTasks.forEach((e) => {
            list.innerHTML += `<li>${e}</li>`
        })
    }
}


function addAssigneesSelection() {
    let box = document.getElementById('assign-list')
    let contactArr = [];
    contacts.map((e) => { if (e.id) { contactArr.push(e) } })
    box.innerHTML = ''
    for (let i = 0; i < contactArr.length; i++) {
        let contact = contactArr[i]
        box.innerHTML +=/*html*/`
          <li class=contact>
           <div class="profile">
            <div class="icon" style="background-color:${contact.color}">${contact.initials}</div>
            <div class="name">${contact.fullName}</div>
          </div>
          <div class="checkbox-container">
            <input type="checkbox" id="check${i}">
            <img class="profile-checkboxes" id="img-box${i}" src="/assets/img/checkbox.png" onclick="addboxClick(${i})" alt="checkbox">
          </div>        
        </li>
        `
    }
}




function renderEditIcons() {
    let iconDiv = document.getElementById('added-profile-initials-container')
    iconDiv.innerHTML = '';
    let imgArr = [];
    assignees.forEach((element) => {
        imgArr.push(`<div class="added-profile-initials" data-value="${element}" style="background-color:${contacts[element].color}">${contacts[element].initials}</div>`)
    })
    iconDiv.innerHTML = `${imgArr.join('')}`
}

// function renderAddTaskBottomSection() {
//     return/*html*/`
// <div class="add-task-bottom-section">
//     <h6 id="required-text"><span class="span">*</span>This field is required</h6>
//     <div id="submit-btn-container">
//         <button class="clearButton" onclick="clearAll()">Clear <img src="/assets/img/btn-x.png" alt="" /></button>
//         <button id="createTaskButton" class="createTaskButton" disabled onclick="addTask('To-Do')">Create Task <img src="/assets/img/checkbtn-checkmark.png"
//                 alt="" /></button>
//     </div>
// </div>
// `};