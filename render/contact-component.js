function renderContactPopUp(){
    return/*html*/`
    <div id="addContactPopUp" class="addContactPopUp d-none">
        <div class="addContact">
            <div class="logoContact">
                <div class="textContact">
                <img class="imgContact" src="/assets/img/logoSmall.png" alt="">
                <h2 class="h2Contact"><b>Add contact</b></h2>
                <span>Tasks are better with a team!</span>
                <div class="lineContact"></div>
                </div>
            </div>
            <div class="contactFormular">
                <div>
                    <img class="imgUserContact" src="/assets/img/UserProfileHuge.png" alt="">
                    
                </div>
                <div >
                    <button class="closePopUp" onclick="closePopUpAddContact()"><img src="/assets/img/btn-x.png" alt=""></button>
                    <div class="inputsContact">
                        <input id="profileName" type="text" placeholder="Name">
                        <input id="profileEmail" type="email" placeholder="Email">
                        <input id="profileNumber" type="number" placeholder="Phone">
                    </div>
                    <div class="divButtonsContact">
                        <button class="clearButton">Cancel <img src="/assets/img/btn-x.png" alt=""></button>
                        <button class="createTaskButton" onclick="createContact()">Create Contact <img src="/assets/img/checkbtn-checkmark.png" alt=""></button>
                    </div>
                    
                </div>
                
            </div>
            </div>
    </div>
    `
}

function renderContactSection(){
    return/*html*/`
    <div class="contactSection">
    <div class="contactsDiv">
        <div id="addNewContact" class="contactButtonDiv">
            <button onclick="openPopUpAddContact()" class="contactButton">
                <span>Add new contact</span><img src="/assets/img/person_add.png" alt="">
            </button>
        </div>
        <div class="scrollDiv" id="register">
            
        </div>

    </div>
    <div class="popUpUserProfile">
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
    </div>
    `
}

function renderEditPopUp(){
    return/*html*/`
    <div id="editContactPopUp" class="addContactPopUp d-none">
        <div class="addContact">
            <div class="logoContact">
                <div class="textContact">
                <img class="imgContact" src="/assets/img/logoSmall.png" alt="">
                <h2 class="h2Contact"><b>Edit contact</b></h2>
                <div class="lineContact"></div>
                </div>
            </div>
            <div class="contactFormular">
                <div>
                    <img class="imgUserContact" src="/assets/img/UserProfileHuge.png" alt="">
                    
                </div>
                <div >
                    <button class="closePopUp" onclick="closePopUpEditContact()"><img src="/assets/img/btn-x.png" alt=""></button>
                    <div class="inputsContact">
                        <input id="editName" type="text" placeholder="Name">
                        <input id="editEmail" type="email" placeholder="Email">
                        <input id="editNumber" type="number" placeholder="Phone">
                    </div>
                    <div class="divButtonsContact">
                        <button class="clearButton">Delete</button>
                        <button class="createTaskButton" onclick="saveContact()">Save <img src="/assets/img/checkbtn-checkmark.png" alt=""></button>
                    </div>
                    
                </div>
                
            </div>
            </div>
    </div>
    `
}