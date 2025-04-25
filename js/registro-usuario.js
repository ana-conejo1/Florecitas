const registrar = document.getElementById('submit');

registrar.addEventListener('click', (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
        return;
    }
    // Capturar valores de los campos del formulario
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const fechaNacimiento = document.getElementById("datepicker").value;
    const phone = document.getElementById("phone").value;
    const correoElectronico = document.getElementById("email").value;
    const password1 = document.getElementById("password1").value;
    const password2 = document.getElementById("password2").value;
    const domicilio = document.getElementById("domicilio").value;
    const gridCheck1 = document.getElementById("gridCheck1").checked;

    // Validación de campos obligatorios
    if (!firstName || !lastName || !fechaNacimiento || !phone || !correoElectronico || !password1 || !gridCheck1) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

    // Validación de contraseñas
    if (password1 !== password2) {
        alert("Las contraseñas no coinciden");
        return;
    }

    const user = {
        nombreCliente: firstName,
        apellido: lastName,
        fechaNacimiento: fechaNacimiento,
        telefono: phone,
        email: correoElectronico,
        password: password1,
        domicilio: domicilio
    };

    const url = `http://localhost:8080/api/perseflora/users`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Guardado', data)
        document.getElementById("registroForm").reset();
    })
    .catch(error => {
        console.error(error);
    });
});

// Mostrar a todos los usuarios registrados
const urlUsers = `http://localhost:8080/api/perseflora/users`;

fetch(urlUsers)
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            return;
        }
    })
    .catch(error => {
        console.error(error);
    });
