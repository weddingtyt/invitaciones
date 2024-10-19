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
        titulo.innerText = resultado.mensaje
        console.log('Invitados:', resultado.invitados);
        resultado.invitados.forEach(element => {
            lista.innerHTML += `<li>${element}</li>`
        });
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
    contenedor.style.setProperty('--animate-duration', '2s');
    contenedor.classList.add('animate__animated', 'animate__fadeOut');

    contenedor.addEventListener('animationend', ()=>{
        contenedor.style.display = 'none';

        principal.style.display = 'block';
        principal.style.setProperty('--animate-duration', '2s');
        principal.classList.add('animate__animated', 'animate__fadeIn');
    })
}
main();

document.addEventListener('click', () => desaparecer())


