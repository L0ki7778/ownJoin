function init() {
    getUser(sessionKey);
    let header = document.querySelector('header');
    let nav = document.querySelector('nav');
    let main = document.querySelector('main');
    nav.innerHTML = renderNavBar();
    header.innerHTML += renderHeader(activeUser);
    main.innerHTML += renderPrivacyPolicy();
}


function initSignUp(){
    let body = document.querySelector('body');
    body.innerHTML = renderPrivacyNavBar();
    body.innerHTML += renderDefaultHeader();
    let main = document.querySelector('main');
    main.innerHTML += renderPrivacyPolicy();
}