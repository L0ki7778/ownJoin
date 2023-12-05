let activeUser;
let contacts = [];
let userList;
let userData;
let guest = [{
  name: "Dear Guest",
  initials: "G"
}]
const userKey = "userList";
const contactKey = "Contacts";
const tasksKey = "allTasks";
const sessionKey = "activeUser"
const remoteKey = "allTasks";
const STORAGE_TOKEN = 'QFOSCYPA967P352YSSOENCUXGKA464XWSUTNI5NT';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


function logUser(name) {
  if (name.firstName) {
    activeUser = name.firstName + " " + name.lastName;
    return sessionStorage.setItem("activeUser", activeUser)
  } else {
    activeUser = name;
    return sessionStorage.setItem("activeUser", activeUser)
  }
}


function getUser(sessionKey) {
  userData = sessionStorage.getItem(sessionKey)
  activeUser = JSON.parse(userData)
  return activeUser
}



async function setUserList(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };

  const response = await fetch(STORAGE_URL, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return await response.json();
}


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


async function setAllTasks(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}


async function setContacts(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}


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

function openMenu() {
  let menu = document.getElementById('icon-menu');
  menu.classList.remove('d-none');
  addMenuEvent();
}


function addMenuEvent() {
  let body = document.querySelector('body');
  body.addEventListener('click', closeMenu)
};


function closeMenu(event) {
  let body = document.querySelector('body');
  let menu = document.getElementById('icon-menu');
  let icon = document.getElementById('profile-icon');
      if ( event.target !== icon && event.target !== menu) {
      menu.classList.add('d-none');
      body.removeEventListener('click', closeMenu)
    }
  
}