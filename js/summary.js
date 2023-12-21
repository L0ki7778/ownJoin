let toDo = [];
let done = [];
let inProgress = [];
let awaitFeedback = [];
let urgent = [];


/**
 * Initializes the application by performing the necessary setup tasks.
 *
 * @return {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function init() {
  await getAllTasks(remoteKey);
  getUser(sessionKey);
  renderNotes(activeUser);
  navActive(0)
}

/**
 * Filters the status of the arrays toDo, done, inProgress, awaitFeedback, and urgent.
 *
 */
async function statusFilter() {
  clearSubArrays(toDo, done, inProgress, awaitFeedback, urgent);
  hasContent(toDo, "status", "To-Do")
  hasContent(done, "status", "Done")
  hasContent(inProgress, "status", "In-Progress")
  hasContent(awaitFeedback, "status", "Await-Feedback")
  hasContent(urgent, "prio", "urgent")
}


/**
 * Renders the notes for the active user.
 *
 * @param {any} activeUser - The active user object.
 */
function renderNotes(activeUser) {
  statusFilter();
  let nav = document.querySelector('nav');
  let header=document.querySelector('header')
  let main = document.querySelector('main');
  nav.innerHTML = renderNavBar();
  header.innerHTML = renderHeader(activeUser);
  main.innerHTML = gridContainer();
  let grid = document.getElementById('grid')
  grid.innerHTML += greeting(activeUser)
}


/**
 * Filters the `allTasks` array based on the `property` and `string` parameters and updates the `statusArray` with the filtered results.
 *
 * @param {Array} statusArray - The array to be updated with the filtered results.
 * @param {string} property - The property to filter the `allTasks` array by.
 * @param {string} string - The value to filter the `allTasks` array by.
 * @return {Array} The updated `statusArray` after filtering.
 */
function hasContent(statusArray, property, string) {
  let arr = allTasks.filter((e) => e[property] == string)
  if (arr.length!=0) {
    statusArray.splice(0, statusArray.length, ...arr);
    return statusArray
  }
}

/**
 * Clears all sub-arrays within a given array.
 *
 * @param {...Array} array - The array containing sub-arrays to be cleared.
 * @return {number} The new length of the array, which is 0 after clearing all sub-arrays.
 */
function clearSubArrays(...array) {
  return array.length = 0
}

/**
 * Opens the board by loading the board.html template in the same window.
 *
 * @param {string} pageUrl - The URL of the board.html template.
 */
function openBoard() {
  let pageUrl = '/html/board.html';
  window.open(pageUrl, '_self');
}