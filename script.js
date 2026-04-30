// Temporizador de 20 segundos para la intro
let introTimer = setTimeout(startApp, 20000);

function startApp() {
    clearTimeout(introTimer);
    slideTransition('intro-screen', 'map-screen', 'left');
}

function openExpert(name, color) {
    document.getElementById('expert-title').innerText = name.toUpperCase();
    document.getElementById('dynamic-header').style.backgroundColor = color;
    
    const videoId = 'q7HNoX9Lp8A'; 
    document.getElementById('video-1').src = `https://www.youtube.com/embed/${videoId}`;
    document.getElementById('video-2').src = `https://www.youtube.com/embed/${videoId}`;
    document.getElementById('video-3').src = `https://www.youtube.com/embed/${videoId}`;

    slideTransition('map-screen', 'expert-screen', 'left');
}

function closeExpert() {
    slideTransition('expert-screen', 'map-screen', 'right');
    // Limpiar videos después de la animación
    setTimeout(() => {
        document.querySelectorAll('iframe').forEach(f => f.src = "");
    }, 800);
}

/**
 * Lógica de transición por deslizamiento
 * @param {string} currentId - ID de la pantalla actual
 * @param {string} nextId - ID de la pantalla a la que vamos
 * @param {string} direction - 'left' para avanzar, 'right' para retroceder
 */
function slideTransition(currentId, nextId, direction) {
    const current = document.getElementById(currentId);
    const next = document.getElementById(nextId);

    if (direction === 'left') {
        current.classList.replace('active', 'prev');
        next.classList.replace('next', 'active');
    } else {
        current.classList.replace('active', 'next');
        next.classList.replace('prev', 'active');
    }
}

function openPopup() { document.getElementById('pop-overlay').classList.add('active'); }
function closePopup() { document.getElementById('pop-overlay').classList.remove('active'); }

function doLogin() {
    const p = prompt("Password:");
    if(p === "1234") alert("✅ Acceso permitido");
}