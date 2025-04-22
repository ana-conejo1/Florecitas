document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Por favor, ingresa tu correo electrónico y contraseña.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("userDB")) || [];

    const validUser = users.find(user => user.email === email && user.password === password);

    if (!validUser) {
        alert("Usuario y/o contraseña incorrectos.");
        return;
    }

    alert(`¡Bienvenido, ${validUser.firstname} ${validUser.lastname}!`);
    localStorage.setItem("login_success", JSON.stringify(validUser));
    window.location.href = "index.html";
});

document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('resetEmail').value;
    alert(`Se ha enviado un enlace de restablecimiento a: ${email}`);
    // Aquí puedes implementar la lógica para enviar el correo de restablecimiento.
});