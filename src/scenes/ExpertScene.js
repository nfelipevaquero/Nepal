class ExpertScene extends Phaser.Scene {
    constructor() { super('ExpertScene'); }
    
    init(data) { 
        localStorage.setItem('currentScene', 'ExpertScene');
        this.expert = data.expert || {
            role: "FOOD EXPERT", name: "KAVITA GURUNG", location: "Pokhara", color: 0x922b21,
            videos: { start: "q7HNoX9Lp8A", closing: "q7HNoX9Lp8A", next: "q7HNoX9Lp8A" }
        };
    }

    create() {
        const { width, height } = this.scale;
        this.add.rectangle(width/2, height/2, width, height, 0xf4f7f6);
        
        // --- 1. HEADER ---
        const header = this.add.graphics();
        header.fillGradientStyle(this.expert.color, this.expert.color, 0x922b21, 0x922b21, 1);
        header.fillRect(0, 0, width, 110);
        this.add.text(120, 35, this.expert.role, { fontSize: '34px', fontStyle: 'bold', color: '#fff' });

        const closeX = this.add.text(width - 60, 55, '✕', { fontSize: '40px', color: '#fff', fontStyle: 'bold' })
            .setOrigin(0.5).setInteractive({ useHandCursor: true });
        closeX.on('pointerdown', () => {
            localStorage.setItem('currentScene', 'MapScene');
            this.scene.start('MapScene');
        });

        // --- 2. TARJETAS ---
        const videoY = 320; 
        this.createCard(235, 350, 370, 400, "START", this.expert.videos.start, videoY);
        this.createCard(1045, 350, 370, 400, "NEXT STAGE", this.expert.videos.next, videoY);
        this.createCard(640, 420, 420, 560, "CLOSING ACTIVITY", this.expert.videos.closing, videoY, true);

        // --- 3. FOOTER ---
        const footerY = 640;
        this.createOpeningBox(235, footerY);

        const nextBtn = this.add.circle(1045, footerY, 50, 0xe67e22).setInteractive({ useHandCursor: true }).setStrokeStyle(2, 0xe67e22);
        this.add.text(1045, footerY, '➔', { fontSize: '45px', color: '#fff', fontStyle: 'bold' }).setOrigin(0.5);
        nextBtn.on('pointerdown', () => {
            localStorage.setItem('currentScene', 'QuizScene');
            this.scene.start('QuizScene');
        });
    }

    createIcon(x, y, emoji, action) {
    // Círculo de fondo (se queda igual)
    const circle = this.add.circle(x, y, 35, 0xff77ff)
        .setInteractive({ useHandCursor: true })
        .setStrokeStyle(2, 0xff77ff);
    
    // El texto del emoji con protección de bordes y alta resolución
    const txt = this.add.text(x, y, emoji, { 
        fontSize: '32px',
        fontFamily: 'serif', // Ayuda a que algunos navegadores rendericen mejor el glifo
        padding: { left: 15, right: 15, top: 15, bottom: 15 } // Espacio de seguridad para no cortar
    }).setOrigin(0.5);

    // ESTO ES LO MÁS IMPORTANTE PARA LA NITIDEZ:
    // Forzamos a Phaser a dibujar el emoji al doble de resolución del canvas
    txt.setResolution(2); 

    circle.on('pointerdown', action);
}

    showPopup() {
        // En lugar de inyectar en el body, usamos el sistema DOM de Phaser pero con dimensiones relativas al canvas
        const popupHTML = `
            <div style="
                width: 1280px; height: 720px; 
                display: flex; justify-content: center; align-items: center; 
                background: rgba(0,0,0,0.8); pointer-events: auto;">
                
                <div style="
                    background: white; width: 600px; padding: 50px; 
                    border-radius: 30px; border: 5px solid #e67e22; 
                    position: relative; font-family: sans-serif;">
                    
                    <button id="close-btn" style="
                        position: absolute; right: 20px; top: 15px; 
                        background: none; border: none; font-size: 35px; 
                        cursor: pointer; color: #999;">✕</button>
                    
                    <h2 style="color: #e67e22; margin-top: 0; font-size: 32px;">Starting sentences:</h2>
                    <ul style="font-size: 20px; line-height: 2; color: #333; font-weight: bold; padding-left: 20px;">
                        <li>"We think the recipe ___ matches to the photo ___ because..."</li>
                        <li>"We agree"</li>
                        <li>"We don't agree because..."</li>
                    </ul>
                </div>
            </div>`;

        const pop = this.add.dom(640, 360).createFromHTML(popupHTML);
        pop.setDepth(100); // Nos aseguramos de que esté por encima de todo

        // Listener de cierre integrado
        const btn = document.getElementById('close-btn');
        if(btn) btn.onclick = () => pop.destroy();
    }

    createCard(x, y, w, h, title, videoId, vY, isCenter = false) {
        const g = this.add.graphics();
        g.fillStyle(0xffffff, 1).fillRoundedRect(x - w/2, y - h/2, w, h, 20);
        g.lineStyle(2, 0x0000ff, 0.1).strokeRoundedRect(x - w/2, y - h/2, w, h, 20);
        this.add.text(x, y - h/2 + 35, title, { fontSize: '22px', color: '#e67e22', fontStyle: 'bold' }).setOrigin(0.5);
        
        // Iframe con tamaño corregido
        const videoHTML = `<iframe width="${w-40}" height="${((w-40)*9)/16}" src="https://www.youtube.com/embed/${videoId}" frameborder="0" style="border-radius:12px;"></iframe>`;
        this.add.dom(x, vY).createFromHTML(videoHTML);

        if (isCenter) this.renderPhrases(x, vY + 140, w);
    }

    createOpeningBox(x, y) {
        const g = this.add.graphics();
        g.fillStyle(0xffffff, 1).fillRoundedRect(x-185, y-67, 370, 135, 20);
        g.lineStyle(2, 0x0000ff, 0.1).strokeRoundedRect(x-185, y-67, 370, 135, 20);
        this.add.text(x, y - 40, "Opening Activity", { fontSize: '22px', color: '#e67e22', fontStyle: 'bold' }).setOrigin(0.5);
        this.createIcon(x - 65, y + 25, '🔑', () => this.showPopup());
        this.createIcon(x + 65, y + 25, '✏️', () => window.open('https://docs.google.com', '_blank'));
    }

    renderPhrases(x, startY, w) {
        const colors = ["#f1c40f", "#e74c3c", "#2ecc71", "#333333", "#3f37c9"];
        const lines = [
            ["WHAT", "DO", "NEPALESE", "COMMONLY", "EAT?"],
            ["HOW", "DO", "NEPALESE", "COMMONLY", "EAT?"],
            ["WHAT", "DO", "NEPALESE", "DRINK?"],
            ["HOW", "DO", "NEPALESE", "COOK?"],
            ["WHAT FRUITS", "DO", "NEPALESE", "EAT?"],
            ["WHAT", "DON'T", "NEPALESE", "EAT?"],
            ["DO", "NEPALESE", "DRINK", "ALCOHOL AND", "SMOKE?"]
        ];
        lines.forEach((line, i) => {
            let curX = x - w/2 + 35;
            line.forEach((word, j) => {
                const t = this.add.text(curX, startY + (i * 28), word + " ", { 
                    fontSize: '14px', color: colors[j] || "#333", fontStyle: 'bold', fontFamily: 'Arial Narrow' 
                });
                curX += t.width;
            });
        });
    }
}