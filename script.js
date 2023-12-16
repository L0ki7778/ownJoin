let activeUser; //needed for the session storage of logged in user
let allTasks = [];//storage and retrieval of all tasks
let assignees=[]; //needed for rendering and manupulatin contact-assignments to specific tasks
let awaitArr=[]; //auxiliary array for filtering awaiting feedback tasks
let counter = 0;  //auxiliary variable for manipulating finished subtasks and adjusting the progressbar
let contacts = []; // storage and retrieval of contacts
let currentDraggedElement; //variable for drag and drop
let doneArr=[]; //auxiliary array for filtering done tasks
let editArr=[];
let editTask; //needed for editing tasks
let editTaskObj;  //auxiliary variable for creatig a new task-object which replaces the original task
let finishedSubTasks=[]; // auxiliary variable for manipulating finished subtasks
let guest = [{
  name: "Dear Guest",
  initials: "G"
}];
let progressArr=[]  //auxiliary array for filtering in progress tasks
let rememberUser=""; //needed for remember-me functionality
let rememberPassword=""; //needed for remember-me functionality
let subTasks=[]; // auxiliary variable for manipulating subtasks
let todoArr=[]; // auxiliary array for filtering todo tasks
let userList; //storage and retrieval of users
let userData; //needed for the session storage of logged in user
const date = new Date();
const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};
const userKey = "userList"; // keys for communicating with remote storage
const contactKey = "Contacts"; // keys for communicating with remote storage
const tasksKey = "allTasks"; // keys for communicating with remote storage
const sessionKey = "activeUser"; // keys for communicating with remote storage
const remoteKey = "allTasks"; // keys for communicating with remote storage
const STORAGE_TOKEN = 'QFOSCYPA967P352YSSOENCUXGKA464XWSUTNI5NT';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';



/**
 * Logs the user's name in the sessionStorage.
 * 
 * The logUser-function is the counterpart of the getUser-function.
 * It saves the user's name in the sessionStorage for the time of the session 
 * and logs one out after closing the window. This my be avoided in some way if the
 * remember-me functionality is used, so that you can login effortlessly.
 *
 * @param {object|string} name - The user's name. It can be an object with `firstName` and `lastName` properties or a string.
 * @return {undefined} 
 */
function logUser(name) {
  if (name.firstName) {
    activeUser = name.firstName + " " + name.lastName;
    return sessionStorage.setItem("activeUser", activeUser)
  } else {
    activeUser = name;
    return sessionStorage.setItem("activeUser", activeUser)
  }
}


/**
 * Retrieves the user data associated with the given session key.
 * This is a limited function for offering guests to explore the website.
 * after logging out or closing the browser, the data will be deleted entirely.
 *
 * @param {string} sessionKey - The session key used to identify the user data.
 * @return {object} The user data retrieved from the session storage.
 */
function getUser(sessionKey) {
  userData = sessionStorage.getItem(sessionKey)
  activeUser = JSON.parse(userData)
  return activeUser
}


/**
 * Saves user login information in the local storage if the rememberUser variable-type="checkbox" is not empty.
 * If the rememberUser variable is empty, it retrieves the user email and password from the login form,
 * saves them in the local storage, and associates them with the "user" and "password" keys(getUserList-function).
 *
 * @param {type} rememberUser - the value of the rememberUser variable
 * @param {type} rememberPassword - the value of the rememberPassword variable
 * @return {type} no return value
 */
function rememberMe(){
  if(rememberUser!==""){
    localStorage.clear()
  }else{
    rememberUser = document.getElementById('login-mail').value
    rememberPassword = document.getElementById('login-password').value
  
    localStorage.setItem("user",rememberUser)
    localStorage.setItem("password",rememberPassword)
  }
}


/**
 * Retrieves the remembered user and password from local storage and populates the login form with the values. 
 * If a remembered user is found, the "Remember Me" checkbox is also checked and the login button is enabled.
 *
 * @return {undefined} This function does not return a value.
 */
function getRememberedUser(){
  rememberUser = localStorage.getItem("user")||"";
  rememberPassword = localStorage.getItem("password")||"";

  document.getElementById('login-mail').value=rememberUser
  document.getElementById('login-password').value=rememberPassword
  if(rememberUser!== ""){
    checkboxClick();
    document.getElementById('login-btn').disabled = false
  }
}


/**
 * Sets the user list by making a POST request to the storage API.
 *
 * @param {string} key - The key to set in the user list.
 * @param {string} value - The value to set in the user list.
 * @return {Promise<object>} A promise that resolves to the JSON response from the API.
 */
async function setUserList(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };

  const response = await fetch(STORAGE_URL, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return await response.json();
}


/**
 * Retrieves the user list from the server using the provided key.
 *
 * @param {string} key - The key used to authenticate the request.
 * @return {undefined} This function does not return a value.
 */
async function getUserList(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Fehler beim Laden der Kontakte");
    }
    const data = await response.json();
    userList = JSON.parse(data.data.value) || [];
    console.log(userList);
  } catch (error) {
    console.error(error);
  }
}


/**
 * Retrieves all tasks from the server.
 *
 * @param {string} key - The key to authenticate the request.
 * @return {Promise<Array>} - A promise that resolves to an array of tasks.
 */
async function getAllTasks(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  await fetch(url)
    .then((res) => res.json())
    .then(json => {
      let arr = json.data.value;
      let parsedArr = JSON.parse(arr);
      Array.isArray(parsedArr) ? allTasks= parsedArr : allTasks.push(parsedArr);
      return allTasks
    });

}


/**
 * Sets the todos/tasks in the storage using the provided key and value,
 *
 * @param {string} key - The key to set.
 * @param {any} value - The value to set for the key.
 * @return {Promise<any>} - A Promise that resolves to the response JSON.
 */
async function setAllTasks(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}



/**
 * Sets the contacts in the storage using the provided key and value,
 * after creating a contact through the contact section---->add new contact.
 *
 * @param {string} key - The key to identify the contacts.
 * @param {any} value - The value of the contacts to be stored.
 * @return {Promise<any>} A promise that resolves to the response JSON.
 */
async function setContacts(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}



/**
 * Retrieves contacts from the server using the provided key.
 * The contacts are needed for assigning tasks. They differ from the
 * userslist in that they dont log in but can be added to the contactlist
 * from the users view.
 *
 * @param {string} key - The key to access the contacts.
 * @return {Promise<Array>} - A promise that resolves to an array of contacts.
 */
async function getContacts(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  await fetch(url)
    .then((res) => res.json())
    .then(json => {
      let arr = json.data.value;
      contacts = JSON.parse(arr)
      return contacts
    });
}



/**
 * Opens the icon-menu if the profile-icon within the header is clicked.
 *
 * @param {Event} event - The event that triggered the function.
 */
function openMenu() {
  let menu = document.getElementById('header-icon-menu');
  menu.classList.remove('d-none');
  addMenuEvent();
}



/**
 * Adds an event listener to the HTML document that listens for a click event and triggers the closeMenu function.
 * the closeMenu function closes the icon-menu.
 * 
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function addMenuEvent() {
  let html = document.querySelector('html');
  html.addEventListener('click', closeMenu)
};



/**
 * Closes the icon-menu if the event target is not the profile icon or the menu itself.
 *
 * @param {Event} event - The event that triggered the function.
 */
function closeMenu(event) {
  let html = document.querySelector('html');
  let menu = document.getElementById('header-icon-menu');
  let icon = document.getElementById('profile-icon');
      if ( event.target !== icon && event.target !== menu) {
      menu.classList.add('d-none');
      html.removeEventListener('click', closeMenu)
    }
  
}


/**
 * Returns a greeting on summary page based on the current time.
 *
 * @return {string} The greeting based on the current time.
 */
function getTime(){
  let s= new Date().toLocaleString();
  let hour = s.split(' ');
  let diggit=hour[1].slice(0,2);
  if(diggit<11){
    return "Good Morning"}else if(diggit>=11 && diggit<15)
    {return "Good Day"}else if(diggit>=15 && diggit<17)
    {return "Good Afternoon";}else
    {return "Good Evening"}
}


/**
 * Generates a comment for the given function body.
 * A generall function for every checkbox click without 
 * addidtional affiliatied functions like editing something.
 *
 * @param {number} i - The index parameter for the checkbox click.
 * @return {undefined} This function does not return a value.
 */
function checkboxClick(i) {
  let checkbox = document.getElementById(`check${i}`);
  let img = document.getElementById(`img-box${i}`);
  loginCheckBox(checkbox, img);
  }


  
/**
 * Toggles the state of the login-checkbox and updates the corresponding image.
 *
 * @param {HTMLInputElement} box - The checkbox element.
 * @param {HTMLImageElement} img - The image element associated with the checkbox.
 */
function loginCheckBox(box, img){
  if (box.checked) {
    box.checked = false;
    img.src = '/assets/img/checkbox.png';
    img.style = "";
  } else if (!box.checked) {
    box.checked = true;
    img.src = '/assets/img/checked-box.png';
    img.style = 'width: 18px; height: 18px';
  }
}


/**
 * Sets the active class on the i-th element of the 'navLinkImg' class.
 * So the actually active page will have the 'active' class within the navbar.
 *
 * @param {number} i - The index of the element to set as active.
 */
function navActive(i){
  let active = document.getElementsByClassName('navLinkImg');
  active[i].classList.add('active')
}


/**
 * Splits a name string into first name and last name.
 *
 * @param {string} name - The name string to be split.
 * @return {object} - An object containing the first name and last name.
 */
function differMultipleNames(name) {
  let nameArr = name.split(' ');
  if (nameArr.length == 2) {
    name = {
      firstName: nameArr[0],
      lastName: nameArr[1]
    }
  };
  return name
}


/**
 * Generates the initials from a given name.
 *
 * @param {string} name - The name to generate the initials from.
 * @return {string} The initials generated from the name.
 */
function createInitials(name) {
  let item = differMultipleNames(name)
  if (item.firstName) {
    return initials = item.firstName.slice(0, 1) + item.lastName.slice(0, 1);
  } else {
    return initials = item.slice(0, 1)
  }
}


/**
 * Logs the user out by clearing the session storage and redirecting to the index page.
 *
 * @param {} 
 * @return {} 
 */
function logOut(){
  sessionStorage.clear();
  window.location.replace("/Index.html");
}