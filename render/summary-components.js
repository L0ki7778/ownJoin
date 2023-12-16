// Generates the headline HTML element.
function renderHeadline() {
    return /*html*/`
    <div class="column">
        <div class ="row">  
            <h1>Join 360</h1>
            <div #blue-line></div>
            <div>Key Metrics at a Glance</div>              
        </div>
    </div>
  `
}


// Generates a grid container HTML element.
function gridContainer() {
    return /*html*/`
    <div class="d-flex row">  
        <h1>Join 360</h1>
        <div class="stroke"></div>
        <h3>Key Metrics at a Glance</h3>              
    </div>
    <div id="grid">  
        <div id=grid-main-container>
            <div class="grid-container1">
                <div id="To-Do" onclick="openBoard()" class="grid-item"><img src="/assets/img/pen-frame.png" alt=""><div class="auxilary-container"><h1>${toDo.length}</h1><span>To do</span></div></div>
                <div id="Done" onclick="openBoard()" class="grid-item"><img src="/assets/img/checkmark-frame.png" alt=""><div class="auxilary-container"><h1>${done.length}</h1> <span>Done</span></div></div>
            </div>
            <div class="grid-container2">
                <div id="urgent" onclick="openBoard()" class="grid-item"><div class="displayFlex"><img src="/assets/img/arrow-up.png" alt="">
                    <div class="auxilary-container">
                        <h1>${urgent.length}</h1><span>Urgent</span>                
                    </div>
                </div>
                <div class="lineUrgent"></div>
                    <div class="deadline">
                        <span><b>${date.toLocaleDateString('de-DE', options)}</b></span><span>Upcoming Deadline</span>
                    </div>
                </div>
            </div>
            <div class="grid-container3">
                <div id="taskInBoard" onclick="openBoard()" class="grid-item deadline deadlineMobile">
                <h1>${allTasks.length}</h1><div class="grid-3-text">Tasks in Board</div>
                </div>
                <div id="taskInProgress" onclick="openBoard()" class="grid-item deadline deadlineMobile">
                    <h1>${inProgress.length}</h1><div class="grid-3-text">Tasks in Progress</div>
                </div>
                <div id="awaitingFeedback" onclick="openBoard()" class="grid-item deadline deadlineMobile">
                    <h1>${awaitFeedback.length}</h1><div class="grid-3-text">Awaiting Feedback</div>
                </div>
            </div>
        </div>
    </div>
  `
}


//greets the user individually either by name or as guest if not logged in
function greeting(user){
    return/*html*/`
    <div id="greeting-container">
        <div id="greet">${getTime()},</div>
        <div id="greet-user">${user[0].name}</div>
    </div>
    `
}