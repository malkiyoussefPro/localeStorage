// Función para finalizar el juego
function finalizarJuego(puntos) {
    // Detener el cronómetro
    clearInterval(cronometroInterval);
  
    // Desactivar la interacción con los bloques
    blocksContainer.classList.add('no-clicking');
  
    // Verificar la puntuación
    if (puntos <= 10) {
      // Mostrar mensaje y reiniciar el juego
      if (confirm('Tu puntuación es inferior o igual a 10. ¿Quieres intentarlo de nuevo?')) {
        reiniciarJuego();
      }
    } else {
      // Mostrar puntuación final
      alert('¡Juego terminado! Tu puntuación es: ' + puntos);
  
      // Guardar la puntuación del usuario
      guardarPuntuacion(puntos);
    }
  }
  
  // Función para reiniciar el juego
  function reiniciarJuego() {
    // Reiniciar el cronómetro
    minutos = 0;
    segundos = 0;
    milisegundos = 0;
    intentos = 0;
    clearInterval(cronometroInterval);
    document.getElementById('minutos').textContent = '00';
    document.getElementById('segundos').textContent = '00';
    document.getElementById('milisegundos').textContent = '00';
    document.querySelector('.tries span').innerHTML = '0';
  
    // Desactivar la interacción con los bloques
    blocksContainer.classList.remove('no-clicking');
  
    // Restablecer el estado de los bloques
    blocks.forEach(block => {
      block.classList.remove('is-flipped', 'has-match');
      block.style.order = orderRange[blocks.indexOf(block)];
    });
  
    // Volver a habilitar la interacción con los bloques
    blocksContainer.classList.remove('no-clicking');
  }
  