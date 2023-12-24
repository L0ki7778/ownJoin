//Renders the header of the web page for logged in users.
function renderHeader(user) {
    return/*html*/`

        <h4 class="pHeader">Kanban Project Management Tool</h4>
        <img class="mobileImgHeader" src="/assets/img/join-logo.png" alt="">
        <div class="imgsHeader">
            <a href="/html/help.html">
                <img class="helpIcon" src="/assets/img/help.png" alt=""></a>
            <div id="profile-icon" onclick="openMenu()">${user[0].initials}</div>
        </div>
        <div id="header-icon-menu" class="d-none">
            <div class="menu-link"><a class="menu-option" href="/html/legal_notice.html">Legal Notice</a></div>
            <div class="menu-link"><a class="menu-option" href="/html/privacy_policy.html">Privacy Policy</a></div>
            <div class="menu-link"><a class="menu-option" href="#" onclick="logOut()">Log out</a></div>
        </div>


    `
}



