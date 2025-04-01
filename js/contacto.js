// Obtener elementos del formulario
const registrationForm = document.querySelector("form");
const errorMessages = document.getElementById("errorMessages");
const title = document.getElementById("title");

// Manejar el envío del formulario
registrationForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevenir el envío automático

  const { name, email, phone, message } = registrationForm.elements;
  errorMessages.innerHTML = ""; // Limpiar mensajes de error

  let hasError = false;

  // Limpiar errores anteriores
  removeError(name);
  removeError(email);
  removeError(phone);
  removeError(message);

  // Validar nombre
  if (!isUsername(name.value)) {
    displayError(name, "Ingrese un nombre válido (al menos 3 caracteres).");
    hasError = true;
  }

  // Validar email
  if (!email.value.trim() || !isValidEmail(email.value)) {
    displayError(email, "Ingrese una dirección de correo electrónico válida.");
    hasError = true;
  }

  // Validar teléfono (opcional)
  if (phone.value && !isValidPhone(phone.value)) {
    displayError(phone, "Ingrese un teléfono válido (10 dígitos).");
    hasError = true;
  }

  // Validar mensaje
  if (!message.value.trim() || !isStrongMessage(message.value)) {
    displayError(message, "El mensaje debe contener al menos 10 caracteres.");
    hasError = true;
  }

  // Si hay errores, no enviar
  if (hasError) return;

  // Si no hay errores, puedes enviar el formulario manualmente
  registrationForm.submit(); // Esto permite que el formulario se envíe de forma normal a FormSubmit

  // Mostrar mensaje de éxito
  alert("¡Gracias por contactarnos! Hemos recibido tu mensaje.");
  title.innerHTML = "¡Gracias por escribir!";
  registrationForm.style.display = "none"; // Ocultar el formulario

  // Restaurar el formulario después de 3 segundos
  setTimeout(() => {
    registrationForm.reset(); // Limpiar formulario
    registrationForm.style.display = "block"; // Volver a mostrar formulario
    title.innerHTML = "Contáctanos"; // Restaurar título
  }, 3000);
});

// Función para mostrar errores en rojo debajo de cada campo
function displayError(field, message) {
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("error");
  errorDiv.style.color = "red";
  errorDiv.textContent = message;
  field.insertAdjacentElement("afterend", errorDiv); // Mostrar error después del campo
}

// Función para eliminar errores previos
function removeError(field) {
  const existingError = field.nextElementSibling;
  if (existingError && existingError.classList.contains("error")) {
    existingError.remove(); // Eliminar mensaje de error si existe
  }
}

// Validaciones
function isUsername(username) {
  return /^(?=.*[a-zA-Z]).{3,}$/.test(username); // Mínimo 3 caracteres
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Valida formato de correo
}

function isValidPhone(phone) {
  return /^[0-9]{10}$/.test(phone); // Valida un teléfono de 10 dígitos
}

function isStrongMessage(message) {
  return message.trim().length >= 10; // Mínimo 10 caracteres
}