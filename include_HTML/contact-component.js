//Renders the contact pop-up HTML.
function renderContactPopUp(){
    return/*html*/`
        <div id="addContactPopUp" class="addContactPopUp d-none">
            <div id="addContact" class="addContact">
                <div class="logoContact">
                    <div class="textContact">
                        <img class="imgContact" src="/assets/img/logoSmall.png" alt="">
                        <h2 class="h2Contact"><b>Add contact</b></h2>
                        <span>Tasks are better with a team!</span>
                        <div class="lineContact"></div>
                    </div>
                </div>
                <button class="closePopUp" onclick="closePopUpAddContact()"><img src="/assets/img/btn-x.png"
                        alt=""></button>
                <form onsubmit="createContact();return false" class="contactFormular">
                    <div>
                        <img class="imgUserContact" src="/assets/img/create-contact.png" alt="">
                    </div>
                    <div id="input-container" class="containterPopUpAddTaskMobile">
                        <div class="inputsContact">
                            <div class="input-group sub-container row">
                                <input id="profileName" min="3" class=" contact-creation-inputs form-control subtask-input" type="text"
                                    placeholder="Name" title="You need to have First- and Lastname with a space in between" required />
                                <img src="/assets/img/person.png" alt="">
                            </div>
                            <div class="input-group sub-container row">
                                <input id="profileEmail" min ="6" class=" contact-creation-inputs form-control subtask-input" type="email"
                                    placeholder="Email" required />
                                <img src="/assets/img/mail.png" alt="">
                            </div>
                            <div class="input-group sub-container row">
                                <input id="profileNumber" class=" contact-creation-inputs form-control subtask-input"
                                    type="number" placeholder="Phone" required />
                                <img src="/assets/img/call.png" alt="">
                            </div>
                        </div>
                        <div class="divButtonsContact">
                            <button id="clearButton" class="clearButton" onclick="clearContactsForm()">Cancel <img
                                    src="/assets/img/btn-x.png" alt=""></button>
                            <button class="createTaskButton" type="submit">Create Contact <img
                                    src="/assets/img/checkbtn-checkmark.png" alt=""></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
}


//Renders the contact section responsible for showing individual contact-profiles.
function renderContactSection(){
    return/*html*/`
        <div class="contactSection">
            <div id="mobile-edit-container">
                <Button  class="mobile-edit">
                <img src="/assets/img/edit.png" alt=""> Edit</Button>
                <Button  class="mobile-edit">
                <img src="/assets/img/delete.png" alt=""> Delete</Button>
            </div>
            <div id="contacts-bar" class="contactsDiv">
                <div id="addNewContact" class="contactButtonDiv">
                    <button onclick="openPopUpAddContact()" class="contactButton">
                        <span>Add new contact</span><img src="/assets/img/person_add.png" alt="">
                    </button>
                </div>
                <div class="scrollDiv" id="register">
                </div>
            </div>
            <div id="zIndex" class="popUpUserProfile">
                <div class="headlineDiv">
                    <div class="headLine">
                        <h1 class="h1">Contacts</h1>
                        <div class="blueLine"></div>
                        <span class="spanContact">Better with a team</span>
                    </div>
                </div>
                <div id="userProfile" class="userProfile">
                </div>
            </div>
            <button id="menuContactButtonMobile" onclick="editSlider()" class="contactButtonMobile">
                <img src="/assets/img/menu_btn.png" alt="menu-dots">
            </button>
        </div>  
    `
}


//Renders an edit pop-up for a contact.
function renderEditPopUp(){
    return/*html*/`
        <div id="editContactPopUp" class="addContactPopUp d-none">
            <div id="addContact" class="addContact">
                <div class="logoContact">
                    <div class="textContact">
                        <img class="imgContact" src="/assets/img/logoSmall.png" alt="">
                        <h2 class="h2Contact"><b>Edit contact</b></h2>
                        <div class="lineContact"></div>
                    </div>
                </div>
                <button class="closePopUp" onclick="closePopUpEditContact()"><img src="/assets/img/btn-x.png" alt=""></button>
                <form onsubmit="editContact(contactId);return false" class="contactFormular">
                    <div>
                        <div class="profile-initials-pseudo-img" id="profile-img-div"></div>
                    </div>
                    <div id="input-container">
                        <div class="inputsContact">
                            <div id="edit-task-name-container" class="input-group sub-container row">
                                <input id="editName" class=" contact-creation-inputs form-control subtask-input" type="text"
                                    placeholder="Name" 
                                    pattern="^(?=[A-Za-z])[A-Za-z0-9].{3,}" 
                                    title="You kindly need to have a minimum of 3 characters and have to start with a letter" required />
                                <img src="/assets/img/person.png" alt="">
                            </div>
                            <div id="name-requirement" class="d-none">Please provide a Name</div>
                            <div class="input-group sub-container row">
                                <input id="editEmail" class=" contact-creation-inputs form-control subtask-input" type="email"
                                    placeholder="Email" required />
                                <img src="/assets/img/mail.png" alt="">
                            </div>
                            <div class="input-group sub-container row">
                                <input id="editNumber" class=" contact-creation-inputs form-control subtask-input" type="number"
                                    placeholder="Phone" required />
                                <img src="/assets/img/call.png" alt="">
                            </div>
                        </div>
                        <div class="divButtonsContact">
                            <button id="clearButton" class="clearButton" onclick="clearContactsForm()">Delete <img
                                    src="/assets/img/btn-x.png" alt=""></button>
                            <button id="saveButtonEdit" class="createTaskButton" type="submit">Save <img
                                    src="/assets/img/checkbtn-checkmark.png" alt=""></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
}


/**
 * Opens the contact you clicked on from the register.
 * 
 * @param {string} id - This is the id of the contact you click on.
 */
function openProfile(id) {
    let userProfile = document.getElementById("userProfile");
    contactId=id;
    let user = [];
    contacts.map((e) => {
      if (e.id == id) {
        user.push(e);
      }
    });
    let e = user[0];
    userProfile.innerHTML = "";
  
    userProfile.innerHTML = `
    <a id="help-arrow" href="#" onclick="takeSlider()"><img src="/assets/img/arrow-left.png" alt=""></a>
    <div>
      <div class="topProfile">
          <div class="profile-initials-pseudo-img " style="background-color:${e.color}">
             ${e.initials}
          </div>
      <div class="nameProfile">
        <h2 class="h2">${e.fullName}</h2>
            <div class="buttonsPopUp">
                <Button onclick="editProfile(${e.id})" class="buttonPopUp">
                <img src="/assets/img/edit.png" alt=""> Edit</Button>
                <Button onclick="deleteContact(${e.id})" class="buttonPopUp">
                <img src="/assets/img/delete.png" alt=""> Delete</Button>
            </div>
        </div>
      </div>
      <p class="pProfile">Contact Information</p>
      <p><b>Email</b></p>
      <a class="profileLink" href="#" onclick="return false;">${e.email}</a>
      <p class="pMail"><b>Phone</b></p>
      <p>${e.phoneNumber}</p>
    </div>`;
  addSlider();
  configureMobileEdit();}
  

  /**
 * Renders the contacts matching their first letter to the letters in the register.
 * 
 * @param {string} letter - These are the letters from A to Z.
 */
function renderContacts(letter) {
    let container = document.getElementById(`${letter}`);
    container.innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];
      if (letter === contact.initials.charAt(0)) {
        container.innerHTML += `
          <div id="${contact.name}${i}" onclick="openProfile('${contact.id}'); contactActive('${contact.name}${i}')" class="contact">
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

  
/**
 * Renders the register from A to Z.
 * 
 */
function renderRegister() {
    let letterCheck = contacts.map(element => element.fullName.charAt(0).toUpperCase());
    let register = document.getElementById("register");
    register.innerHTML = "";
    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i];
      if(letterCheck.includes(letter)){
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
  }
  
  