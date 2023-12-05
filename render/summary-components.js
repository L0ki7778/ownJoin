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


function gridContainer() {
    return /*html*/`
    <div class ="row">  
        <h1>Join 360</h1>
        <div #blue-line></div>
        <div>Key Metrics at a Glance</div>              
    </div>
    <div id="grid">  
        <div id=grid-main-container>
            <div class="grid-container1">
                <div id="To-Do" class="grid-item"><img src="/assets/img/pen-frame.png" alt=""><div><h1>${toDo.length}</h1><span>To do</span></div></div>
                <div id="Done" class="grid-item"><img src="/assets/img/checkmark-frame.png" alt=""><div><h1>${done.length}</h1> <span>Done</span></div></div>
            </div>
            <div class="grid-container2">
                <div id="urgent" class="grid-item"><div class="displayFlex"><img src="/assets/img/arrow-up.png" alt="">
                    <div>
                        <h1>${urgent.length}</h1><span>Urgent</span>                
                    </div>
                </div>
                <div class="lineUrgent"></div>
                    <div class="deadline">
                        <span><b>Datum</b></span><span>Upcoming Deadline</span>
                    </div>
                </div>
            </div>
            <div class="grid-container3">
                <div id="taskInBoard" class="grid-item deadline">
                <h1>${allTasks.length}</h1><span>Tasks in <br>Board</span>
                </div>
                <div id="taskInProgress" class="grid-item deadline">
                    <h1>${inProgress.length}</h1><span>Tasks in <br>Progress</span>
                </div>
                <div id="awaitingFeedback" class="grid-item deadline">
                    <h1>${awaitFeedback.length}</h1><span>Awaiting <br>Feedback</span>
                </div>
            </div>
        </div>
    </div>
  `
}

function greeting(user){
    return/*html*/`
    <div id="greeting-container">
        <div id="greet">Good Morning,</div>
        <div id="greet-user">${user[0].name}</div>
    </div>
    `
}