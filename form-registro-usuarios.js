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

        // 3. Validación de formato de teléfono (ejemplo simple)
        let phoneRegex = /^\d{2}-\d{8}$/; // Ajusta según tu formato de teléfono deseado
        if (!phoneRegex.test(phone)) {
            isValid = false;
            errorMessage += 'Por favor, ingrese un número de teléfono válido (ej. 55-12345678). <br>';
        }

        // 4. Validación de contraseña
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,20}$/;
        if (!passwordRegex.test(password)) {
            isValid = false;
            errorMessage += 'La contraseña debe tener entre 8 y 20 caracteres, incluyendo mayúsculas, minúsculas, números y al menos un carácter especial. <br>';
        }

        // 5. Validación de confirmación de contraseña
        if (password !== confirmPassword) {
            isValid = false;
            errorMessage += 'Las contraseñas no coinciden. <br>';
        }

        // Muestra la alerta de error si hay errores
        if (!isValid) {
            $('#alert-message-modal').html(errorMessage);
            var alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
            alertModal.show();
        } else {
            // Si todo está válido, puedes enviar el formulario aquí
            alert('Registro Exitoso. ¡Gracias!'); // Reemplaza con tu lógica de envío
        }
    });
});
