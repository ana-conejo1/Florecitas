document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const phone = document.getElementById("phone").value.trim();

    clearErrors();

    let hasErrors = false;
    let allEmpty = !firstname && !lastname && !email && !password && !phone;

    if (allEmpty) {
        alert("Debes llenar los campos.");
        return;
    }

    // Validaciones
    if (!firstname) {
        showError("error-firstname", "Este campo estaba vacío.");
        hasErrors = true;
    } else if (!isUsername(firstname)) {
        showError("error-firstname", "Ingrese solo letras.");
        hasErrors = true;
    }

    if (!lastname) {
        showError("error-lastname", "Este campo estaba vacío.");
        hasErrors = true;
    } else if (!isUsername(lastname)) {
        showError("error-lastname", "Ingrese solo letras.");
        hasErrors = true;
    }

    if (!email) {
        showError("error-email", "Este campo estaba vacío.");
        hasErrors = true;
    } else if (!isValidEmail(email)) {
        showError("error-email", "Ingrese un correo válido.");
        hasErrors = true;
    }

    if (!password) {
        showError("error-password", "Este campo estaba vacío.");
        hasErrors = true;
    } else if (!isValidPassword(password)) {
        showError("error-password", "Debe tener al menos 8 caracteres.");
        hasErrors = true;
    }

    if (!phone) {
        showError("error-phone", "Este campo estaba vacío.");
        hasErrors = true;
    } else if (!isValidPhone(phone)) {
        showError("error-phone", "Debe tener 10 dígitos.");
        hasErrors = true;
    }

    if (hasErrors) return; 

    const newUser = { firstname, lastname, email, password, phone };
    let user = JSON.parse(localStorage.getItem("userDB")) || [];
    user.push(newUser);
    localStorage.setItem("userDB", JSON.stringify(user));
    console.log("Usuarios guardados en localStorage:", JSON.parse(localStorage.getItem("userDB")));
    alert(" Registro exitoso.");
    document.getElementById("registerForm").reset();
});

function showError(id, message) {
    document.getElementById(id).textContent = message;
}

function clearErrors() {
    document.querySelectorAll(".text-danger").forEach(el => el.textContent = "");
}

// Funciones de validación
function isUsername(username) {
    return /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]{3,}$/.test(username);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);
}

function isValidPassword(password) {
    return password.length >= 8;
}

function isValidPhone(phone) {
    return /^\d{10}$/.test(phone);
}
