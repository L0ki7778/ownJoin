let allTasks = [];
let toDo = [];
let done = [];
let inProgress = [];
let awaitFeedback = [];
let urgent = [];


async function init() {
  await getAllTasks(remoteKey);
  getUser(sessionKey);
  renderNotes(activeUser)
}

async function categoryFilter() {
  clearSubArrays(toDo, done, inProgress, awaitFeedback, urgent);
  hasContent(toDo, "category", "To Do")
  hasContent(done, "category", "Done")
  hasContent(inProgress, "category", "In Progress")
  hasContent(awaitFeedback, "category", "Await Feedback")
  hasContent(urgent, "prio", "urgent")
}


function renderNotes(activeUser) {
  categoryFilter();
  let body = document.querySelector('body');
  body.innerHTML = renderNavBar();
  body.innerHTML += renderHeader(activeUser);
  let main = document.querySelector('main');
  main.innerHTML = gridContainer();
  let grid = document.getElementById('grid')
  grid.innerHTML += greeting(activeUser)
}


function hasContent(categoryArray, property, string) {
  let arr = allTasks.filter((e) => e[property] == string)
  if (arr.length!=0) {
    categoryArray.splice(0, categoryArray.length, ...arr);
    return categoryArray
  }
}

function clearSubArrays(...array) {
  return array.length = 0
}