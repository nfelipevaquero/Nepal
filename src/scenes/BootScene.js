class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // --- 1. INTENTAMOS CARGAR TUS ARCHIVOS ---
        // Asegúrate de que los nombres y la carpeta son exactos.
        this.load.image('map_final', 'assets/map_final.png');
        this.load.image('pin', 'assets/pin.png');

        // Mostramos un texto de carga estilizado
        this.add.text(640, 680, 'Cargando Nepal...', { 
            fontSize: '20px', 
            color: '#666666' 
        }).setOrigin(0.5);

        // --- 2. SISTEMA DE GENERACIÓN DE EMERGENCIA ---
        // Si el archivo no carga, generamos uno de alta resolución por código.
        this.load.on('loaderror', (file) => {
            if (file.key === 'pin') {
                this.generateEmergencyPin();
            }
            if (file.key === 'map_final') {
                this.generateEmergencyMap();
            }
        });
    }

    create() {
        // Fondo blanco
        this.add.rectangle(640, 360, 1280, 720, 0xffffff);

        // --- 3. INTENTAMOS REPRODUCIR EL GIF ---
        // He quitado los espacios en el nombre por seguridad: 'Comp2_2.gif'
        // Cambia el nombre de tu archivo GIF a 'Comp2_2.gif' en tu carpeta.
        const gifHTML = `
            <div style="width: 1280px; height: 720px; display: flex; justify-content: center; align-items: center;">
                <img src="assets/Comp2_2.gif" 
                     onerror="console.error('GIF NO ENCONTRADO. Prueba a quitar los espacios del nombre del archivo a Comp2_2.gif');"
                     style="width: 100%; height: 100%; object-fit: contain;">
            </div>
        `;
        
        const gifElement = this.add.dom(640, 360).createFromHTML(gifHTML);

        // Saltamos al mapa tras 4.5 segundos (duración del GIF)
        this.time.delayedCall(4500, () => {
            this.cameras.main.fadeOut(800, 255, 255, 255);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                if (gifElement) gifElement.destroy();
                this.scene.start('MapScene');
            });
        });
    }

    // --- FUNCIONES PARA CREAR ASSETS PROFESIONALES POR CÓDIGO ---

    generateEmergencyMap() {
        let g = this.make.graphics({x: 0, y: 0, add: false});
        g.fillStyle(0xf9f9f9, 1);
        g.fillRect(0, 0, 1280, 720);
        g.lineStyle(2, 0x000000, 1);
        
        // Un trazo vectorial estilizado de Nepal de alta resolución
        const pathNepal = new Phaser.Curves.Path(320, 220)
            .lineTo(600, 260)
            .lineTo(960, 320)
            .lineTo(940, 480)
            .lineTo(640, 440)
            .lineTo(320, 380)
            .closePath();
        
        g.fillStyle(0xfafafa); g.fillPath(pathNepal);
        g.strokePath(pathNepal);
        g.generateTexture('map_final', 1280, 720);
        console.warn("Usando mapa generado por código. Calidad PRO habilitada.");
    }

    generateEmergencyPin() {
        // Creamos un pin estilizado con un pequeño brillo
        let g = this.make.graphics({x: 0, y: 0, add: false});
        g.fillStyle(0xe74c3c, 1); // Naranja base
        g.fillCircle(25, 25, 20);
        g.fillStyle(0xffffff, 0.4); // Brillo interior suave
        g.fillCircle(18, 18, 8);
        g.lineStyle(4, 0xffffff, 1); // Borde blanco nítido
        g.strokeCircle(25, 25, 20);
        g.generateTexture('pin', 50, 50);
        console.warn("Usando pin generado por código. Calidad PRO habilitada.");
    }
}