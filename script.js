// Intro auto-timer
let introTimer = setTimeout(startApp, 15000);

function startApp() {
    clearTimeout(introTimer);
    document.getElementById('intro-screen').classList.add('fade-out');
}

// Login & Location
function toggleLoginModal() { document.getElementById('login-modal').classList.toggle('active'); }
function closeLocationSelector() { document.getElementById('loc-modal').classList.remove('active'); }
function openLocationSelector() { document.getElementById('loc-modal').classList.add('active'); }

function handleAuth() {
    const user = document.getElementById('username').value.trim();
    if (user) {
        document.getElementById('user-name-text').innerText = user;
        showToast("Hello, " + user + "!");
        toggleLoginModal();
    }
}

function setUserLocation(loc) {
    document.getElementById('display-user-loc').innerText = loc;
    showToast("Center: " + loc);
    closeLocationSelector();
}

// Map navigation
function changeMap(type, event) {
    const mapImg = document.getElementById('main-map-img');
    const activities = document.getElementById('activities-layer');
    const experts = document.getElementById('experts-layer');
    const buttons = document.querySelectorAll('.nav-btn');

    buttons.forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    if (type === 'political') {
        mapImg.src = 'Nepal 2 political-map.png';
        activities.style.display = 'none';
        experts.style.display = 'none';
    } else if (type === 'physical') {
        mapImg.src = 'Nepal-Map-with-river-and-national-park-1.png';
        activities.style.display = 'none';
        experts.style.display = 'none';
    } else if (type === 'teams') {
        mapImg.src = 'Nepal-Map-ToPrint.png';
        activities.style.display = 'none';
        experts.style.display = 'block';
    } else {
        mapImg.src = 'Nepal-Map-ToPrint.png';
        activities.style.display = 'block';
        experts.style.display = 'block';
    }
}

// Content screen (Experts / Homes)
function openExpert(name, color) {
    document.getElementById('expert-title').innerText = name.toUpperCase();
    document.getElementById('dynamic-header').style.backgroundColor = color;

    const videoId = "q7HNoX9Lp8A"; // Replace per expert
    document.getElementById('video-1').src = `https://www.youtube.com/embed/${videoId}`;
    document.getElementById('video-2').src = `https://www.youtube.com/embed/${videoId}`;
    document.getElementById('video-3').src = `https://www.youtube.com/embed/${videoId}`;

    document.getElementById('expert-screen').classList.add('active');
}

function closeExpert() {
    document.getElementById('expert-screen').classList.remove('active');
    document.getElementById('video-1').src = "";
    document.getElementById('video-2').src = "";
    document.getElementById('video-3').src = "";
}

function showToast(msg) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = msg;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}