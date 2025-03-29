$(document).ready(function () {
    $('#datepicker').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true
    });
});


$(document).ready(function () {
    // Inicializa el datepicker
    $('#datepicker').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true
    });

    // Validación del formulario al enviar
    $('#registroForm').submit(function (event) {
        event.preventDefault(); // Evita que se recargue la página al enviar el formulario

        // Realiza las validaciones
        let isValid = true;
        let errorMessage = '';

        // 1. Validación de campos vacíos (puedes agregar más campos aquí)
        let firstName = $('#firstName').val();
        let lastName = $('#lastName').val();
        let email = $('#email1').val();
        let phone = $('#phone').val();
        let password = $('#password1').val();
        let confirmPassword = $('#password2').val();
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            isValid = false;
            errorMessage += 'Por favor, complete todos los campos. <br>';
        }

        // 2. Validación de formato de correo electrónico
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            errorMessage += 'Por favor, ingrese un correo electrónico válido. <br>';
        }

        // 3. Validación de formato de teléfono (solo números, 10 dígitos)
        let phoneRegex = /^\d{10}$/;

        if (!phoneRegex.test(phone)) {
            isValid = false;
            errorMessage += 'Por favor, ingrese un número de teléfono válido (10 dígitos, solo números).<br> ';
        }



        // 4. Validación de contraseña
        let passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;

        if (!passwordRegex.test(password)) {
            isValid = false;
            errorMessage += 'La contraseña debe tener entre 8 y 20 caracteres, incluyendo al menos una letra mayúscula y un número. <br>';
        }


        // 5. Validación de confirmación de contraseña
        if (password !== confirmPassword) {
            isValid = false;
            errorMessage += 'Las contraseñas no coinciden. <br>';
        }

        // 6. Validación de la casilla de verificación (Términos y Condiciones)
        let termsChecked = $('#terms').is(':checked');
        if (!termsChecked) {
            isValid = false;
            errorMessage += 'Debe aceptar los términos y condiciones.<br> ';
        }

        // Muestra la alerta de error si hay errores
        if (!isValid) {
            $('#alert-message-modal').html(errorMessage + '<br>Por favor revise sus datos, corríjalos e intente nuevamente.');
            var alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
            alertModal.show();
        } else {
            // Si todo está válido, puedes enviar el formulario aquí
            alert('Validando registro. ¡Gracias!'); // Reemplaza con tu lógica de envío
        }
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
