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
  hideUnusedLetters();
  calcHeight()
}

function renderContactPage(activeUser) {
  let section = document.createElement('section');
  let body = document.querySelector('body');
  body.innerHTML = renderContactPopUp();
  body.innerHTML += renderEditPopUp();
  body.innerHTML += renderNavBar();
  body.innerHTML += renderHeader(activeUser);
  document.querySelector('main').append(section);
  section.innerHTML += renderContactSection();
}

function renderRegister() {
  let register = document.getElementById("register");
  register.innerHTML = "";

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    register.innerHTML += `<div class="register">
        <span>${letter}</span>
        
    </div>
    <div class="registerLineDiv">
    
    <div class="registerLine">
    </div>
    </div>
    <div id="${letter}" class="test">

    </div>`;

    renderContacts(`${letter}`);
  }
}

function renderContacts(letter) {
  let container = document.getElementById(`${letter}`);
  container.innerHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    let fullName = contact["firstName"] + " " + contact["name"];
    let initials =
      contacts[i].firstName.slice(0, 1) + contacts[i].name.slice(0, 1);
    let initial = contacts[i].firstName.slice(0, 1);

    if (letter === initial) {
      container.innerHTML += `
        <div id="${fullName}" onclick="openProfile('${fullName}', '${contact["email"]}', '${contact["phoneNumber"]}')" class="contact">
        
        <div>
            <span id="${initials}" class="initials">${initials}</span>
        </div>
        <div class="nameLinkDiv">
            <span class="fullName">${fullName}</span>
            <a class="emailLinks" href="#">${contact["email"]}</a>
        </div>
    </div>`;
      getRandomColor(`${initials}`);
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

function openProfile(name, mail, number) {
  let userProfile = document.getElementById("userProfile");
  userProfile.innerHTML='';

    userProfile.innerHTML = `<div>
    <div class="topProfile">
    <img src="/assets/img/UserProfileHuge.png" alt="">
    <div class="nameProfile"><h2>${name}</h2><div class="buttonsPopUp"><Button onclick="editProfile('${name}', '${mail}', '${number}')" class="buttonPopUp"><img src="/assets/img/edit.png" alt=""> Edit</Button><Button class="buttonPopUp"><img src="/assets/img/delete.png" alt=""> Delete</Button></div></div>
    </div>
    <p>Contact Information</p>
    <p><b>Email</b></p>
    <a class="profileLink" href="">${mail}</a>
    <p><b>Phone</b></p>
    <p>${number}</p>
  </div>`;
    setContactBackgroundColor(name);
  
}


function editProfile(name, mail, number) {
  openPopUpEditContact();
  document.getElementById("editName").value = name;
  document.getElementById("editEmail").value = mail;
  document.getElementById("editNumber").value = number;
  
}

function openPopUpEditContact() {
  document.getElementById("editContactPopUp").classList.remove("d-none");
}

function closePopUpEditContact() {
  document.getElementById("editContactPopUp").classList.add("d-none");
}

async function saveContact() {
  
  let fullName = document.getElementById("editName").value;
  let email = document.getElementById("editEmail").value;
  let number = document.getElementById("editNumber").value;

  let firstName = fullName.split(" ").slice(0, -1).join(" ");
  let name = fullName.split(" ").slice(-1).join(" ");
  
  let contact = {
    firstName: firstName,
    name: name,
    email: email,
    phoneNumber: number,
  };
  
  deleteContact(firstName, name, email, number);
  contacts.push(contact);
  setContacts(contactKey, contacts);
  init();
}

function deleteContact(firstName, name, email, number) {
  let contactToDelete = {
    firstName: firstName,
    name: name,
    email: email,
    phoneNumber: number,
  };

  let indexToDelete = contacts.findIndex(contact =>
    contact.firstName === contactToDelete.firstName || contact.name === contactToDelete.name
  );

  if (indexToDelete !== -1) {
    contacts.splice(indexToDelete, 1);
  }
}


let previousContactName = null;

function setContactBackgroundColor(name) {
  let contactName = document.getElementById(name);

  if (previousContactName && previousContactName !== contactName) {
    previousContactName.classList.remove("backgroundColor");
  }

  if (!contactName.classList.contains("backgroundColor")) {
    contactName.classList.add("backgroundColor");
    previousContactName = contactName;
  } else {
    contactName.classList.remove("backgroundColor");
    previousContactName = null;
  }
}

function openPopUpAddContact() {
  document.getElementById("addContactPopUp").classList.remove("d-none");
}

function closePopUpAddContact() {
  document.getElementById("addContactPopUp").classList.add("d-none");
}

async function createContact() {
  let fullName = document.getElementById("profileName").value;
  let email = document.getElementById("profileEmail").value;
  let number = document.getElementById("profileNumber").value;

  let firstName = fullName.split(" ").slice(0, -1).join(" ");
  let name = fullName.split(" ").slice(-1).join(" ");

  let contact = {
    firstName: firstName,
    name: name,
    email: email,
    phoneNumber: number,
  };

  contacts.push(contact);
  setContacts(contactKey, contacts);
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

function getRandomColor(id) {
  let divName = document.getElementById(`${id}`);
  let Color = randomColor();
  divName.style.backgroundColor = Color;
}


function calcHeight(){
  let header=document.querySelector('header');
  let btn = document.getElementById('addNewContact')
  let register = document.getElementById('register');
  let height = window.innerHeight - header.offsetHeight - btn.offsetHeight;
  register.style.height = height - 90 + 'px';
}