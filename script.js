function changeScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

function openPopup() {
    document.getElementById('pop-overlay').classList.add('active');
}

function closePopup() {
    document.getElementById('pop-overlay').classList.remove('active');
}

function doLogin() {
    const p = prompt("Contraseña del colegio:");
    if(p === "1234") alert("✅ Acceso concedido.");
    else alert("❌ Clave incorrecta.");
}