const form = document.getElementById('registrationForm');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

const welcomeBlock = document.getElementById('welcomeBlock');
const welcomeText = document.getElementById('welcomeText');
const logoutBtn = document.getElementById('logoutBtn');

/* ===== ВАЛІДАЦІЯ ===== */

function validateName() {
    if (!nameInput.value.trim()) {
        nameError.textContent = "Імʼя не може бути порожнім";
        markInvalid(nameInput);
        return false;
    }
    clear(nameInput, nameError);
    return true;
}

function validateEmail() {
    if (!emailInput.checkValidity()) {
        emailError.textContent = emailInput.validationMessage;
        markInvalid(emailInput);
        return false;
    }
    clear(emailInput, emailError);
    return true;
}

function validatePassword() {
    if (!passwordInput.value.trim()) {
        passwordError.textContent = "Пароль не може бути порожнім";
        markInvalid(passwordInput);
        return false;
    }
    clear(passwordInput, passwordError);
    return true;
}

function validateForm() {
    const v1 = validateName();
    const v2 = validateEmail();
    const v3 = validatePassword();
    return v1 && v2 && v3;
}

/* ===== ПОДІЇ ===== */

nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        saveUser();
        showWelcome();
        form.reset();
    }
});

/* ===== LOCAL STORAGE ===== */

function saveUser() {
    const user = {
        name: nameInput.value,
        email: emailInput.value
    };
    localStorage.setItem('userData', JSON.stringify(user));
}

function showWelcome() {
    const user = JSON.parse(localStorage.getItem('userData'));
    form.classList.add('hidden');
    welcomeBlock.classList.remove('hidden');
    welcomeText.textContent = `${user.name} (${user.email})`;
}

logoutBtn.addEventListener('click', () => {
    localStorage.clear();
    welcomeBlock.classList.add('hidden');
    form.classList.remove('hidden');
});

/* ===== ДОПОМІЖНІ ===== */

function markInvalid(input) {
    input.classList.add('invalid');
    input.classList.remove('valid');
}

function clear(input, error) {
    input.classList.add('valid');
    input.classList.remove('invalid');
    error.textContent = "";
}

/* ===== АВТОВХІД ===== */
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('userData')) {
        showWelcome();
    }
});
