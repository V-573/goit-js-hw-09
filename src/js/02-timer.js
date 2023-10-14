import flatpickr from "flatpickr";
import "/node_modules/flatpickr/dist/flatpickr.min.css";

let timerInterval; // Variable para almacenar el intervalo del temporizador

document.addEventListener('DOMContentLoaded', function () {
  
  const btnStart = document.querySelector('[data-start]');

  const options = {
    enableTime: true,
    time_24hr: true,
    minuteIncrement: 1,

    onClose(selectedDates) {
      const targetDate = selectedDates[0];
      updateTimer(targetDate);

      // Actualiza el temporizador cada segundo
      timerInterval = setInterval(() => {
        updateTimer(targetDate);
      }, 1000);
    },
  };

  flatpickr("#datetime-picker", options);

  function updateTimer(targetDate) {
    const currentDate = new Date();

    // Calcula la diferencia en milisegundos
    const ms = targetDate.getTime() - currentDate.getTime();

    // Si la fecha ya ha pasado, detén el temporizador
    if (ms <= 0) {
        clearInterval(timerInterval);
        alert('¡please choose in the future time!');
        btnStart.disabled = true;
      return;
    }

    // Convierte la diferencia a días, horas, minutos y segundos

    btnStart.disabled = false;
    
      
   
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);



    // Actualiza el HTML con los valores calculados
    requestAnimationFrame(() => {
      document.querySelector('[data-days]').textContent = formatTimeUnit(days);
      document.querySelector('[data-hours]').textContent = formatTimeUnit(hours);
      document.querySelector('[data-minutes]').textContent = formatTimeUnit(minutes);
      document.querySelector('[data-seconds]').textContent = formatTimeUnit(seconds);
    });
  

  }

  function formatTimeUnit(unit) {
    return unit < 10 ? `0${unit}` : unit;
  }
});