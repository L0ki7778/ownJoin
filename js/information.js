
function initSignUpPrivacy(){
    let main = document.querySelector('main');
    main.innerHTML = renderPrivacyPolicy();
    let arrows=document.getElementsByClassName("help-arrow");
    for(let i=0;i<arrows.length;i++){
        arrows[i].setAttribute("href", "/index.html");
    }

}

function initSignUpLegal(){
    let main = document.querySelector('main');
    main.innerHTML = renderLegalNotice();
    document.getElementById("help-arrow").setAttribute("href", "/index.html");
}

function initSignUpHelp() {
    let main = document.querySelector('main');
    main.innerHTML= renderHelp();
    document.getElementById("help-arrow").setAttribute("href", "/index.html");
}

function initHelp() {
    getUser(sessionKey);
    let header = document.querySelector('header');
    let nav = document.querySelector('nav');
    let main = document.querySelector('main');
    nav.innerHTML += renderNavBar();
    header.innerHTML += renderHeader(activeUser);
    main.innerHTML += renderHelp();
}


function initPrivacy() {
    getUser(sessionKey);
    let header = document.querySelector('header');
    let nav = document.querySelector('nav');
    let main = document.querySelector('main');
    nav.innerHTML = renderNavBar();
    header.innerHTML += renderHeader(activeUser);
    main.innerHTML += renderPrivacyPolicy();
}


function initLegal() {
    getUser(sessionKey);
    let header = document.querySelector('header');
    let nav = document.querySelector('nav');
    let main = document.querySelector('main');
    nav.innerHTML += renderNavBar();
    header.innerHTML += renderHeader(activeUser);
    main.innerHTML += renderLegalNotice();
}

