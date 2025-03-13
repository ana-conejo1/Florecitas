const registrationForm = document.getElementById("registrationForm");
const errorMessages = document.getElementById("errorMessages");

registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const { username, email, comentario } = registrationForm.elements;

    errorMessages.innerHTML = "";

    if (!isUsername(username.value)) {
        displayError("Ingrese un nombre valido");
        return;
    }

    if (!email.value.trim() || !isValidEmail(email.value)) {
        displayError("Ingrese una dirección de correo electronico valida");
        return;
    }

    if (!comentario.value.trim() || !isStrongComentario(comentario.value)) {
        displayError(
        "El comentario debe contener al menos 10 caracteres entre mayusculas y minusculas"
        );
        return;
    }
    alert("Registro exitoso!");
    title.innerHTML = "¡Gracias por escribir!";
    document.getElementById("registrationForm").style.display = "none";
    title.innerHTML = "¡Gracias por escribir!";

    setTimeout(() => {
        registrationForm.reset();
        document.getElementById("registrationForm").style.display = "block";
        title.innerHTML = "Contáctenos";
    }, 3000);

    
});


function displayError(message) {
    errorMessages.innerHTML += `<div class="error">${message}</div>`;
}

function isUsername(username) {
    return /^(?=.*[a-z])(?=.*[A-Z]).{3,}$/.test(username);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongComentario(comentario) {
    return /^(?=.*[a-z])(?=.*[A-Z]).{10,}$/.test(comentario);
}

