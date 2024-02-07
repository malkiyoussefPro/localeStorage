let lStr = localStorage;
let nombre = document.getElementById('nombre');
let lastName = document.getElementById('LastName');
let email = document.getElementById("Email");
let password1 = document.getElementById('Password');
let confirmPassword = document.getElementById('ConfirmPassword');
let guardarUsuarioForm = document.querySelector('form'); // Seleccionamos el formulario completo en lugar del botón

guardarUsuarioForm.addEventListener("submit", function(event){
    event.preventDefault(); // Evitar que el formulario se envíe por defecto
    
    // Verificar si los campos del formulario están vacíos
    if (nombre.value === "" || lastName.value === "" || email.value === "" || password1.value === "" || confirmPassword.value === "") {
        alert("Por favor completa todos los campos del formulario.");
        return; // Detener la ejecución si hay campos vacíos
    }
    
    // Verificar el formato del correo electrónico usando una expresión regular
    let emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.match(emailFormat)) {
        alert("Por favor ingresa un correo electrónico válido.");
        return; // Detener la ejecución si el correo electrónico no tiene un formato válido
    }

    // Verificar si la contraseña y la confirmación de contraseña coinciden
    if (password1.value !== confirmPassword.value) {
        alert("La contraseña y la confirmación de contraseña no coinciden.");
        return; // Detener la ejecución si las contraseñas no coinciden
    }

    // Verificar si la contraseña tiene al menos 8 caracteres
    if (password1.value.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres.");
        return; // Detener la ejecución si la contraseña es demasiado corta
    }

    // Si llegamos aquí, significa que todos los campos están llenos y las contraseñas coinciden y tienen la longitud adecuada
    // Resto del código para guardar el usuario...

    // Obtener la lista actual de usuarios del localStorage
    let usuarios = JSON.parse(lStr.getItem("usuarios")) || [];

    // Crear un nuevo objeto de usuario con la información del formulario
    let nuevoUsuario = {
        nombre: nombre.value,
        lastName: lastName.value,
        email: email.value,
        password: password1.value // Corregir el nombre de la propiedad de la contraseña
    };

    // Agregar el nuevo usuario a la lista
    usuarios.push(nuevoUsuario);

    // Guardar la lista actualizada en el localStorage
    lStr.setItem("usuarios", JSON.stringify(usuarios));

    // Limpiar los campos del formulario
    nombre.value = "";
    lastName.value = "";
    email.value = "";
    password1.value = "";
    confirmPassword.value = "";
});


//Mostrar text de password

document.addEventListener("DOMContentLoaded", function() {
    let passwordInput = document.getElementById('Password');
    let confirmPasswordInput = document.getElementById('ConfirmPassword');
    let togglePasswordBtn = document.getElementById('togglePassword');
    let toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
    
    togglePasswordBtn.addEventListener("click", function(){
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
        togglePasswordBtn.classList.toggle("fa-eye");
        togglePasswordBtn.classList.toggle("fa-eye-slash");
    });
    
    toggleConfirmPasswordBtn.addEventListener("click", function(){
        confirmPasswordInput.type = confirmPasswordInput.type === "password" ? "text" : "password";
        toggleConfirmPasswordBtn.classList.toggle("fa-eye");
        toggleConfirmPasswordBtn.classList.toggle("fa-eye-slash");
    });
});

function recuperarValores() {
    let usuarios = JSON.parse(lStr.getItem("usuarios")) || [];

    // Suponiendo que el primer usuario de la lista es el que queremos mostrar
    if (usuarios.length > 0) {
        let primerUsuario = usuarios[0];
        nombre.value = primerUsuario.nombre;
        lastName.value = primerUsuario.lastName;
        email.value = primerUsuario.email;
        password1.value = primerUsuario.password1;
        confirmPassword.value = primerUsuario.password1; // Puede que no quieras mostrar la contraseña confirmada
    }
}


document.addEventListener("DOMContentLoaded", recuperarValores);
