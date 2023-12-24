let data;
const noAcc="Es ist kein Konto mit dieser Email-Adresse registriert.";
const wrongPass ="Email-Adresse oder Passwort stimmen nicht überein";
const passwordPattern = "Bitte verwende Groß- und Kleinbuchstaben, sowie ein Sonderzeichen(#?!@$%^&*-) und mindestens eine Nummer";



/**
 * Initializes the application by setting the event listener,
 * adding the log in handler, fetching the user list, and
 * disabling the animation.
 *
 * @return {ListOfSignedUpUsers - Promise} - A promise that resolves once the
 * initialization is complete.
 */
async function init() {
  setEventListener();
  addLogInHandler();
  await getUserList(userKey);
  disableAnimation();
}


/**
 * When DOM is loaded, the Logo will be animated to the top left
 * rigth corner and the Login will turn visible
 * 
 * gets executed within the init function
 *
 */
function disableAnimation(){
  let div = document.getElementById('logo');
  setTimeout(() => {
    div.classList.add('logo-render')
  }, 2000)
}


/**
 * Sets event listeners for the password input fields ---> lock icons
 * for signup-and login-screen
 * 
 * Gets executed within the init function
 *
 *
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
 * eventListenerFunction set by setEventListener()
 * 
 * Changes the lock icon and container class when a password input field is clicked.
 * Lock icon changes to 'visibility.png' when input ist clicked and back to 
 * 'visibility_off.png' and offers the possibility to show the password.
 *
 * @param {NodeList} eye - The lock icons in the DOM.
 * @param {NodeList} input - The password input fields in the DOM.
 * @param {NodeList} container - The eye container elements in the DOM.
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
 * eventListenerFunction set by setEventListener()
 * 
 * Restore the lock functionality as well as icon.
 * If the input field is empty and body(anything but #login-container) 
 * is clicked, the lock icon will be restored.
 *
 * @param {type} - The type of the parameter.
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
 * eventListenerFunction set by setEventListener()
 * 
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
 * Responisible for validating the requirements for
 * demanded password-patterns as well as matching
 * passwords when cofirming the password.
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
 * @param {HTMLElement} mail - The element representing the email field.
 * @param {HTMLElement} password - The element representing the password field.
 * @param {HTMLElement} button - The element representing the login button.
 */
function enableLogIn() {
  const mail = document.getElementById('login-mail');
  const password = document.getElementById('login-password');
  const button = document.getElementById('login-btn')
  if (mail.value !== 0 && password.value !== 0) {
    button.disabled = false
  }
}



/**
 * Logs in the user by checking if the entered email and password match
 * with the stored credentials. If the login is successful, the user is
 * redirected to the summary page. Otherwise, a popup is displayed indicating
 * that the password is incorrect.
 *
 */
function logIn() {
  let match = matchingPassword();
  let mail = document.getElementById('login-mail');
  let password = document.getElementById('login-password');
  if (match.length === 0) {
    return popUp(noAcc,575)
  } else if (mail.value === match[0].mail && password.value === match[0].password) {
    logUser(JSON.stringify(match))
    location.replace('/html/summary.html')
  } else {
    popUp(wrongPass,567)
  }
}


/**
 * Logs in a guest user and redirects to the summary page.
 * 
 * logUser:script.js:41
 * compares login-data with userlist. 
 * get´s a prepared guest-account to log in with
 * to experience the website without having to register
 *
 */
function guestLogIn() {
  logUser(JSON.stringify(guest))
  location.replace('/html/summary.html');
}


/**
 * This function filters the `userList` array to find 
 * objects with a `mail`  property that matches the 
 * value of the `login-mail` element in the DOM.
 *
 * @return {Array} An array with one object matching the mail
 *                 of the typed in email
 */
function matchingPassword() {
  let mail = document.getElementById('login-mail');
  return userList.filter((e) => e.mail === mail.value)

};



/**
 * Handles the click event of the checkbox.
 * 
 * function:signUpCheckBox: signUp.js:84
 *    * Toggles the state of a checkbox and updates the corresponding image.
 *    * Enables registration button if all other conditions are met.
 *
 * @param {Element} checkbox - The checkbox element.
 * @param {Element} img - The image element.
 */
function checkboxClick() {
  let checkbox = document.getElementById("check");
  let img = document.getElementById("checkbox");
  if(document.getElementById('signup-container')!=null){
    signUpCheckBox(checkbox, img)
  }else if(document.getElementById('login-container')!=null){
    loginCheckBox(checkbox, img)
  }
}



/**
 * Toggles the state of a checkbox and updates the corresponding image.
 *
 * @param {HTMLInputElement} box - The checkbox element.
 * @param {HTMLImageElement} img - The image element.
 */
function loginCheckBox(box, img){
  if (box.checked) {
    box.checked = false;
    img.src = '/assets/img/checkbox.png';
    img.style = "";
  } else if (!box.checked) {
    box.checked = true;
    img.src = '/assets/img/checked-box.png';
    img.style = 'width: 1.25rem; height: 1.25rem;transform:translate(.3125rem,.3125rem);margin-right:.9rem';
  }
}

