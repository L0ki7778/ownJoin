/**
 * Provides letters for comparison by rendering the
 * contacts
 * 
 * @type {Array<string>}
 */
let letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];



async function init() {
  await getContacts(contactKey);
  getUser(sessionKey);
  renderContactPage(activeUser);
  renderRegister();
  navActive(3);
  hideUnusedLetters();
  calcBarHeight();
}

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

function renderRegister() {
  let register = document.getElementById("register");
  register.innerHTML = "";

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    register.innerHTML += `
      <div class="register">
        <span>${letter}</span>
      </div>
      <div class="registerLineDiv">
        <div class="registerLine">
        </div>
      </div>
      <div id="${letter}" class="test">
      </div>
    `;

    renderContacts(`${letter}`);
  }
}

function renderContacts(letter) {
  let container = document.getElementById(`${letter}`);
  container.innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let initials = contact.initials.split("");
    let initial = initials[0];
    if (contacts[i].initials.length > 1) {
      initial = contact.initials.slice(0, 1);
    } else {
      initial = contact.initials;
    }

    if (letter === `${initial}`) {
      container.innerHTML += `
        <div id="${contact.name}${i}" onclick="openProfile('${contact.id}'); contactActive('${contact.name}${i}');  setZindex();" class="contact">
        
        <div>
            <span id="${contact.id}" class="initials">${contact.initials}</span>
        </div>
        <div class="nameLinkDiv">
            <span class="fullName">${contact.fullName}</span>
            <a class="emailLinks" href="#">${contact.email}</a>
        </div>
    </div>`;
      getRandomColor(contact.id, contact.color);
    }
  }
}

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

function openProfile(id) {
  let userProfile = document.getElementById("userProfile");
  let user = [];
  contacts.map((e) => {
    if (e.id == id) {
      user.push(e);
    }
  });
  let e = user[0];
  userProfile.innerHTML = "";

  userProfile.innerHTML = `<div>
    <div class="topProfile">
        <div class="profile-initials-pseudo-img" style="background-color:${e.color}">
           ${e.initials}
        </div>
    <div class="nameProfile"><h2 class="h2">${e.fullName}</h2><div class="buttonsPopUp"><Button onclick="editProfile(${e.id})" class="buttonPopUp"><img src="/assets/img/edit.png" alt=""> Edit</Button><Button onclick="deleteContact(${e.id})" class="buttonPopUp"><img src="/assets/img/delete.png" alt=""> Delete</Button></div></div>
    </div>
    <p class="pProfile">Contact Information</p>
    <p><b>Email</b></p>
    <a class="profileLink" href="">${e.email}</a>
    <p class="pMail"><b>Phone</b></p>
    <p>${e.phoneNumber}</p>
  </div>
  <div id="buttonsPopUpMobile" class="buttonsPopUpMobile d-none"><Button onclick="editProfile(${e.id}); addDNone();" class="buttonPopUpMobile"><img src="/assets/img/edit.png" alt=""> Edit</Button><Button onclick="deleteContact(${e.id}); addDNone();" class="buttonPopUpMobile"><img src="/assets/img/delete.png" alt=""> Delete</Button></div>`;
}

function editProfile(id) {
  let object = contacts.filter((contact) => contact.id === id)[0];
  let index = contacts.indexOf(object);
  openPopUpEditContact(object);
  document.getElementById("editName").value = object.fullName;
  document.getElementById("editEmail").value = object.email;
  document.getElementById("editNumber").value = object.phoneNumber;
  let img = document.getElementById("profile-img-div");
  img.innerText = object.initials;
  img.style.backgroundColor = object.color;
  let button = document.getElementById("saveButton");
  button.setAttribute("onclick", `saveContact(${id})`);
}

function openPopUpEditContact() {
  document.getElementById("editContactPopUp").classList.remove("d-none");
}

function closePopUpEditContact() {
  document.getElementById("editContactPopUp").classList.add("d-none");
}

async function saveContact(id) {
  if (id == undefined) {
    return;
  }
  let getObject = contacts.filter((e) => e.id == id)[0];
  let index = contacts.findIndex((e) => e.id == id);
  let editedObject = editObject(getObject);

  contacts[index] = editedObject;

  await setContacts(contactKey, contacts);
  closePopUpEditContact();
  init();
  openProfile(id);
}

async function deleteContact(id) {
  let object = contacts.find((contact) => contact.id === id);

  if (object) {
    let index = contacts.indexOf(object);
    contacts.splice(index, 1);
  }
  await setContacts(contactKey, contacts);
  init();
}

function openPopUpAddContact() {
  document.getElementById("addContactPopUp").classList.remove("d-none");
}

function closePopUpAddContact() {
  let popUpContainer = document.getElementById("addContactPopUp");
  let popUp = document.getElementById("addContact");
  popUp.style = "animation:slide-contact-out 0.15s linear forwards";
  setTimeout(() => {
    popUpContainer.classList.add("d-none");
    popUp.style.animation = "";
  }, 30);
}

async function createContact() {
  let fullName = document.getElementById("profileName").value;
  let email = document.getElementById("profileEmail").value;
  let number = document.getElementById("profileNumber").value;
  let initials = createInitials(fullName);
  let nameArr = differMultipleNames(fullName);
  let firstName = nameArr.firstName;
  let name = nameArr.lastName;

  let contact = {
    fullName: fullName,
    firstName: firstName,
    name: name,
    id: Date.now(),
    email: email,
    color: randomColor(),
    phoneNumber: number,
    initials: initials.toUpperCase(),
  };
  contacts.push(contact);
  await setContacts(contactKey, contacts);
  closePopUpAddContact();
  init();
}

function randomColor() {
  let colors = [
    "#FF7A00",
    "#9327FF",
    "#6E52FF",
    "#FC71FF",
    "#FFBB2B",
    "#1FD7C1",
    "#462F8A",
    "#FF4646",
    "#00BEE8",
  ];
  let randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function getRandomColor(id, color) {
  let divName = document.getElementById(id);
  divName.style.backgroundColor = color;
}

function calcBarHeight() {
  let header = document.querySelector("header");
  let item = document.getElementById("contacts-bar");
  let height = window.innerHeight - header.offsetHeight;
  item.style.height = height + "px";
  calcHeight();
}

function calcHeight() {
  let header = document.querySelector("header");
  let btn = document.getElementById("addNewContact");
  let register = document.getElementById("register");
  let height = window.innerHeight - header.offsetHeight - btn.offsetHeight;
  register.style.height = height - 20 + "px";
}

function clearContactsForm() {
  let input = document.getElementsByClassName("contact-creation-inputs");
  for (let i = 0; i < input.length; i++) {
    input[i].value = "";
  }
}

function editObject(person) {
  let object = {
    color: person.color,
    id: person.id,
    fullName: document.getElementById("editName").value,
    email: document.getElementById("editEmail").value,
    phoneNumber: document.getElementById("editNumber").value,
    initials: createInitials(document.getElementById("editName").value),
    firstName: differMultipleNames(document.getElementById("editName").value)
      .firstName,
    name: differMultipleNames(document.getElementById("editName").value)
      .lastName,
  };
  return object;
}
function contactActive(id) {
  let allElements = document.querySelectorAll(".contact");
  allElements.forEach((element) => {
    if (element.id !== id) {
      element.classList.remove("activeContact");
    }
  });

  let active = document.getElementById(id);
  active.classList.add("activeContact");
}

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

function removeDNone() {
  let button = document.getElementById('buttonsPopUpMobile');
  button.classList.remove('d-none');
  let menu = document.getElementById('menuContactButtonMobile');
  menu.classList.add('d-none');
}

function addDNone() {
  let button = document.getElementById('buttonsPopUpMobile');
  button.classList.add('d-none');
  let menu = document.getElementById('menuContactButtonMobile');
  menu.classList.remove('d-none');
}

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