const doubleName="Contact already exists";
const doubleMail="Email already exists";


/**
 * Provides letters for comparison by rendering the
 * contacts
 * 
 * @type {Array<string>}
 */
let letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]


/**
 * Initializes the application by performing the necessary setup tasks.
 *
 * @return {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function init() {
  await getContacts(contactKey);
  getUser(sessionKey);
  renderContactPage(activeUser);
  renderRegister();
  navActive(3);
  hideUnusedLetters();
  calcBarHeight();
  addContactFormListener();
  addContactEditListener();
}


/**
 * Renders the contacts for the active user.
 * 
 * @param {any} activeUser - The active user object.
 */
function renderContactPage(activeUser) {
  let body = document.querySelector("body");
  let section = document.querySelector("section");
  let header = document.querySelector("header");
  let nav = document.querySelector("nav");
  let main = document.querySelector("main");
  nav.innerHTML = renderNavBar();
  header.innerHTML = renderHeader(activeUser);
  section.innerHTML = renderContactSection();
  main.innerHTML += renderAddContactButtonMobile();
  clearHTML();
  body.innerHTML += renderContactPopUp();
  body.innerHTML += renderEditPopUp();

}


/**
 * Hides the unused letters in the register where there are no contacts.
 * 
 */
function hideUnusedLetters() {
  let divElements = document.querySelectorAll(".test");
  let divRegister = document.querySelectorAll(".register");
  let divLine = document.querySelectorAll(".registerLineDiv");
  divElements.forEach((element, index) => {
    if (element.innerHTML.trim() === "") {
      divRegister[index].classList.add("d-none");
      divLine[index].classList.add("d-none");
    } else {
      divRegister[index].classList.remove("d-none");
      divLine[index].classList.remove("d-none");
    }
  });
}





/**
 * Creates a contact based on the values entered in the profile form.
 *
 * @return {object} This function returns a new contact if the requirements are met.
 */
function editContact(contactId) {
  let index= contacts.findIndex(e=>e.id==contactId)
  contacts.splice(index,1)
  let fullName = document.getElementById("editName");
  let initials = createInitials(fullName.value);
  let email = document.getElementById("editEmail");
  let nameObj = differMultipleNames(fullName.value);
  let contact= editObject(nameObj,initials,contactId);
  if(checkEditDuplicateMail(email.value)){return}
  else if(checkEditDuplicateName(fullName.value)){return}
  else{
    return contactCreation(contact),openProfile(contactId);}
}






/**
 * Opens the edit popup for the contact you clicked on from the register.
 * 
 * @param {string} id - This is the id of the contact you click on. 
 */
function editProfile(id) {
  let object = contacts.filter((contact) => contact.id === id)[0];
  openPopUpEditContact(object);
  document.getElementById("editName").value = object.fullName;
  document.getElementById("editEmail").value = object.email;
  document.getElementById("editNumber").value = object.phoneNumber;
  let img = document.getElementById("profile-img-div");
  img.innerText = object.initials;
  img.style.backgroundColor = object.color;
}


/**
 * Opens the edit popup for a contact. 
 */
function openPopUpEditContact() {
  document.getElementById("editContactPopUp").classList.remove("d-none");
}


/**
 * Closes the edit popup for a contact. 
 */
function closePopUpEditContact() {
  document.getElementById("editContactPopUp").classList.add("d-none");
}


/**
 * Safes the eddited contact.
 * 
 * @param {string} id - This is the id of the contact you're edditing.
 * @returns 
 */
async function saveContact(id) {
  if (id == undefined) {
    return;}
  let getObject = contacts.filter((e) => e.id == id)[0];
  let index = contacts.findIndex((e) => e.id == id);
  let editedObject = editObject(getObject);
  contacts[index] = editedObject;
  await setContacts(contactKey, contacts);
  closePopUpEditContact();
  init();
  openProfile(id);
}


/**
 * Deletes the current contact.
 * 
 * @param {string} id - This is the id of the contact you're edditing.
 */
async function deleteContact(id) {
  let object = contacts.find((contact) => contact.id === id);
  if (object) {
    let index = contacts.indexOf(object);
    contacts.splice(index, 1);}
  await setContacts(contactKey, contacts);
  init();
}


/**
 * Opens the popup where you can add a contact.
 */
function openPopUpAddContact() {
  document.getElementById("addContactPopUp").classList.remove("d-none");
}


/**
 * closes the popup where you can add a contact.
 */
function closePopUpAddContact() {
  let popUpContainer = document.getElementById("addContactPopUp");
  let popUp = document.getElementById("addContact");
  popUp.style = "animation:slide-contact-out 0.15s linear forwards";
  setTimeout(() => {
    popUpContainer.classList.add("d-none");
    popUp.style.animation = "";
  }, 30);
}


/**
 * Creates a contact based on the values entered in the profile form.
 *
 * @return {object} This function returns a new contact if the requirements are met.
 */
function createContact() {
  let fullName = document.getElementById("profileName");
  let initials = createInitials(fullName.value);
  let email = document.getElementById("profileEmail");
  let nameObj = differMultipleNames(fullName.value);
  let contact= newContactObject(nameObj,initials);
  if(checkForDuplicateMail(email.value)){return}
  else if(checkForDuplicateName(fullName.value)){return}
  else{contactCreation(contact)}
}


/**
 * Creates a new contact and adds it to the list of contacts.
 *
 * @param {Object} contact - The contact object to be added.
 * @return {Promise} A promise that resolves when the contact is successfully added.
 */
async function contactCreation(contact){
  contacts.push(contact);
    await setContacts(contactKey, contacts);
    closePopUpAddContact();
    renderRegister();
    hideUnusedLetters();
    clearContactInputs();
    return closePopUpEditContact();
}

function clearContactInputs(){
  document.getElementById("profileName").value = "";
  document.getElementById("profileEmail").value = "";
  document.getElementById("profileNumber").value = "";
  document.getElementById("editName").value = "";
  document.getElementById("editEmail").value = "";
  document.getElementById("editNumber").value = "";
}


/**
 * Generates a new contact object based on the given name array and initials.
 *
 * @param {Object} nameObj - An array containing the first name and last name of the contact.
 * @param {string} initials - The initials of the contact.
 * @return {Object} The newly generated contact object.
 */
function newContactObject(nameObj,initials){
  let email = document.getElementById("profileEmail").value;
  let number = document.getElementById("profileNumber").value;
  let fullName=typeof nameObj == "object" ? nameObj.firstName + " " + nameObj.lastName : nameObj
  let firstName = nameObj.firstName||" ";
  let name = nameObj.lastName||nameObj;
  let contact = {
    fullName: fullName,
    firstName: firstName,
    name: name,
    id: Date.now(),
    email: email,
    color: randomColor(),
    phoneNumber: number,
    initials: initials.toUpperCase(),
  };return contact
}


/**
 * Gives a color to an created contact by his id.
 * 
 * @param {string} id - This is the id of the contact you're giving a color.
 * @param {string} color - This is the color you're giving to the contact.
 */
function getRandomColor(id, color) {
  let divName = document.getElementById(id);
  divName.style.backgroundColor = color;
}


/**
 * Calculates the barheight of the contact scroll div.
 */
function calcBarHeight() {
  let header = document.querySelector("header");
  let item = document.getElementById("contacts-bar");
  let height = window.innerHeight - header.offsetHeight;
  item.style.height = height + "px";
  calcHeight();
}


/**
 * Calculates the height of the add new contact popup.
 */
function calcHeight() {
  let header = document.querySelector("header");
  let btn = document.getElementById("addNewContact");
  let register = document.getElementById("register");
  let height = window.innerHeight - header.offsetHeight - btn.offsetHeight;
  register.style.height = height - 20 + "px";
}


/**
 * Clears all inputs of the add task page.
 */
function clearContactsForm() {
  let input = document.getElementsByClassName("contact-creation-inputs");
  for (let i = 0; i < input.length; i++) {
    input[i].value = "";
  }
}


/**
 * Takes the informations that got eddited and returns the eddited contact.
 * 
 * @param {string} person - This is the id of the contact you have clicked on in the contact list. 
 * @returns the eddited contact information.
 */
function editObject(nameObj,initials,contactId) {
  let email = document.getElementById("editEmail").value;
  let number = document.getElementById("editNumber").value;
  let fullName=typeof nameObj == "object" ? nameObj.firstName + " " + nameObj.lastName : nameObj
  let firstName = nameObj.firstName||" ";
  let name = nameObj.lastName||nameObj;
  let contact = {
    fullName: fullName,
    id: contactId,
    email: checkForDuplicateMail(email.value),
    phoneNumber: document.getElementById("editNumber").value,
    initials: initials.toUpperCase(),
    firstName: firstName,
    name: name,
    id: parseInt(contactId),
    email: email,
    color: randomColor(),
    phoneNumber: number,
  };return contact
}


/**
 * Higlights the contact you have clicked on in the contact list.
 * 
 * @param {string} person - This is the id of the contact you have clicked on in the contact list.
 */
function contactActive(id) {
  let allElements = document.querySelectorAll(".contact");
  allElements.forEach((element) => {
    if (element.id !== id) {element.classList.remove("activeContact")}
  });
  let active = document.getElementById(id);
  active.classList.add("activeContact");
}


/**
 * Swappes the mobile Buttons of the mobile contact page.
 */
function setZindex() {
  let div = document.getElementById('zIndex');
  div.classList.add('zIndex');
  let arrow = document.getElementById('arrowContact');
  arrow.classList.remove('d-none');
  let button = document.getElementById('contactButtonMobile');
  button.classList.add('d-none');
  let menu = document.getElementById('menuContactButtonMobile');
  menu.classList.remove('d-none');
}


/**
 * Swappes the mobile Buttons of the mobile contact page the otherway around.
 */
function removeZindex() {
  let div = document.getElementById('zIndex');
  div.classList.remove('zIndex');
  let arrow = document.getElementById('arrowContact');
  arrow.classList.add('d-none');
  let menu = document.getElementById('menuContactButtonMobile');
  menu.classList.add('d-none');
  let button = document.getElementById('contactButtonMobile');
  button.classList.remove('d-none');
}


/**
 * Adds d-none to two buttons.
 */
function removeDNone() {
  let button = document.getElementById('buttonsPopUpMobile');
  button.classList.remove('d-none');
  let menu = document.getElementById('menuContactButtonMobile');
  menu.classList.add('d-none');
}


/**
 * Removes d-none of two buttons.
 */
function addDNone() {
  let button = document.getElementById('buttonsPopUpMobile');
  button.classList.add('d-none');
  let menu = document.getElementById('menuContactButtonMobile');
  menu.classList.remove('d-none');
}


/**
 * Clears the HTML of the inputfields in the edit contact popup.
 */
function clearHTML() {
  if (document.getElementById('editContactPopUp') !== null) {
    let mobileBtn = document.getElementById('mobile-add-btn');
    let popup = document.getElementById('editContactPopUp');
    let popUpTwo = document.getElementById('addContactPopUp');
    mobileBtn.parentNode.removeChild(mobileBtn);
    popup.parentNode.removeChild(popup);
    popUpTwo.parentNode.removeChild(popUpTwo);
  }
}

document.addEventListener('click', function(event) {
  let zIndexDiv = document.getElementById('zIndex');
  let buttonsPopUpMobile = document.getElementById('buttonsPopUpMobile');

  // Überprüfen, ob das geklickte Element die DIV mit der ID "zIndex" ist
  if (event.target === zIndexDiv) {
      // Überprüfen, ob die Klasse "d-none" noch nicht zugewiesen ist
      if (!buttonsPopUpMobile.classList.contains('d-none')) {
          // Füge die Klasse "d-none" hinzu
          buttonsPopUpMobile.classList.add('d-none');
          let menu = document.getElementById('menuContactButtonMobile');
          menu.classList.remove('d-none');
      }
  }
});

