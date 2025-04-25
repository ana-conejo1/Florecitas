function validarFormulario() {
    let isValid = true;
    let errorMessage = '';

    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let email = $('#email').val();
    let phone = $('#phone').val();
    let password = $('#password1').val();
    let confirmPassword = $('#password2').val();
    let termsChecked = $('#gridCheck1').is(':checked');

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phoneRegex = /^\d{10}$/;
    let passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;

    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        isValid = false;
        errorMessage += 'Por favor, complete todos los campos. <br>';
    }

    if (!emailRegex.test(email)) {
        isValid = false;
        errorMessage += 'Por favor, ingrese un correo electrónico válido. <br>';
    }

    if (!phoneRegex.test(phone)) {
        isValid = false;
        errorMessage += 'Por favor, ingrese un número de teléfono válido (10 dígitos).<br>';
    }

    if (!passwordRegex.test(password)) {
        isValid = false;
        errorMessage += 'La contraseña debe tener entre 8 y 20 caracteres. <br> Debe contener por lo menos una Mayuscula. <br> Debe contener por lo menos una numero. <br> No incluir caracteres especiales (ñ,%,#) <br>';
    }

    if (password !== confirmPassword) {
        isValid = false;
        errorMessage += 'Las contraseñas no coinciden. <br>';
    }

    if (!termsChecked) {
        isValid = false;
        errorMessage += 'Debe aceptar los términos y condiciones. <br>';
    }

    if (!isValid) {
        $('#alert-message-modal').html(errorMessage + '<br>Por favor revise sus datos e intente nuevamente.');
        const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
        alertModal.show();
    }else {
        alert('¡Registro Exitoso!'); 
    }

    return isValid;
}

// Inicializa datepicker
$(document).ready(function () {
    $('#datepicker').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayHighlight: true
    });
});


function togglePassword(inputId, iconId) {
    let input = document.getElementById(inputId);
    let icon = document.getElementById(iconId);

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let questions = document.querySelectorAll(".question");

    questions.forEach(question => {
        question.addEventListener("click", function () {
            let answer = this.parentNode.nextElementSibling; // Obtener la respuesta siguiente
            answer.style.display = (answer.style.display === "table-row") ? "none" : "table-row";
        });
    });
});
