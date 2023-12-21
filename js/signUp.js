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
  password.addEventListener('input', validatePassword);
  confirm_password.addEventListener('input', validatePassword);
}


function validatePassword() {
  let password = document.getElementById("create_password");
  let confirm_password = document.getElementById("confirm_password");
  let div = document.getElementsByClassName("login-input-fields");
  if (password.value !== confirm_password.value) {
    noMatch(div[2], div[3], confirm_password);
  } else if (password.value === confirm_password.value && confirm_password.value.length >= 8) {
    match(div[2], div[3], confirm_password)
    return password.value
  }
}


function noMatch(pawsswordDiv, confirmationDiv, confirm_password) {
  document.getElementById('pw-check-reminder').classList.remove('d-none')
  confirm_password.setCustomValidity("Passwords Don't Match"),
  pawsswordDiv.style = "border: 3px solid red!important";
  confirmationDiv.style = "border: 3px solid red!important";
  disableSignUp();
  return false
}


function match(pawsswordDiv, confirmationDiv, confirm_password) {
  document.getElementById('pw-check-reminder').classList.add('d-none')
  pawsswordDiv.style = "border: 3px solid green!important";
  confirmationDiv.style = "border: 3px solid green!important";
  confirm_password.setCustomValidity('');
  enableSignUp();
  return true
}




function formValidation() {
  let password = validatePassword();
  if (validatePassword) {
    if(isStrongPassword(password)){
      enableSignUp()
    }else{
      password.setCustomValidity(passwordPattern);
      disableSignUp()
    }
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
async function createAccount(name, mail, password) {
  let initials = createInitials(name)
  let user = {
    name: name,
    mail: mail,
    password: password,
    color: randomColor(),
    initials: initials.toUpperCase()
  }
  userList.push(user)
  await setUserList(userKey, userList)
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
  let container = document.getElementById('info-no-mail');
  popUp.innerHTML = text;
  container.style.width = width + "px";
  container.style.transform = "translateY(50%)";
  setTimeout(() => {
    container.style.transform = "translateY(-105%)";
  }, 2000)
}


function isStrongPassword(password) {
  let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\\-]).{8,}$|(?=[0-9]*.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\\-]).{8,}$/;
  let result = regex.test(password);
  return result;
}

