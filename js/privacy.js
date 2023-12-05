function init() {
    getUser(sessionKey);
    let body = document.querySelector('body');
    body.innerHTML = renderNavBar();
    body.innerHTML += renderHeader(activeUser);
    let main = document.querySelector('main');
    main.innerHTML += renderPrivacyPolicy();
}


function initSignUp(){
    let body = document.querySelector('body');
    body.innerHTML = renderPrivacyNavBar();
    body.innerHTML += renderDefaultHeader();
    let main = document.querySelector('main');
    main.innerHTML += renderPrivacyPolicy();
}