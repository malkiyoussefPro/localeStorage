// Al cargar la página
window.onload = function () {
    // Restablecer puntuación
    document.querySelector('.tries span').innerHTML = '0';

    // Seleccionar el botón de inicio del juego y asignar el evento onclick
    document.querySelector(".control-buttons span").onclick = function () {
        // Iniciar cronómetro
        cronometroInterval = setInterval(actualizarCronometro, 10);

        // Remove Splash Screen
        document.querySelector(".control-buttons").remove();
    };
};

// Variables globales para el cronómetro
let minutos = 0;
let segundos = 0;
let milisegundos = 0;
let cronometroInterval;
let intentos = 0; // Variable global para el número de intentos

// Función para actualizar el cronómetro
function actualizarCronometro() {
    milisegundos++;
    if (milisegundos >= 100) {
        milisegundos = 0;
        segundos++;
        if (segundos >= 60) {
            segundos = 0;
            minutos++;
        }
    }

    // Actualizar la visualización del cronómetro en la interfaz de usuario
    document.getElementById('minutos').textContent = minutos < 10 ? '0' + minutos : minutos;
    document.getElementById('segundos').textContent = segundos < 10 ? '0' + segundos : segundos;
    document.getElementById('milisegundos').textContent = milisegundos < 10 ? '0' + milisegundos : milisegundos;
}

// Función para finalizar el juego
function finalizarJuego(puntos) {
    // Detener el cronómetro
    clearInterval(cronometroInterval);

    // Desactivar la interacción con los bloques
    blocksContainer.classList.add('no-clicking');

    // Mostrar puntuación final
    alert('¡Juego terminado! Tu puntuación es: ' + puntos);
}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();

        // Check if all blocks have a match
        if (blocks.every(block => block.classList.contains('has-match'))) {
            // Finalizar el juego y asignar puntuación
            finalizarJuego(calcularPuntos());
        }
    } else {
        intentos++; // Incrementar el contador de intentos
        triesElement.innerHTML = intentos; // Actualizar la interfaz con el número de intentos

        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);

        document.getElementById('fail').play();
    }
}

// Función para calcular la puntuación
function calcularPuntos() {
    // Calcular tiempo total en segundos
    let tiempoTotalSegundos = minutos * 60 + segundos + milisegundos / 100;

    // Verificar las condiciones para asignar puntos
    if (minutos === 1 && intentos <= 10) {
        return 10; // 1 minuto con 10 o menos errores
    } else if (minutos === 2 && intentos <= 15) {
        return 5; // 2 minutos con 15 o menos errores
    } else if (minutos >= 3 || intentos > 15) {
        return 0; // 3 minutos o más, o más de 15 errores
    } else {
        // En caso de no cumplir ninguna de las condiciones anteriores, retornar 0
        return 0;
    }
}

// Resto del código...
