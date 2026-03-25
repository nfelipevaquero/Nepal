class ExpertScene extends Phaser.Scene {
    constructor() { super('ExpertScene'); }
    init(data) { this.expert = data.expert; }

    create() {
        // FONDO GENERAL
        this.add.rectangle(640, 360, 1280, 720, 0xf4f7f6);
        
        // --- 1. HEADER LIMPIO CON 'X' CENTRADA (Gráficos) ---
        const headerBg = this.add.graphics();
        headerBg.fillGradientStyle(this.expert.color, this.expert.color, 0x922b21, 0x922b21, 1);
        headerBg.fillRect(0, 0, 1280, 110);

        this.add.text(120, 35, this.expert.role.toUpperCase(), { 
            fontSize: '34px', fontStyle: 'bold', color: '#fff', fontFamily: 'Arial Black'
        });
        this.add.text(120, 75, `${this.expert.name} | ${this.expert.location}`, { 
            fontSize: '18px', color: '#eee', fontFamily: 'Arial'
        });

        // BOTÓN CERRAR (X) - Creado con Graphics para máxima resolución y centrado
        const closeContainer = this.add.container(1220, 55);
        const closeCircle = this.add.circle(0, 0, 25, 0xffffff, 0.2).setInteractive({ useHandCursor: true });
        const closeX = this.add.text(0, 0, '✕', { fontSize: '32px', color: '#fff', fontStyle: 'bold' }).setOrigin(0.5);
        closeContainer.add([closeCircle, closeX]);
        closeCircle.on('pointerdown', () => this.scene.start('MapScene'));

        // --- 2. TARJETAS (Posiciones fijas para evitar superposición) ---
        this.createCard(235, 330, 370, 350, "START", this.expert.videos.start);
        
        // Tarjeta central más ancha y baja para las preguntas
        this.createCard(640, 395, 420, 480, "CLOSING ACTIVITY", this.expert.videos.closing, true);
        
        this.createCard(1045, 330, 370, 350, "NEXT STAGE", this.expert.videos.next);

        // --- 3. OPENING ACTIVITY (Contenedor ampliado para iconos completos) ---
        const openBox = this.add.container(235, 600);
        const bgOpen = this.add.graphics();
        bgOpen.fillStyle(0xffffff, 1);
        bgOpen.fillRoundedRect(-185, -90, 370, 160, 20); // Mucho más alto para que no se corten los iconos
        bgOpen.lineStyle(2, 0x4a90e2, 0.5); // Borde azul suave
        bgOpen.strokeRoundedRect(-185, -90, 370, 160, 20);

        const txtOpen = this.add.text(0, -60, "Opening Activity", { 
            fontSize: '22px', color: '#e67e22', fontStyle: 'bold', fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        openBox.add([bgOpen, txtOpen]);

        // Iconos con margen de seguridad superior e inferior
        this.createAnimatedIcon(openBox, -60, 20, '🔑');
        this.createAnimatedIcon(openBox, 60, 20, '✏️');

        // --- 4. BOTÓN SIGUIENTE (Naranja y latido centrado) ---
        const btnNext = this.add.container(1045, 600);
        const circNext = this.add.circle(0, 0, 45, 0xe67e22).setInteractive({ useHandCursor: true });
        const arrow = this.add.text(0, 0, '➔', { fontSize: '45px', color: '#fff' }).setOrigin(0.5); // Flecha centrada
        btnNext.add([circNext, arrow]);
        
        this.tweens.add({
            targets: btnNext,
            scale: 1.1,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Power1.easeInOut'
        });

        circNext.on('pointerdown', () => this.scene.start('QuizScene'));
    }

    createCard(x, y, w, h, title, videoId, isCenter = false) {
        const cardBg = this.add.graphics();
        cardBg.fillStyle(0xffffff, 1);
        cardBg.fillRoundedRect(x - w/2, y - h/2, w, h, 20);
        cardBg.lineStyle(1, 0xddd, 0.5);
        cardBg.strokeRoundedRect(x - w/2, y - h/2, w, h, 20);

        this.add.text(x, y - h/2 + 30, title, { 
            fontSize: '22px', color: '#e67e22', fontStyle: 'bold', fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Ajuste de vídeo para que no toque los bordes
        const vidW = w - 40;
        const vidH = (vidW * 9) / 16;
        const vY = isCenter ? y - 60 : y + 20;

        const videoHTML = `<iframe width="${vidW}" height="${vidH}" src="https://www.youtube.com/embed/${videoId}?rel=0" frameborder="0" allowfullscreen style="border-radius:10px;"></iframe>`;
        this.add.dom(x, vY).createFromHTML(videoHTML);

        if (isCenter) {
            // --- COLORES ESPECÍFICOS DEL JUEGO ORIGINAL ---
            // Las preguntas en gris claro (#444)
            this.add.text(x, y + 90, "WHAT DO NEPALESE COMMONLY EAT?", {
                fontSize: '14px', color: '#444', fontFamily: 'Courier', align: 'center', wordWrap: { width: w - 40 }
            }).setOrigin(0.5);
            this.add.text(x, y + 125, "HOW DO NEPALESE COMMONLY EAT?", {
                fontSize: '14px', color: '#444', fontFamily: 'Courier', align: 'center', wordWrap: { width: w - 40 }
            }).setOrigin(0.5);
            this.add.text(x, y + 160, "WHAT DO NEPALESE DRINK?", {
                fontSize: '14px', color: '#444', fontFamily: 'Courier', align: 'center', wordWrap: { width: w - 40 }
            }).setOrigin(0.5);
            // La última pregunta en naranja (#e67e22)
            this.add.text(x, y + 195, "HOW DO NEPALESE COOK?", {
                fontSize: '14px', color: '#e67e22', fontFamily: 'Courier', align: 'center', wordWrap: { width: w - 40 }
            }).setOrigin(0.5);
        }
    }

    createAnimatedIcon(container, x, y, emoji) {
        // Usamos un container separado para el icono y su fondo para asegurar centrado absoluto
        const iconCont = this.add.container(x, y);
        const c = this.add.circle(0, 0, 32, 0xfb72ff).setInteractive({ useHandCursor: true });
        const t = this.add.text(0, 0, emoji, { fontSize: '32px' }).setOrigin(0.5);
        iconCont.add([c, t]);
        container.add(iconCont);

        this.tweens.add({
            targets: iconCont,
            scale: 1.1,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Power1.easeInOut'
        });
    }
}