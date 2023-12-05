 function init(){
    getUser(sessionKey)
    renderComponents(activeUser);
    updateHTML()
}

function renderComponents(activeUser){
    let body = document.querySelector('body')
    body.innerHTML=renderNavBar();
    body.innerHTML+=renderHeader(activeUser);
    document.querySelector('main').innerHTML=/*html*/`
    <div class="sections-drag">
                <div class="headline">
                    <h1>Board</h1>
                    <div class="inputAndButton">
                        <div class="input">
                            <input type="text" placeholder="Find Task">
                        </div>
                        <div class="buttonAdd">Add Task
                            <img src="/assets/img/board-plus.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div class="drag-area" id="open" ondrop="moveTo('open')" ondragleave="removeHighlight('open')"
                        ondragover="allowDrop(event); highlight('open')">
                    </div>
                    <div class="drag-area" id="in-progress" ondrop="moveTo('in-progress')"
                        ondragleave="removeHighlight('in-progress')"
                        ondragover="allowDrop(event); highlight('in-progress')"></div>
                    <div class="drag-area" id="closed" ondrop="moveTo('closed')" ondragleave="removeHighlight('closed')"
                        ondragover="allowDrop(event); highlight('closed')"></div>
                </div>
            </div>
    `
}

let todos = [{
    'id': 0,
    'title': 'Putzen',
    'category': 'open'
}, {
    'id': 1,
    'title': 'Kochen',
    'category': 'in-progress'
}, {
    'id': 2,
    'title': 'Einkaufen',
    'category': 'closed'
},
{
    'id': 3,
    'title': 'Putzen',
    'category': 'open'
}, {
    'id': 4,
    'title': 'Kochen',
    'category': 'in-progress'
}, {
    'id': 5,
    'title': 'Einkaufen',
    'category': 'closed'
}];

let headlines = [
    {
        color: 'rot',
        task: 'Aufgabe 1'
    },
    {
        color: 'blau',
        task: 'Aufgabe 2'
    },
    // Fügen Sie weitere Überschriften hier hinzu
];

let currentDraggedElement;

function updateHTML() {
    let open = todos.filter(t => t['category'] == 'open');
    document.getElementById('open').innerHTML = '';
    for (let index = 0; index < open.length; index++) {
        const element = open[index];
        document.getElementById('open').innerHTML += generateTodoHTML(element);
    }

    let in_progress = todos.filter(t => t['category'] == 'in-progress');
    document.getElementById('in-progress').innerHTML = '';
    for (let index = 0; index < in_progress.length; index++) {
        const element = in_progress[index];
        document.getElementById('in-progress').innerHTML += generateTodoHTML(element);
    }

    let closed = todos.filter(t => t['category'] == 'closed');
    document.getElementById('closed').innerHTML = '';
    for (let index = 0; index < closed.length; index++) {
        const element = closed[index];
        document.getElementById('closed').innerHTML += generateTodoHTML(element);
    }
}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateTodoHTML(element, index) {
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="todo">${element['title']}</div>
    <div class="drag-headline">${[index]}</div>
    <div class="todo-content">Todo-Inhalt 1</div>`;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    todos[currentDraggedElement]['category'] = category;
    updateHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}