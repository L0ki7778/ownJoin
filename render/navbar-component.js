function renderNavBar() {
  return /*html*/ `
    <div class="navBar">
        <img class="navLogo" src="/assets/img/NavLogo.png" alt="">
        <div class="navLinks">
        
          <a class="navLinkImg" href="/assets/templates/summary.html">
          <img class="linkImg" src="/assets/img/nav-summary.png" alt=""><span>Summary</span></a>
        
         
          <a class="navLinkImg" href="/assets/templates/add_task.html">
          <img class="linkImg" src="/assets/img/nav-add-task.png" alt=""><span>Add Task</span></a>
        
        
          <a class="navLinkImg" href="/assets/templates/board.html">
          <img class="linkImg" src="/assets/img/nav-board.png" alt=""><span>Board</span></a>
        
        
          <a class="navLinkImg" href="/assets/templates/contacts.html">
          <img class="linkImg" src="/assets/img/nav-contacts.png" alt=""><span>Contacts</span></a>
        
        </div>
        <div class="navBottom">
            <a class="navLinksBot" href="/assets/templates/privacy_policy.html">Privacy Policy</a>
            <a class="navLinksBot" href="/assets/templates/legal_notice.html">Legal notice</a>
        </div>
    `;
}


function renderLegalNavBar(){
  return /*html*/ `
    <div class="navBar">
        <img class="navLogo" src="/assets/img/NavLogo.png" alt="">
        <div class="navLinks">
        </div>
        <div class="navBottom">
            <a class="navLinksBot" href="/assets/templates/privacy_policy_signUp.html">Privacy Policy</a>
        </div>
    `;
}

function renderPrivacyNavBar(){
  return /*html*/ `
    <div class="navBar">
        <img class="navLogo" src="/assets/img/NavLogo.png" alt="">
        <div class="navLinks">
        </div>
        <div class="navBottom">
            <a class="navLinksBot" href="/assets/templates/legal_notice_signUp.html">Legal notice</a>
        </div>
    `;
}

function renderDefaultNavBar(){
  return /*html*/ `
    <div class="navBar">
        <img class="navLogo" src="/assets/img/NavLogo.png" alt="">
        <div class="navLinks">
        </div>
        <div class="navBottom">
            <a class="navLinksBot" href="/assets/templates/legal_notice_signUp.html">Legal notice</a>
            <a class="navLinksBot" href="/assets/templates/privacy_policy_signUp.html">Privacy Policy</a>
        </div>
    `;
}