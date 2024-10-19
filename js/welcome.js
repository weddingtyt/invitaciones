const contenedor = document.getElementById('initial-msg');
const contenido = document.getElementById('initial-msg-content');
const titulo = document.getElementById('initial-msg-title');
const lista = document.getElementById('initial-msg-list');

function getParametroInvitado() {
    const params = new URLSearchParams(window.location.search);
    return params.get('invitado');
}

// Función para cargar el JSON desde el archivo
async function cargarJSON() {
    try {
        const response = await fetch('./db/invitados.json'); // Ruta al archivo JSON
        if (!response.ok) {
            throw new Error('Error al cargar el JSON: ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// Función para buscar la familia en el JSON
function buscarInvitadoPorFamilia(invitadosData, familia) {
    lista.innerHTML = '';
    const resultado = invitadosData.invitados.find(item => item.familia === familia);

    if (resultado) {
        titulo.innerText = resultado.mensaje;
        console.log('Invitados:', resultado.invitados);

        // Mostrar los nombres de los invitados en una lista
        resultado.invitados.forEach(element => {
            lista.innerHTML += `<li>${element}</li>`;
        });

        // Obtener el número de WhatsApp y el nombre de confirmación (tomi o tati)
        const confirma = resultado.confirma === 'tati' ? 'Tati' : 'Tomi';
        const numeroWpp = resultado.num;
        
        // Unir los nombres de los invitados en una sola cadena
        const invitadosNombres = resultado.invitados.join(', ');
        
        // Crear el mensaje personalizado
        const mensaje = `Hola ${confirma}! Confirmamos la asistencia a la boda, el 25/01/2025!
        
Invitados que asistirán: ${invitadosNombres}`;

        // Actualizar el enlace de WhatsApp en el botón
        const wppButton = document.getElementById('wpp-button');
        const wppUrl = `https://wa.me/549${numeroWpp}?text=${encodeURIComponent(mensaje)}`;
        wppButton.innerHTML = `<a href="${wppUrl}" target="_blank">Confirmar</a>`;
        
    } else {
        console.log('Familia no encontrada');
    }
}


// Función principal para ejecutar la lógica
async function main() {
    const familia = getParametroInvitado();
    if (familia) {
        const invitadosData = await cargarJSON(); // Cargar el JSON
        if (invitadosData) {
            buscarInvitadoPorFamilia(invitadosData, familia);
        }
    } else {
        console.log('No se proporcionó ningún parámetro "invitado" en la URL');
    }
}

// Llamar a la función principal

const desaparecer = () =>{
    contenedor.style.setProperty('--animate-duration', '0.5s');
    contenedor.classList.add('animate__animated', 'animate__fadeOut');

    contenedor.addEventListener('animationend', ()=>{
        contenedor.style.display = 'none';

        principal.style.display = 'block';
        principal.style.setProperty('--animate-duration', '0.5s');
        principal.classList.add('animate__animated', 'animate__fadeIn');
    })
}
main();

const continuarButton = document.getElementById('continuar-button');
continuarButton.addEventListener('click', desaparecer);

