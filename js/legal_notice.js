function init() {
    getUser(sessionKey);
    let body = document.querySelector('body');
    body.innerHTML = renderNavBar();
    body.innerHTML += renderHeader(activeUser);
    let main = document.querySelector('main');
    main.innerHTML = renderLegalNotice();
}


function initSignUp(){
    let body = document.querySelector('body');
    body.innerHTML = renderLegalNavBar();
    body.innerHTML += renderDefaultHeader();
    let main = document.querySelector('main');
    main.innerHTML += renderLegalNotice();
}