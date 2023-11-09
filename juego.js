// juego.js
document.addEventListener('DOMContentLoaded', () => {
    const tarjetas = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D']; // Duplicamos las tarjetas
    const tablero = document.getElementById('tablero');
    let tarjetasSeleccionadas = [];
  
    // Función para mezclar el array de tarjetas de manera aleatoria
    function mezclarTarjetas() {
      for (let i = tarjetas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tarjetas[i], tarjetas[j]] = [tarjetas[j], tarjetas[i]];
      }
    }
  
    function seleccionarTarjeta(indice) {
      if (tarjetasSeleccionadas.length < 2) {
        tarjetasSeleccionadas.push({ indice, contenido: tarjetas[indice] });
        mostrarContenido(indice);
  
        if (tarjetasSeleccionadas.length === 2) {
          setTimeout(verificarCoincidencia, 1000);
        }
      }
    }
  
    function mostrarContenido(indice) {
      const tarjeta = document.getElementById(`tarjeta-${indice}`);
      tarjeta.textContent = tarjetas[indice];
    }
  
    function ocultarContenido(indice) {
      const tarjeta = document.getElementById(`tarjeta-${indice}`);
      tarjeta.textContent = '';
    }
  
    function desaparecerTarjeta(indice) {
      const tarjeta = document.getElementById(`tarjeta-${indice}`);
      tarjeta.style.visibility = 'hidden';
    }
  
    function verificarCoincidencia() {
      const [tarjeta1, tarjeta2] = tarjetasSeleccionadas;
  
      if (tarjeta1.contenido === tarjeta2.contenido) {
        // Coincidencia, ocultar tarjetas
        desaparecerTarjeta(tarjeta1.indice);
        desaparecerTarjeta(tarjeta2.indice);
      } else {
        // No coinciden, ocultar contenido y restablecer
        ocultarContenido(tarjeta1.indice);
        ocultarContenido(tarjeta2.indice);
      }
  
      // Limpiar las tarjetas seleccionadas después de un breve tiempo
      tarjetasSeleccionadas = [];
    }
  
    // Mezclar las tarjetas antes de colocarlas en el tablero
    mezclarTarjetas();
  
    // Crear las tarjetas en el tablero
    tarjetas.forEach((contenido, indice) => {
      const tarjeta = document.createElement('div');
      tarjeta.id = `tarjeta-${indice}`;
      tarjeta.className = 'tarjeta';
      tarjeta.addEventListener('click', () => seleccionarTarjeta(indice));
      tablero.appendChild(tarjeta);
    });
  });
  