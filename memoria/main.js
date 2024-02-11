

// Al cargar la página
window.onload = function () {
    // Verificar si hay un nombre guardado en el localStorage
    let savedName = localStorage.getItem('savedName');
    if (savedName) {
        // Si hay un nombre guardado, establecerlo en la interfaz
        document.querySelector(".name span").innerHTML = savedName;
    }

    // Seleccionar el botón de inicio del juego
    document.querySelector(".control-buttons span").onclick = function () {
        // Obtener el nombre del usuario
        let yourName = localStorage.getItem('savedName');

        // Si el nombre no está vacío
        if (yourName && yourName.trim() !== "") {
            // Establecer el nombre en la interfaz
            document.querySelector(".name span").innerHTML = yourName.trim();
        }

        // Remove Splash Screen
        document.querySelector(".control-buttons").remove();

        // Iniciar cronómetro
        cronometroInterval = setInterval(actualizarCronometro, 10);

        // Restablecer puntuación
        document.querySelector('.tries span').innerHTML = '0';
    };
};
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

  
  // Effect Duration
  let duration = 1000;
  
  // Select Blocks Container
  let blocksContainer = document.querySelector(".memory-game-blocks");
  
  // Create Array From Game Blocks
  let blocks = Array.from(blocksContainer.children);
  
  // Create Range Of Keys
  // let orderRange = [...Array(blocks.length).keys()];
  
  let orderRange = Array.from(Array(blocks.length).keys());
  
  // console.log(orderRange);
  shuffle(orderRange);
  // console.log(orderRange);
  
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
  
      // console.log('Two Flipped Blocks Selected');
  
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
  
