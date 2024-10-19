document.addEventListener("DOMContentLoaded", function() {
    
    // Fecha de destino para el contador
    const targetDate = new Date("2025-01-25T00:00:00").getTime();

    // Función para actualizar el contador
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Cálculo de días, horas, y minutos
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Actualizar los elementos HTML
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;

        document.getElementById("contador").innerText = `${days} : ${hours} : ${minutes} : ${seconds}`
        // Si la cuenta regresiva ha terminado
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").innerHTML = "<p class='fuente text center size-sub'><b>¡El día ha llegado!</b></p>";
        }
    }

    // Actualizar el contador cada minuto
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Llamada inicial
});


