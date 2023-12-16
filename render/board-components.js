// initial render-function which adds the navbar and header as well as preparing several drag and drop areas to render the todos into
function renderComponents(activeUser) {
    let nav = document.querySelector('nav');
    let header = document.querySelector('header');
    let main = document.querySelector('main');
    nav.innerHTML = renderNavBar();
    header.innerHTML += renderHeader(activeUser);
    main.innerHTML =/*html*/`
<div id="info">
    <div id="info-text">Task added to board</div><img src="/assets/img/nav-board.png" id="error" alt="">
</div>
<div class="column">
    <div class="sections-drag">
        <div class="headline">
            <h1>Board</h1>
            <div id="find-task-container" class="input-group sub-container row">
                <input id="find-task" class="form-control subtask-input" type="text" placeholder="Find Task" />
                <div class="input-border"></div>
                <button class="btn btn-outline-secondary sub-active" id="search-btn" type="button"
                    onclick="focusInput()">
                    <img id="#search-img" src="/assets/img/search.png" alt="">
                </button>
            </div>
            <div class="buttonAdd" onclick="openPopUp(),changeStatus('To-Do'),addAssigneesSelection()">Add Task
                <img id="white-plus" src="/assets/img/white-plus.png" alt="">
            </div>
        </div>
        <div id="content-box" class="content">
            <div class="drag-headlines">
                <div class="drag-head">
                    <h4>To do</h4>
                    <img class="drag-headlines-plus" src="/assets/img/board-plus.png" alt="plus in box"
                        onclick="openPopUp(),changeStatus('To-Do'),addAssigneesSelection()">
                </div>
                <div class="drag-area" id="To-Do" ondrop="moveTo('To-Do')" ondragleave="removeHighlight('To-Do')"
                    ondragover="allowDrop(event); highlight('To-Do')">
                </div>
            </div>
            <div class="drag-headlines">
                <div class="drag-head">
                    <h4>In progress</h4>
                    <img class="drag-headlines-plus" src="/assets/img/board-plus.png" alt="plus in box"
                        onclick="openPopUp(),changeStatus('In-Progress'),addAssigneesSelection()">
                </div>
                <div class="drag-area" id="In-Progress" ondrop="moveTo('In-Progress')"
                    ondragleave="removeHighlight('In-Progress')" ondragover="allowDrop(event); highlight('In-Progress')">
                </div>
            </div>
            <div class="drag-headlines">
                <div class="drag-head">
                    <h4>Await feedback</h4>
                    <img class="drag-headlines-plus" src="/assets/img/board-plus.png" alt="plus in box"
                        onclick="openPopUp(),changeStatus('Await-Feedback'),addAssigneesSelection()">
                </div>
                <div class="drag-area" id="Await-Feedback" ondrop="moveTo('Await-Feedback')"
                    ondragleave="removeHighlight('Await-Feedback')"
                    ondragover="allowDrop(event); highlight('Await-Feedback')">
                </div>
            </div>
            <div class="drag-headlines">
                <div class="drag-head">
                    <h4>Done</h4>
                </div>
                <div class="drag-area" id="Done" ondrop="moveTo('Done')" ondragleave="removeHighlight('Done')"
                    ondragover="allowDrop(event); highlight('Done')">
                </div>
            </div>
        </div>
    </div>
</div>
    `,
        addSearchBarHandler()
}


// main render function which renders every todo
function generateTodoHTML(element) {
    let counter = element.finishedTaskList.length;
    let subTaskLength = element.totalSubTasks;
    let category = convertCategory(element);
    let width = initialProgressWidth(element)
    return /*html*/`
    <div id=${element.id} data-value="${element.assignees}" draggable="true" ondragstart="startDragging(${element.id})" onclick="openTodoPopup(${element.id})" class="todo">
        <div class="${category}">${element.category}</div>
        <h5 class="drag-headline">${element.title}</h5>
        <div class="todo-content">${element.description}</div>
        <div id="sub${element.id}" class="progress-container">
            <div class="progress">
                <div id="progress${element.id}" class="progress-bar" role="progressbar" style="width: ${width}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="subtask-content">
                <div id="counter${element.id}">${counter}</div>
                <div id="length${element.id}">/${subTaskLength}</div>  
                <div>Subtasks</div>
            </div>
        </div>
        <div class="footer-box">
            <div data-value="${element.assignees}" class="profile-initials-container"></div>
            <div class="prioriy-container" >${returnPriority(element.prio)}</div>
        </div>
    </div>
    `;
}


//auxiliary function for renderTodoIcons which renders the priority icon automatically
function returnPriority(priority) {
    if (priority === 'urgent') {
        return /*html*/`<img src="/assets/img/urgent-priority.png" alt="urgent">`
    } else if (priority === 'medium') {
        return /*html*/`<img src="/assets/img/medium-priority.png" alt="medium">`
    } else if (priority === 'low') {
        return /*html*/`<img src="/assets/img/low-priority.png" alt="low">`
    }
}


//Render the pop-up for adding a task.
function renderPopUpAddTask() {
    let popUp = document.getElementById('pop-up-container');
    popUp.innerHTML = /*html*/`
        <div id="task-container">
            <div id="close-pop-up" onclick="closePopUp()"><img src="/assets/img/btn-x.png" alt=""></div>
            ${renderAddTaskSections()}
        </div>
        `,
        styleAddTask()
}


// renders the profile initials for every todo on board
function renderTodoIcons() {
    let divs = document.getElementsByClassName('profile-initials-container');
    for (let i = 0; i < divs.length; i++) {
        let div = divs[i];
        let index = div.getAttribute('data-value');
        if (index && index.trim() !== '') {
            index = index.split(',');
            for (let j = 0; j < index.length; j++) {
                div.innerHTML += /*html*/`
                    <div class="profile-initials" data-value="${index[j]}" style="background-color:${contacts[index[j]].color}">${contacts[index[j]].initials}</div>
                `;
            }
        }
    }
}


//renders a single todo when clicked
function renderSingleTodo(id) {
    if (id === undefined) { return }
    let index = allTasks.findIndex((task) => task.id === id);
    let element = allTasks[index];
    editTask = element;
    let obj = generateVarObj(element); // generateVarObj()-->board.js:322
    let popUp = document.getElementById('pop-up-container');
    popUp.innerHTML = /*html*/`
    <div id="close-pop-up" onclick="closePopUp(),lookForSubChange()"><img src="/assets/img/btn-x.png" alt=""></div>
    <div id="single-todo" data-value="${element.assignees}" class="todo">
        <div class="${obj.category} categoryBoardPopUp">${element.category}</div>          
        <h5 id="pop-headline" class="drag-headline headlineBoardPopUp">${element.title}</h5>
        <div id="todo-popup-content-box">
            <div id="todo-text-content" class="todo-content descriptionBoardPopUp">${obj.text}</div>
            <div id="dead-line" class="descriptionBoardPopUp"><span>Due date:  </span>${obj.date}</div>
            <div id="pop-priority" class="descriptionBoardPopUp"><span>Priority:  </span>${obj.priority} ${returnPriority(element.prio)}</div>
            <ul id="assignement">
                <h6 class="descriptionBoardPopUp">Assigned to</h6>
                ${getAssignList(element.assignees)}
            </ul>
            <ul id=subtask-list data-id="${element.id}">
                <h6  class="descriptionBoardPopUp">Subtasks</h6>
                ${getSubCheckList(element.subTask, element.finishedTaskList)}
            </ul>
        </div>
        <div id="todo-edit-footer">
            <button onclick="deleteTask('${id}')" id="delete-todo"><img src="/assets/img/delete.png" alt=""> Delete</button>
            <button onclick="lookForSubChange(),startEdit()"><img src="/assets/img/edit.png" alt=""> Edit</button>
        </div>
    </div>`,
        styleTodo();

}


//changes the pop-up size according to the content
function styleTodo() {
    let popUp = document.getElementById('pop-up-container');
    let sheet = document.getElementById('single-todo');
    sheet.style.boxShadow = 'none';
    popUp.style = 'width:30rem; padding:2rem 1rem';
}


//changes the pop-up size according to the content
function styleAddTask() {
    let popUp = document.getElementById('pop-up-container');
    popUp.style = 'width:80%; padding:0 5.5rem';
}


//Generates a list of HTML elements representing assignees as well as designing a feign profile-icon
function getAssignList(assignees) {
    let liArr = []
    for (let i = 0; i < assignees.length; i++) {
        let contact = contacts[assignees[i]];
        liArr.push(`<li class=contact><div class="profile"><div class="icon" style="background-color:${contact.color}">${contact.initials}</div><div class="name">${contact.fullName}</div></div></li>`)
    }; return liArr.join('')
}


//Generates a sub-checklist for a given list of subtasks and a list of finished tasks
function getSubCheckList(subtaskList, finishedTaskList) {
    let subLiArr = []
    let finListArr = getSubFinishedList(finishedTaskList);
    for (let i = 0; i < subtaskList.length; i++) {
        let sub = subtaskList[i];
        subLiArr.push(/*html*/`
        <li> 
            <input type="checkbox" id="check${i}">
            <div class="sub-task-board">
                <div class="sub-cb-auxiliary"><img id="img-box${i}" class="sub-checkbox" data-counter="0" src="/assets/img/checkbox.png" onclick="subBoxClick(${i})" alt="checkbox"></div>
                <div class="sub-text">
                    ${sub}
                </div>
            </div>
        </li>`)
    };return mergeSublists(subLiArr, finListArr)
}


//Merges two sublists and returns a string.
function mergeSublists(sub, fin){
    if (fin !== false) {
        sub = sub.concat(fin)
        return sub.join('')
    } else {
        return sub.join('')
    }
}


//Generate the finished task list for the sub-tasks which are recognized as checked
function getSubFinishedList(finishedTaskList) {
    let finLiArr = []
    if (finishedTaskList.length === 0){return false}
    for (let i = 0; i < finishedTaskList.length; i++) {
        let fin = finishedTaskList[i];
        let finishId = 1000 + i
        finLiArr.push(/*html*/`
        <li> 
            <input type="checkbox" checked id="check${finishId}">
            <div class="sub-task-board">
                <div class="sub-cb-auxiliary"><img id="img-box${finishId}" style = 'width: 0.9rem;height: .9rem' data-counter="1" class="sub-checkbox" src="/assets/img/checked-box.png" onclick="subBoxClick(${finishId})" alt="checkbox"></div>
                <div class="sub-text">
                    ${fin}
                </div>
            </div>
        </li>`)
    }
    return finLiArr
}