document.addEventListener("DOMContentLoaded", () => {
    const usuarioForm = document.getElementById("registroForm");

    usuarioForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Capturar valores de los campos del formulario
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const datepicker = document.getElementById("datepicker").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email1 = document.getElementById("email1").value.trim();
        const password1 = document.getElementById("password1").value.trim();
        const password2 = document.getElementById("password2").value.trim();
        const gridCheck1 = document.getElementById("gridCheck1").value.trim();

        // Validación de contraseñas (¡Importante!)
        if (password1 !== password2) {
            return; // Detiene el envío
        }
        
        const nuevoUsuario = {

            firstName: firstName,
            lastName: lastName,
            datepicker: datepicker,
            phone: phone,
            email1: email1, // Cambiamos email para evitar errores por el 1
            password1: password1,
            password2: password2,
            gridCheck1: gridCheck1
        };

        console.log(nuevoUsuario);

        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoUsuario)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                console.log("Usuario agregado:", data);
                    usuarioForm.reset(); // Resetea el formulario después de 2 segundos
                
            }
        })
        .catch(error => {
            console.error('Error al agregar usuario:', error);
            alert("Error al agregar Usuario. Verifique los datos o Inicie sesión si ya se encuentra registrado.");
        });
    });
});
