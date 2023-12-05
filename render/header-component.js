function renderHeader(user) {
    return/*html*/`
    <header>
        <p class="pHeader">Kanban Project Management Tool</p>
        <div class="imgsHeader">
            <a href="/assets/templates/help.html">
                <img class="helpIcon" src="/assets/img/help.png" alt=""></a>
            <div id="profile-icon" onclick="openMenu()">${user[0].initials}</div>
        </div>
        <div id="icon-menu" class="d-none">
            <a class="menu-option" href="/assets/templates/legal_notice.html">
                Legal Notice
            </a>
            <a class="menu-option" href="/assets/templates/privacy_policy.html">
                Privacy Policy
            </a>
            <a class="menu-option" href="http://127.0.0.1:5500/index.html">
                Log out
            </a>
        </div>
    </header> 
    <main>
    </main>
    `
}

function renderDefaultHeader(){
    return/*html*/`
    <header>
        <p class="pHeader">Kanban Project Management Tool</p>
        <div class="imgsHeader">
            <a href="/assets/templates/help_signUp.html">
                <img class="helpIcon" src="/assets/img/help.png" alt=""></a>
        </div>
    </header> 
    <main>
    </main>
    ` 
}

