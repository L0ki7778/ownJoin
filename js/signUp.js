const success = "You signed in succsessfully";
const existingMail = "Your email is already in use";


/**
 * Adds a sign-up handler to the page.
 *
 * @param {void} None - No parameters are needed.
 * @return {void} No return value.
 */
function addSignUpHandler() {
  let password = document.getElementById("create_password");
  let confirm_password = document.getElementById("confirm_password");
  function validatePassword() {
    let div = document.getElementsByClassName("login-input-fields");
    for (let i = 2; i < div.length; i++) {
      if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match"),
          div[i].style.border = "3px solid red";
        disableSignUp(); return false
      } else if (confirm_password.value.length > 0) {
        div[i].style.border = "3px solid green"
        confirm_password.setCustomValidity('');
        enableSignUp(); return true
      }
    }
  }
  password.oninput = validatePassword;
  confirm_password.oninput = validatePassword;
}

function formValidation() {
  if (addSignUpHandler) {
    enableSignUp()
  } else {
    disableSignUp()
  }
}


/**
 * Enables the sign-up button if both the username and email input fields have a value.
 *
 * @param {string} username - The ID of the username input field.
 * @param {string} email - The ID of the email input field.
 * @param {string} button - The ID of the sign-up button.
 */
function enableSignUp() {
  let name = document.getElementById('username');
  let mail = document.getElementById('sign-up_mail');
  let button = document.getElementById('signup-btn');
  let checkbox = document.getElementById('check')
  if (name.value !== 0 && mail.value !== 0 && checkbox.checked) {
    button.disabled = false
  }
}

function disableSignUp() {
  let button = document.getElementById('signup-btn');
  button.disabled = true
}


function signUpCheckBox(box, img) {
  if (box.checked) {
    box.checked = false;
    img.src = '/assets/img/checkbox.png';
    img.style = "";
    disableSignUp()
  } else if (!box.checked) {
    box.checked = true;
    img.src = '/assets/img/checked-box.png';
    img.style = 'width: 20px; height: 20px;transform:translate(5px,5px);margin-right:12px';
  }
}


/**
 * Sign up a new user.
 *
 * @param {string} name - The name of the user.
 * @param {string} mail - The email address of the user.
 * @param {string} password - The password for the user account.
 * @return {void} This function does not return anything.
 */
function signUp() {
  let name = document.getElementById('username').value;
  let mail = document.getElementById('sign-up_mail').value;
  let password = document.getElementById('create_password').value;
  if (findExistingAccount(mail)) {
    return popUp(existingMail, 373)
  } else { createAccount(name, mail, password) }
}


/**
 * Finds an existing account based on the given email.
 *
 * @param {string} mail - The email to search for.
 * @return {boolean} Returns true if an existing account is found, false otherwise.
 */
function findExistingAccount(mail) {
  console.log(mail)
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].mail === mail) {
      return true
    }
  }
}


/**
 * Creates a new user account with the provided name, email, and password.
 *
 * @param {string} name - The name of the user.
 * @param {string} mail - The email of the user.
 * @param {string} password - The password of the user.
 */
function createAccount(name, mail, password) {
  let initials = createInitials(name)
  const user = {
    name: name,
    mail: mail,
    password: password,
    color: randomColor(),
    initials: initials.toUpperCase()
  }
  userList.push(user)
  setUserList(key, userList)
  popUpSignUp(success)
  setTimeout(() => {
    renderLogin()
  }, 2000)
}


function popUpSignUp(text) {
  let popUp = document.getElementById('pop-up');
  let overlay = document.getElementById('overlay')
  popUp.innerHTML = text;
  overlay.classList.remove('d-none')
}

function popUp(text, width) {
  let popUp = document.getElementById('info-text');
  let container = document.getElementById('info');
  popUp.innerHTML = text;
  container.style.width = width + "px";
  container.style.transform = "translateY(0%)";
  setTimeout(() => {
    container.style.transform = "translateY(-105%)";
  }, 2000)
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
 * Generates a random color from a predefined list of colors.
 *
 * @return {string} The randomly generated color.
 */

function randomColor() {
  let colors = ["#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8", "#1FD7C1", "#FF745E",
    "#FFA35E", "#FC71FF", "#FFC701", "#0038FF", "#C3FF2B", "#FFE62B", "#FF4646", "#FFBB2B"];
  let randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
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