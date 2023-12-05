let data;
const noAcc="Es ist kein Konto mit dieser Email-Adresse registriert."
const wrongPass ="Email-Adresse oder Passwort stimmen nicht überein";


/**
 * Initializes the application.
 *
 * @return {Promise<void>} A promise that resolves when initialization is complete.
 */
async function init() {
  setEventListener();
  addLogInHandler();
  await getUserList(userKey);
  disableAnimation();
}


function disableAnimation(){
  let div = document.getElementById('logo');
  setTimeout(() => {
    div.classList.add('logo-render')
  }, 2000)
}


/**
 * Sets event listeners for password input fields and lock icons.
 *
 * @param {type} None - No parameters required.
 * @return {type} None - No return value.
 */
function setEventListener() {
  let body = document.querySelector('body')
  let input = document.getElementsByClassName('password');
  let eye = document.getElementsByClassName('lock');
  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener('click', changeLock())
    eye[i].addEventListener('click', changeEye)
  }
  body.addEventListener('click', restoreLock)
}



/**
 * A function that changes the lock visibility based on user interaction.
 *
 * @param {type} None
 * @return {type} None
 */
function changeLock() {
  let eye = document.getElementsByClassName('lock');
  let input = document.getElementsByClassName('password');
  let container = document.getElementsByClassName('eye-container');
  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener('click', e => {
      if (e.target == input[i] && e.target != eye[i] && !eye[i].src.includes('visibility.png')) {
        eye[i].src = 'assets/img/visibility_off.png';
        container[i].classList.add('lock-container')
      };
    });
  }
}



/**
 * Restores the lock functionality when the body is clicked.
 *
 * @param {type} event - the click event object
 * @return {undefined} This function does not return a value
 */
function restoreLock() {
  let body = document.querySelector('body');
  let input = document.getElementsByClassName('password');
  let eye = document.getElementsByClassName('lock');
  let container = document.getElementsByClassName('eye-container');
  body.addEventListener('click', function (event) {
    for (let i = 0; i < input.length; i++) {
      if (event.target == body && event.target != input[i] && event.target != eye[i] && input[i].value == "") {
        eye[i].src = 'assets/img/lock.png';
        container[i].classList.remove('lock-container');
      }
    }
  });
}



/**
 * Toggles the visibility of password fields based on the state of the eye icon clicked.
 *
 * @param {Event} event - The event object that triggered the function.
 * @return {void} This function does not return a value.
 */
function changeEye(event) {
  let eye = document.getElementsByClassName('lock');
  let input = document.getElementsByClassName('password');
  for (let i = 0; i < input.length; i++) {
    if (event.target == eye[i] && eye[i].src.includes('visibility_off.png')) {
      input[i].setAttribute('type', 'text');
      eye[i].src = 'assets/img/visibility.png';
    } else if (event.target == eye[i] && eye[i].src.includes('visibility.png')) {
      input[i].setAttribute('type', 'password');
      eye[i].src = 'assets/img/visibility_off.png';
    }
  }
  event.stopPropagation();
}


/**
 * Adds a log in handler to the login form.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function addLogInHandler() {
  let name = document.getElementById('login-mail');
  let password = document.getElementById('login-password');
  /**
   * Validates the log in by checking if the name and password meet the required criteria.
   *
   * @param {string} name - The name input value.
   * @param {string} password - The password input value.
   */
  function validateLogIn() {
    if (name.value.length > 0 && password.value.length > 7) {
      enableLogIn()
    }
  }
  name.oninput = validateLogIn;
  password.oninput = validateLogIn;
}


/**
 * Enables the login button if both the email and password fields are filled.
 *
 * @param {HTMLElement} name - The element representing the email field.
 * @param {HTMLElement} password - The element representing the password field.
 * @param {HTMLElement} button - The element representing the login button.
 */
function enableLogIn() {
  const name = document.getElementById('login-mail');
  const password = document.getElementById('login-password');
  const button = document.getElementById('login-btn')
  if (name.value !== 0 && password.value !== 0) {
    button.disabled = false
  }
}


function checkboxClick() {
  let checkbox = document.getElementById("check");
  let img = document.getElementById("checkbox");
  if(document.getElementById('signup-container')!=null){
    signUpCheckBox(checkbox, img)
  }else if(document.getElementById('login-container')!=null){
    loginCheckBox(checkbox, img)
  }
}

function loginCheckBox(box, img){
  if (box.checked) {
    box.checked = false;
    img.src = '/assets/img/checkbox.png';
    img.style = "";
  } else if (!box.checked) {
    box.checked = true;
    img.src = '/assets/img/checked-box.png';
    img.style = 'width: 20px; height: 20px;transform:translate(5px,5px);margin-right:12px';
  }
}


/**
 * Logs in the user by validating the email and password entered.
 *
 * @return {undefined} Displays alert messages or redirects to another page.
 */
function logIn() {
  let match = matchingPassword();
  let mail = document.getElementById('login-mail');
  let password = document.getElementById('login-password');
  if (match.length === 0) {
    return popUp(noAcc,575)
  } else if (mail.value === match[0].mail && password.value === match[0].password) {
    logUser(JSON.stringify(match))
    console.log(match)
    console.log(JSON.stringify(match))
    location.replace('./assets/templates/summary.html')
  } else {
    popUp(wrongPass,567)
  }
}


function guestLogIn() {
  logUser(JSON.stringify(guest))
  location.replace('./assets/templates/summary.html')
}



/**
 * This function filters the `userList` array to find objects with a `mail` property that matches the value of the `login-mail` element in the DOM.
 *
 * @return {Array} An array of objects that have a `mail` property matching the value of the `login-mail` element.
 */
function matchingPassword() {
  let mail = document.getElementById('login-mail');
  return userList.filter((e) => e.mail === mail.value)

};

