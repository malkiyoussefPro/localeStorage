// Variables globales para el cronómetro y tiempo total en segundos
let minutos = 0;
let segundos = 0;
let milisegundos = 0;
let tiempoTotalSegundos = 0;
let cronometroInterval;
let intentos = 0; // Variable global para el número de intentos

// Al cargar la página
window.addEventListener('load', function () {

    // Verificar si hay un nombre guardado en el localStorage
    let savedName = localStorage.getItem('savedName');

    console.log(localStorage.getItem('savedName'));
    if (savedName) {

        // Si hay un nombre guardado, establecerlo en el elemento HTML
        document.getElementById('userName').innerText = savedName;
    }



    // Seleccionar el botón de inicio del juego
    document.querySelector(".control-buttons span").onclick = function () {
        // Obtener el nombre del usuario
        let yourName = localStorage.getItem('savedName');

        // Si el nombre no está vacío
        if (yourName && yourName.trim() !== "") {
            // Establecer el nombre en la interfaz
            document.getElementById('userName').innerHTML = yourName;
        }
        console.log(savedName);
        // Guardar el nombre del usuario en el localStorage
        localStorage.setItem('savedName', yourName);

        // Remove Splash Screen
        document.querySelector(".control-buttons").remove();

        // Iniciar cronómetro
        cronometroInterval = setInterval(actualizarCronometro, 10);

        // Restablecer puntuación
        document.querySelector('.tries span').innerHTML = '0';
    };
});

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

    // Seleccionar el contenedor de bloques
    blocksContainer = document.querySelector(".memory-game-blocks");

    // Create Array From Game Blocks
    let blocks = Array.from(blocksContainer.children);

    // Create Range Of Keys
    let orderRange = Array.from(Array(blocks.length).keys());

    shuffle(orderRange);

    // Add Order Css Property To Game Blocks
    blocks.forEach((block, index) => {
        // Add CSS Order Property
        block.style.order = orderRange[index];

        // Add Click Event
        block.addEventListener('click', function () {
            // Trigger The Flip Block Function
            flipBlock(block);
        });
    });
};

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

    // Calcular el tiempo total en segundos
    tiempoTotalSegundos = minutos * 60 + segundos + milisegundos / 100;

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

    // Guardar la puntuación del usuario
    guardarPuntuacion(puntos);

    // Guardar el tiempo total en el localStorage
    localStorage.setItem('tiempoTotal', tiempoTotalSegundos);

    // Verificar si se alcanzaron los 20 puntos
    verificarPuntos(puntos);
}

// Función para guardar la puntuación en localStorage
function guardarPuntuacion(puntos) {
    // Obtener el nombre del usuario
    let savedName = localStorage.getItem('savedName');

    // Obtener el array de puntuaciones del localStorage
    let scores = JSON.parse(localStorage.getItem('scores')) || [];

    // Buscar si ya existe un registro para el usuario actual
    let userScoreIndex = scores.findIndex(score => score.name === savedName);

    if (userScoreIndex !== -1) {
        // Si ya existe un registro, actualizar la puntuación y el tiempo
        scores[userScoreIndex].score = puntos;
        scores[userScoreIndex].time = tiempoTotalSegundos;
    } else {
        // Si no existe un registro, agregar uno nuevo
        let userScore = {
            name: savedName,
            score: puntos,
            time: tiempoTotalSegundos
        };

        scores.push(userScore);
    }

    // Ordenar las puntuaciones por puntuación descendente
    scores.sort((a, b) => b.score - a.score);

    // Limitar la cantidad de puntuaciones guardadas (opcional)
    scores = scores.slice(0, 10); // Por ejemplo, guardamos solo las 10 mejores puntuaciones

    // Guardar el array de puntuaciones actualizado en el localStorage
    localStorage.setItem('scores', JSON.stringify(scores));
}

// Effect Duration
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create Range Of Keys
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {

    // Add CSS Order Property
    block.style.order = orderRange[index];

    // Add Click Event
    block.addEventListener('click', function () {

        // Trigger The Flip Block Function
        flipBlock(block);

    });

});

// Flip Block Function
function flipBlock(selectedBlock) {

    // Add Class is-flipped
    selectedBlock.classList.add('is-flipped');

    // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // If Theres Two Selected Blocks
    if (allFlippedBlocks.length === 2) {

        // Stop Clicking Function
        stopClicking();

        // Check Matched Block Function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

    }

}

// Stop Clicking Function
function stopClicking() {

    // Add Class No Clicking on Main Container
    blocksContainer.classList.add('no-clicking');

    // Wait Duration
    setTimeout(() => {

        // Remove Class No Clicking After The Duration
        blocksContainer.classList.remove('no-clicking');

    }, duration);

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
    if (minutos === 1 && intentos <= 35) {
        return 20; // 1 minuto con 35 o menos errores
    } else if (minutos === 2 && intentos <= 40) {
        return 15; // 2 minutos con 40 o menos errores
    } else if (minutos >= 3 && intentos > 55) {
        return 10; // 3 minutos o más, o más de 55 errores
    } else {
        // Otro caso
        return calcularPuntosPorTiempo(tiempoTotalSegundos, intentos);
    }
}

// Función para calcular la puntuación basada en el tiempo y los intentos
function calcularPuntosPorTiempo(tiempoTotalSegundos, intentos) {
    if (tiempoTotalSegundos <= 60 && intentos <= 35) {
        return 20; // Menos de 1 minuto con 35 o menos errores
    } else if (tiempoTotalSegundos <= 120 && intentos <= 40) {
        return 15; // Menos de 2 minutos con 40 o menos errores
    } else if (tiempoTotalSegundos <= 180 && intentos <= 55) {
        return 10; // Menos de 3 minutos con 55 o menos errores
    } else {
        return 0; // 3 minutos o más, o más de 55 errores
    }
}

// Shuffle Function
function shuffle(array) {

    // Settings Vars
    let current = array.length,
        temp,
        random;

    while (current > 0) {

        // Get Random Number
        random = Math.floor(Math.random() * current);

        // Decrease Length By One
        current--;

        // [1] Save Current Element in Stash
        temp = array[current];

        // [2] Current Element = Random Element
        array[current] = array[random];

        // [3] Random Element = Get Element From Stash
        array[random] = temp;

    }
    return array;
}

// Función para verificar si se alcanzaron los 20 puntos
function verificarPuntos(puntos) {
    if (puntos < 20) {
        // Preguntar al usuario si desea jugar de nuevo
        if (confirm("No has alcanzado los 20 puntos. ¿Deseas jugar de nuevo?")) {
            // Si el usuario quiere jugar de nuevo, recargar la página para reiniciar el juego
            window.location.reload();
        } else {
            // Si el usuario no quiere jugar de nuevo, redirigirlo a la página de bienvenida
            window.location.href = '../welcome.html';
        }
    }
}

// Función para mostrar el ranking
function mostrarRanking() {
    // Obtener los tiempos de juego del localStorage
    let times = JSON.parse(localStorage.getItem('times')) || [];

    // Ordenar los tiempos de juego en función del tiempo
    times.sort((a, b) => a.time - b.time);

    // Mostrar el ranking
    console.log("Ranking:");
    times.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name}: ${user.time} segundos`);
    });
}

document.getElementById('logoutButton').style.display = 'inline-block'; // Mostrar botón de logout
// Evento de clic para el botón de logout
document.getElementById('logoutButton').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar que el enlace redireccione

    // Limpiar datos de sesión almacenados en el localStorage
    localStorage.removeItem('savedName');
    localStorage.removeItem('rememberStatus');
    localStorage.removeItem('rememberedName');

    // Redireccionar a la página de inicio de sesión
    window.location.href = '../welcome.html';
});
