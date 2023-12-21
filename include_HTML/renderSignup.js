//renders the signup component on the page. Function gets
//executed when the signup button on the start page is clicked.
function renderSignup() {
    let main = document.getElementById('login-main');
    let header = document.getElementById('sign-up');
    header.classList.add('d-none')
    main.innerHTML = '';
    main.innerHTML +=/*html*/`
<div id="signup-container">
    <div id="login-title-container">
        <div id="login-title">
            <img id=back_arrow src="/assets/img/arrow-left.png" alt="arrow-left" onclick="renderLogin()">
            Sign up
        </div>
        <div id="login-underline"></div>
    </div>
    <form onsubmit="signUp();return false">
        <div id="login-input-container">
            <div class="login-input-fields">
                <input class="login-input" id="username" name="username" type="text" required placeholder="Name">
                <img class="input-img" src="assets/img/person.png" alt="person">
            </div>
            <div class="login-input-fields">
                <input class="login-input" id="sign-up_mail" type="email" required placeholder="Email">
                <img class="input-img" src="assets/img/mail.png" alt="mail">
            </div>
            <div class="login-input-fields">
                <input class="login-input password" 
                        id="create_password" 
                        type="password" 
                        min="8" 
                        required 
                        placeholder="Password"
                        pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\\-]).{8,}$|(?=[0-9].*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\\-]).{8,}$"
                        title="Bitte verwende Groß- und Kleinbuchstaben, sowie ein Sonderzeichen(#?!@$%^&*-) und mindestens eine Nummer">
                    <div class="eye-container"><img class="input-img lock" src="assets/img/lock.png" alt="lock"></div>
            </div>
            <div class="login-input-fields">
                <input class="login-input password" 
                        id="confirm_password" 
                        type="password" 
                        placeholder="Password Conformation"
                        title="Bitte verwende Groß- und Kleinbuchstaben, sowie ein Sonderzeichen(#?!@$%^&*-) und mindestens eine Nummer">
                <div class="eye-container"><img class="input-img lock" src="assets/img/lock.png" alt="lock"></div>
            </div>
            <div class="reminder d-none" id="pw-check-reminder">Ups?! Your passwords don't match.</div>
        </div>
        <div>
            <div id="policy-check" class="d-flex">
                <input type="checkbox" id="check" required>
                <img id="checkbox" src="assets/img/checkbox.png" onclick="checkboxClick(), formValidation()" alt="checkbox">
                <label class="label" for="check" id="sign-label">
                    <div id="stroke">
                    </div>
                    &nbsp;accept the&nbsp;
                    <span>
                        <a href="/html/privacy_policy_signUp.html" target="_blank">Privacy Policy
                        </a>
                    </span>
                </label>
            </div>
            <div id="signup-btn-container">
                <button id="signup-btn" class="btn" type="submit" disabled=true>
                    Sign up
                </button>
            </div>
        </div>
    </form>
    </div>
    <div id="overlay" class="d-none">
        <div id="pop-up">
        </div>     
    </div>
        `;
    setEventListener();// responsible for changeing the input-icons for password-inputs as well as the "show-passwort"-functionality
    addSignUpHandler()//listener for couloring the input fields in case of missmatch or not fullfilled requirements
};


// Renders the login component on the page and gets executed when the 
// arrow-button (#back_arrow) within the signup-screen  is clicked.
function renderLogin() {
    let main = document.getElementById('login-main');
    let header = document.getElementById('sign-up');
    header.classList.remove('d-none')
    main.innerHTML = '';
    main.innerHTML +=/*html*/`
        <div id="login-container">
            <div id="login-title-container">
                <div id="login-title">Log in</div>
                <div id="login-underline"></div>
            </div>
            <form onsubmit="return false">
                <div id="login-input-container">
                    <div class="login-input-fields">
                        <input class="login-input" id="login-mail" type="email" required placeholder="Email">
                        <img class="input-img" src="assets/img/mail.png" alt="mail">
                    </div>
                    <div id="password-container" class="login-input-fields">
                        <input class="login-input password" id="login-password" type="password" min="8" required
                            placeholder="Password"
                            pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\\-]).{8,}$"
                            title="Bitter verwende mindestens eine Zahl und ein Sonderzeichen.">
                        <div class="eye-container"><img  class="lock input-img" src="assets/img/lock.png" alt="lock"></div>
                    </div>
                    <div id="log-in-check" class="d-flex">
                        <input type="checkbox" id="check">
                        <img id="checkbox" src="assets/img/checkbox.png" onclick="checkboxClick()" alt="checkbox">
                        <label class="label" for="check">Remember me</label>
                    </div>
                </div>
                <div id="login-btn-container">
                    <button id="login-btn" class="btn" disabled="true" onclick="logIn()">
                        Log in
                    </button>
                    <button id="guest-login-btn" class="btn">
                        Guest Log in
                    </button>
                </div>
            </form>
        </div>
        `;
    setEventListener();
    addLogInHandler();
    getUserList(userKey)
}
