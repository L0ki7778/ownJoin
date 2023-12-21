//renders the content for editing an allready created todo/task
function editCurrentTodo(task) {
    let popUp = document.getElementById('pop-up-container');
    popUp.innerHTML = /*html*/`
<div class="edit-sections">
    <div id="close-pop-up" onclick="closePopUp()"><img id="popup-img" src="/assets/img/btn-x.png" alt=""></div>
    <div>
        <h6>Title</h6>
        <div id="add-task-titlte-container" class="input-group sub-container row">
            <input id="title" class="form-control subtask-input" type="text" value="${task.title}"
                placeholder="Enter a title" required />
        </div>
        <div id="title-requirement-edit" class="d-none">This field is required</div>
        <h6>Description</h6>
        <div id="area-container" class="input-group sub-container row">
            <textarea id="description" class="form-control subtask-input" value="${task.description}"
                placeholder="Enter a Description" cols="30" rows="10" required></textarea>
        </div>        
        <div id="description-requirement-edit" class="d-none">Please provide a description</div>
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
                <ul id=assign-list class="drop-down-select-container edit-ul" onclick="event.stopPropagation()">
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
            <div id="added-profile-initials-container">
            </div>
        </div>
    </div>
    <div class="edit-border"></div>
    <div>
        <h6>Due date</h6>
        <div id="add-task-date-input" class="input-group sub-container row">
            <input id="date" class="form-control subtask-input" value="${task.date}" min="${getMinDate()}" type="date" required />
        </div>
        <div id="date-requirement-edit" class="d-none">Please set the actual or a furture date.</div>
        <h6>Prio</h6>
        <div id="prio">
            <div class="prio Urgent">
                <label>
                    <input id="urgent" type="checkbox" value="Urgent"
                        onclick="checkBoxClicked('urgent'),editPrio('urgent')">
                    <span class="edit-priority-span" id="urgent-span">Urgent <img class="prioImgs" id="urgent-img"
                            src="/assets/img/urgent-priority.png" alt=""></span>
                </label>
            </div>
            <div class="prio Medium">
                <label>
                    <input id="medium" type="checkbox" value="Medium"
                        onclick="checkBoxClicked('medium'),editPrio('medium')">
                    <span class="edit-priority-span" id="medium-span">Medium <img class="prioImgs" id="medium-img"
                            src="/assets/img/medium-priority.png" alt=""></span>
                </label>
            </div>
            <div class="prio Low">
                <label>
                    <input id="low" type="checkbox" value="Low" onclick="checkBoxClicked('low'),editPrio('low')">
                    <span class="edit-priority-span" id="low-span">Low <img class="prioImgs" id="low-img"
                            src="/assets/img/low-priority.png" alt=""></span>
                </label>
            </div>
        </div>
        <h6>Category</h6>
        <div class="relative">
            <div id="category-select" class="input-group sub-container">
                <input class="form-control subtask-input contact-assign-select select" value="${task.category}"
                    placeholder="Select task category" id="category"
                    onclick="openList('category-select','category','category-ul','category-icon')" readonly required>
                <button id="category-icon" class="divIcon"
                    onclick="openList('category-select','category','category-ul','category-icon')">
                    <img src="/assets/img/arrow_drop_down.png" alt="">
                </button>
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
            <input id="subtask-input" type="text" class="form-control subtask-input" placeholder="Add new Subtask"
                aria-label="Recipient's username with two button addons" onclick="subTaskActive()">
            <button class="btn btn-outline-secondary sub-active" onclick="subTaskActive()" id="sub-plus" type="button">
                <img id="sub-btn-plus" src="/assets/img/dark-plus.png" alt="">
            </button>
            <div id="sub-btn" class="d-flex d-none">
                <button class="btn sub-active" id="cross-btn" type="button" onclick="subTaskClose()"><img id="cross"
                        src="/assets/img/btn-x.png" alt=""></button>
                <div class="input-border"></div>
                <button class="btn sub-active" id="check-btn" type="button" onclick="pushSubTasks()">
                    <img id="add-subtask" src="/assets/img/darkCheckmark.png" alt="">
                </button>
            </div>
            <div id="subtask-listed">
                <ul id="task-list" class="edit-ul-task-list">
                    ${getSubList(task.subTask, task.finishedTaskList)}
                </ul>
            </div>
        </div>
    </div>
</div>
</div>
<div class="edit-bottom-section">
    <button id="edit-ok-btn" class="createTaskButton"
        onclick="editOk('${task.status}',${allTasks.indexOf(task)},'${task.prio}')">Ok
        <img src="/assets/img/checkbtn-checkmark.png" alt="" />
    </button>
</div>
  `,
    addAssigneesSelection(),
    addInputHandler(),
    addSubtaskListener(),
    pushEditAssignees(task),
    checkBoxClicked(task.prio),
    clickMedium(task.prio)
};


