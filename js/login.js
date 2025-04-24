const iniciarSesion = document.getElementById('submit');

iniciarSesion.addEventListener('click', () => {
    const correoElectronico = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!correoElectronico || !password) {
        alert("Por favor, ingresa tu correo electrónico y contraseña.");
        return;
    }

    const url = `http://localhost:8080/auth/perseflora/login`;

    const user = {
        email: correoElectronico,
        password: password
    };

    // fetch para método get
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text); });
            }
            return response.json();
        })
        .then(user => {
            alert(`¡Bienvenido, ${user.nombreCliente} ${user.apellido || ''}!`);
            window.location.href = "/index.html";
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
});

document.getElementById('forgotPasswordForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('resetEmail').value;
    alert(`Se ha enviado un enlace de restablecimiento a: ${email}`);
    // Aquí puedes implementar la lógica para enviar el correo de restablecimiento.
});