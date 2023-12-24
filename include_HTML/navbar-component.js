//Renders the navigation bar. Used for logged in users.
function renderNavBar() {
  return /*html*/ `
    <div class="navBar">
        <img class="navLogo" src="/assets/img/NavLogo.png" alt="">
        <div class="navLinks">
          <a class="navLinkImg" href="/html/summary.html">
          <img class="linkImg" src="/assets/img/summary.png" alt=""><span>Summary</span></a>
          <a class="navLinkImg" href="/html/add_task.html">
          <img class="linkImg" src="/assets/img/addtask.png" alt=""><span>Add Task</span></a>
          <a class="navLinkImg" href="/html/board.html">
          <img class="linkImg" src="/assets/img/board.png" alt=""><span>Board</span></a>
          <a class="navLinkImg" href="/html/contacts.html">
          <img class="linkImg" src="/assets/img/contacts.png" alt=""><span>Contacts</span></a>
        </div>
        <div class="navBottom">
            <a class="navLinksBot" href="/html/privacy_policy.html">Privacy Policy</a>
            <a class="navLinksBot" href="/html/legal_notice.html">Legal notice</a>
        </div>
    `;
}


