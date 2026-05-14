// ============================================================
// FIREBASE — paste your config here
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
    getFirestore, doc, setDoc, deleteDoc,
    onSnapshot, collection, getDocs, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "PASTE_YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "0000000000",
    appId: "1:0000000000:web:abc123"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ============================================================
// USERS
// ============================================================
const USERS = {
    "barcelona":  { password: "nepal2025", displayName: "Escola Barcelona",   color: "#3498db" },
    "girona":     { password: "nepal2025", displayName: "Institut Girona",    color: "#9b59b6" },
    "tarragona":  { password: "nepal2025", displayName: "Escola Tarragona",   color: "#16a085" },
    "lleida":     { password: "nepal2025", displayName: "Institut Lleida",    color: "#f39c12" },
    "manresa":    { password: "nepal2025", displayName: "Escola Manresa",     color: "#e74c3c" },
    "sabadell":   { password: "nepal2025", displayName: "Institut Sabadell",  color: "#1abc9c" },
    "terrassa":   { password: "nepal2025", displayName: "Escola Terrassa",    color: "#f368e0" },
    "vic":        { password: "nepal2025", displayName: "Institut Vic",       color: "#5f27cd" },
};

const DEMO_SESSIONS = [
    { id: "demo-bcn",       displayName: "Escola Barcelona",  color: "#3498db", center: "Amics del Nepal" },
    { id: "demo-girona",    displayName: "Institut Girona",   color: "#9b59b6", center: "Amor Children's Home" },
    { id: "demo-tarragona", displayName: "Escola Tarragona",  color: "#16a085", center: "Purwanchal Bal Sewa" },
    { id: "demo-lleida",    displayName: "Institut Lleida",   color: "#f39c12", center: "Amics del Nepal" },
    { id: "demo-manresa",   displayName: "Escola Manresa",    color: "#e74c3c", center: "Amor Children's Home" },
];

// Center positions match the activity pin tips (measured from the actual PNG)
const CENTER_POSITIONS = {
    "Amor Children's Home": { top: 35,   left: 5.5 },   // Mahendranagar
    "Amics del Nepal":      { top: 59.2, left: 63.7 },  // Kathmandu
    "Purwanchal Bal Sewa":  { top: 83.6, left: 85.6 }   // Biratnagar
};

const RIPPLE_COLORS = {
    political:  '#2d4a5e',
    physical:   '#5b6e3f',
    teams:      '#c8434d',
    activities: '#e8773c'
};

const MAP_SRC = {
    political:  'Nepal 2 political-map.png',
    physical:   'Nepal-Map-with-river-and-national-park-1.png',
    teams:      'Nepal-Map-ToPrint.png',
    activities: 'Nepal-Map-ToPrint.png'
};

let currentUser = null;
let activeSchools = [];
let currentMode = 'activities';
const SESSION_KEY = "nepal-docfest-session";

// ============================================================
// INTRO
// ============================================================
const introTimer = setTimeout(startApp, 15000);
function startApp() {
    clearTimeout(introTimer);
    document.getElementById('intro-screen').classList.add('fade-out');
}

// ============================================================
// MODALS
// ============================================================
function toggleLoginModal() { document.getElementById('login-modal').classList.toggle('active'); }
function openLocationSelector() { document.getElementById('loc-modal').classList.add('active'); }
function closeLocationSelector() { document.getElementById('loc-modal').classList.remove('active'); }
function openUserMenu() {
    if (!currentUser) return;
    document.getElementById('user-menu-title').innerText = currentUser.displayName;
    document.getElementById('user-menu-info').innerText =
        currentUser.center ? `Center: ${currentUser.center}` : "No center selected";
    document.getElementById('user-menu').classList.add('active');
}
function closeUserMenu() { document.getElementById('user-menu').classList.remove('active'); }
function handleUserClick() { currentUser ? openUserMenu() : toggleLoginModal(); }

// ============================================================
// AUTH
// ============================================================
async function handleAuth() {
    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const user = USERS[username];

    if (!user || user.password !== password) {
        showToast("Invalid username or password");
        return;
    }

    currentUser = { username, ...user, center: null };
    localStorage.setItem(SESSION_KEY, JSON.stringify({ username, password }));
    updateUserUI();
    showToast(`Welcome, ${user.displayName}!`);
    toggleLoginModal();
    document.getElementById('password').value = '';
    setTimeout(openLocationSelector, 400);
}

async function setUserLocation(loc) {
    if (!currentUser) {
        showToast("Please log in first");
        closeLocationSelector();
        return;
    }
    currentUser.center = loc;
    document.getElementById('display-user-loc').innerText = loc;
    try {
        await setDoc(doc(db, "activeSessions", currentUser.username), {
            displayName: currentUser.displayName,
            color: currentUser.color,
            center: loc,
            loggedInAt: serverTimestamp()
        });
        showToast(`You're now at ${loc}`);
    } catch (e) {
        console.error(e);
        showToast("Could not save location");
    }
    closeLocationSelector();
}

async function logout() {
    if (!currentUser) return;
    try { await deleteDoc(doc(db, "activeSessions", currentUser.username)); } catch (e) { console.error(e); }
    localStorage.removeItem(SESSION_KEY);
    currentUser = null;
    updateUserUI();
    closeUserMenu();
    showToast("Logged out");
}

function updateUserUI() {
    const userEl = document.querySelector('.user-info');
    const nameEl = document.getElementById('user-name-text');
    const locEl = document.getElementById('display-user-loc');
    if (currentUser) {
        nameEl.innerText = currentUser.displayName;
        userEl.classList.add('logged-in');
        locEl.innerText = currentUser.center || 'Select location';
    } else {
        nameEl.innerText = 'Guest (Click to Login)';
        userEl.classList.remove('logged-in');
        locEl.innerText = 'No location';
    }
}

function restoreSession() {
    const saved = localStorage.getItem(SESSION_KEY);
    if (!saved) return;
    try {
        const { username, password } = JSON.parse(saved);
        const user = USERS[username];
        if (user && user.password === password) {
            currentUser = { username, ...user, center: null };
            updateUserUI();
        }
    } catch (e) { localStorage.removeItem(SESSION_KEY); }
}

// ============================================================
// FIRESTORE
// ============================================================
async function seedDemoIfEmpty() {
    try {
        const snap = await getDocs(collection(db, "activeSessions"));
        if (snap.empty) {
            for (const s of DEMO_SESSIONS) {
                await setDoc(doc(db, "activeSessions", s.id), {
                    displayName: s.displayName,
                    color: s.color,
                    center: s.center,
                    loggedInAt: serverTimestamp()
                });
            }
        }
    } catch (e) { console.warn("Demo seed failed:", e); }
}

function listenActiveSessions() {
    onSnapshot(collection(db, "activeSessions"), (snapshot) => {
        activeSchools = [];
        snapshot.forEach(d => activeSchools.push({ id: d.id, ...d.data() }));
        renderActiveSchools();
        if (currentUser) {
            const mine = activeSchools.find(s => s.id === currentUser.username);
            if (mine) {
                currentUser.center = mine.center;
                document.getElementById('display-user-loc').innerText = mine.center;
            }
        }
    });
}

function renderActiveSchools() {
    const layer = document.getElementById('schools-layer');
    layer.innerHTML = '';
    const grouped = {};
    activeSchools.forEach(s => {
        if (!grouped[s.center]) grouped[s.center] = [];
        grouped[s.center].push(s);
    });
    Object.entries(grouped).forEach(([center, schools]) => {
        const pos = CENTER_POSITIONS[center];
        if (!pos) return;
        schools.forEach((school, i) => {
            const cols = Math.min(schools.length, 4);
            const row = Math.floor(i / cols);
            const col = i % cols;
            const totalRowWidth = (cols - 1) * 4.5;
            const offsetX = (col * 4.5) - (totalRowWidth / 2);
            const offsetY = 5 + (row * 5);
            const el = document.createElement('div');
            el.className = 'school-marker';
            if (currentUser && school.id === currentUser.username) el.classList.add('is-me');
            el.style.setProperty('--bg', school.color);
            el.style.top = `${pos.top + offsetY}%`;
            el.style.left = `${pos.left + offsetX}%`;
            el.innerHTML = `
                <div class="school-avatar" style="background:${school.color}">${getInitials(school.displayName)}</div>
                <div class="school-tooltip">${school.displayName}${school.id.startsWith('demo-') ? ' (demo)' : ''}</div>
            `;
            layer.appendChild(el);
        });
    });
}

function getInitials(name) {
    return name.split(/\s+/).map(w => w[0]).join('').substring(0, 2).toUpperCase();
}

// ============================================================
// MAP NAVIGATION + RIPPLE
// ============================================================
function changeMap(type, event) {
    if (type === currentMode) return;
    currentMode = type;

    const btn = event.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const stage = document.querySelector('.map-stage');
    const ripple = document.createElement('div');
    ripple.className = 'map-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.setProperty('--rc', RIPPLE_COLORS[type]);
    document.getElementById('ripple-host').appendChild(ripple);

    requestAnimationFrame(() => {
        ripple.classList.add('expand');
        stage.classList.add('swapping');
    });

    setTimeout(() => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyMapMode(type);
    }, 480);

    setTimeout(() => stage.classList.remove('swapping'), 700);
    setTimeout(() => ripple.classList.add('fade'), 600);
    setTimeout(() => ripple.remove(), 1200);
}

function applyMapMode(type) {
    const mapImg = document.getElementById('main-map-img');
    const activities = document.getElementById('activities-layer');
    const experts = document.getElementById('experts-layer');
    const schools = document.getElementById('schools-layer');

    mapImg.src = MAP_SRC[type];

    if (type === 'political' || type === 'physical') {
        activities.style.display = 'none';
        experts.style.display = 'none';
        schools.style.display = 'none';
    } else if (type === 'teams') {
        activities.style.display = 'none';
        experts.style.display = 'none';
        schools.style.display = 'block';
    } else {
        activities.style.display = 'block';
        experts.style.display = 'block';
        schools.style.display = 'none';
    }
}

// ============================================================
// EXPERT SCREEN
// ============================================================
function openExpert(name, color) {
    document.getElementById('expert-title').innerText = name.toUpperCase();
    document.getElementById('dynamic-header').style.backgroundColor = color;
    const videoId = "q7HNoX9Lp8A";
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

// ============================================================
// TOAST
// ============================================================
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

// ============================================================
// EXPOSE
// ============================================================
Object.assign(window, {
    startApp, toggleLoginModal, openLocationSelector, closeLocationSelector,
    openUserMenu, closeUserMenu, handleUserClick, handleAuth, setUserLocation,
    logout, changeMap, openExpert, closeExpert
});

// ============================================================
// BOOT
// ============================================================
restoreSession();
seedDemoIfEmpty();
listenActiveSessions();