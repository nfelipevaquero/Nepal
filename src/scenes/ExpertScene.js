class ExpertScene extends Phaser.Scene {
    constructor() { super('ExpertScene'); }
    init(data) { this.expert = data.expert; }

    create() {
        // Fondo base
        this.add.rectangle(640, 360, 1280, 720, 0xf4f7f6);
        
        // --- 1. HEADER ---
        const header = this.add.graphics();
        header.fillGradientStyle(this.expert.color, this.expert.color, 0x922b21, 0x922b21, 1);
        header.fillRect(0, 0, 1280, 110);

        this.add.text(120, 35, "FOOD EXPERT", { 
            fontSize: '34px', fontStyle: 'bold', color: '#fff', fontFamily: 'Arial Black'
        });
        this.add.text(120, 75, "KAVITA GURUNG | Pokhara - Province 4", { 
            fontSize: '18px', color: '#eee', fontFamily: 'Arial'
        });

        const closeX = this.add.text(1220, 55, '✕', { 
            fontSize: '40px', color: '#fff', fontStyle: 'bold' 
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        closeX.on('pointerdown', () => this.scene.start('MapScene'));

        // --- 2. TARJETAS Y VÍDEOS ---
        const videoY = 320; 

        this.createCard(235, 350, 370, 400, "START", this.expert.videos.start, videoY);
        this.createCard(1045, 350, 370, 400, "NEXT STAGE", this.expert.videos.next, videoY);
        this.createCard(640, 420, 420, 560, "CLOSING ACTIVITY", this.expert.videos.closing, videoY, true);

        // --- 3. SECCIÓN INFERIOR (Opening Activity) ---
        const footerY = 640;
        const footerX = 235;
        const footerW = 370;
        const footerH = 135;
        
        const footerBg = this.add.graphics();
        footerBg.fillStyle(0xffffff, 1);
        footerBg.fillRoundedRect(footerX - footerW/2, footerY - footerH/2, footerW, footerH, 20);
        footerBg.lineStyle(1.5, 0x0000ff, 0.1); 
        footerBg.strokeRoundedRect(footerX - footerW/2, footerY - footerH/2, footerW, footerH, 20);

        this.add.text(footerX, footerY - 40, "Opening Activity", { 
            fontSize: '22px', color: '#e67e22', fontStyle: 'bold' 
        }).setOrigin(0.5);

        // ICONOS: Definición ultra nítida
        this.createIcon(footerX - 60, footerY + 20, '🔑', () => this.showPopup());
        this.createIcon(footerX + 60, footerY + 20, '✏️', () => window.open('https://docs.google.com', '_blank'));

        // BOTÓN SIGUIENTE: Círculo naranja nítido
        const nextCircle = this.add.circle(1045, footerY, 50, 0xe67e22)
            .setInteractive({ useHandCursor: true })
            .setStrokeStyle(1, 0xe67e22, 1); // El stroke fuerza el antialiasing
        
        this.add.text(1045, footerY, '➔', { fontSize: '45px', color: '#fff', fontStyle: 'bold' }).setOrigin(0.5);
        nextCircle.on('pointerdown', () => this.scene.start('QuizScene'));
    }

    createIcon(x, y, emoji, action) {
        // Círculo rosa con técnica de suavizado de bordes
        const circle = this.add.circle(x, y, 35, 0xff77ff)
            .setInteractive({ useHandCursor: true })
            .setStrokeStyle(1, 0xff77ff, 1); // Esto elimina el pixelado del borde
        
        // Emoji con padding para que no se corte por arriba/lados
        this.add.text(x, y, emoji, { 
            fontSize: '32px',
            padding: { top: 10, bottom: 10, left: 10, right: 10 }
        }).setOrigin(0.5);

        circle.on('pointerdown', action);
    }

    createCard(x, y, w, h, title, videoId, vY, isCenter = false) {
        const g = this.add.graphics();
        g.fillStyle(0xffffff, 1).fillRoundedRect(x - w/2, y - h/2, w, h, 20);
        g.lineStyle(1.5, 0x0000ff, 0.1).strokeRoundedRect(x - w/2, y - h/2, w, h, 20);
        
        this.add.text(x, y - h/2 + 35, title, { 
            fontSize: '22px', color: '#e67e22', fontStyle: 'bold' 
        }).setOrigin(0.5);
        
        const vidW = w - 40;
        const vidH = (vidW * 9) / 16;
        const videoHTML = `<iframe width="${vidW}" height="${vidH}" src="https://www.youtube.com/embed/${videoId}" frameborder="0" style="border-radius:12px;"></iframe>`;
        this.add.dom(x, vY).createFromHTML(videoHTML);

        if (isCenter) {
            this.renderPhrases(x, vY + vidH/2 + 40, w);
        }
    }

    renderPhrases(x, startY, w) {
        const c = { d: "#f1c40f", r: "#e74c3c", v: "#2ecc71", n: "#333333", a: "#3f37c9" };
        const lines = [
            [{t:"WHAT ", c:c.d}, {t:"DO ", c:c.r}, {t:"NEPALESE ", c:c.v}, {t:"COMMONLY ", c:c.n}, {t:"EAT?", c:c.a}],
            [{t:"HOW ", c:c.d}, {t:"DO ", c:c.r}, {t:"NEPALESE ", c:c.v}, {t:"COMMONLY ", c:c.n}, {t:"EAT?", c:c.a}],
            [{t:"WHAT ", c:c.d}, {t:"DO ", c:c.r}, {t:"NEPALESE ", c:c.v}, {t:"DRINK?", c:c.a}],
            [{t:"HOW ", c:c.d}, {t:"DO ", c:c.r}, {t:"NEPALESE ", c:c.v}, {t:"COOK?", c:c.a}],
            [{t:"WHAT FRUITS ", c:c.d}, {t:"DO ", c:c.r}, {t:"NEPALESE ", c:c.v}, {t:"EAT?", c:c.a}],
            [{t:"WHAT ", c:c.d}, {t:"DON'T ", c:c.r}, {t:"NEPALESE ", c:c.v}, {t:"EAT?", c:c.a}],
            [{t:"DO ", c:c.r}, {t:"NEPALESE ", c:c.v}, {t:"DRINK ", c:c.a}, {t:"ALCOHOL AND ", c:c.n}, {t:"SMOKE?", c:c.a}]
        ];

        lines.forEach((line, i) => {
            let curX = x - w/2 + 35;
            line.forEach(word => {
                const t = this.add.text(curX, startY + (i * 28), word.t, { 
                    fontSize: '14px', color: word.c, fontStyle: 'bold', fontFamily: 'Arial Narrow' 
                });
                curX += t.width;
            });
        });
    }

    showPopup() {
        const popupHTML = `
            <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999; display:flex; justify-content:center; align-items:center;">
                <div style="background:white; width:550px; padding:40px; border-radius:25px; position:relative; font-family:sans-serif; border: 2px solid #e67e22;">
                    <span id="close-pop" style="position:absolute; right:20px; top:15px; cursor:pointer; font-size:30px; color:#999;">✕</span>
                    <h2 style="color:#e67e22; margin-top:0;">Starting sentences:</h2>
                    <ul style="font-size:18px; line-height:2; color:#333;">
                        <li>"We think the recipe ___ matches to the photo ___ because..."</li>
                        <li>"We agree"</li>
                        <li>"We don't agree because..."</li>
                    </ul>
                </div>
            </div>`;
        const pop = this.add.dom(0, 0).createFromHTML(popupHTML).setOrigin(0);
        document.getElementById('close-pop').onclick = () => pop.destroy();
    }
}