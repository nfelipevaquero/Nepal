class MapScene extends Phaser.Scene {
    constructor() {
        super('MapScene');
    }

    create() {
        // Fade-in de la escena (800ms)
        this.cameras.main.fadeIn(800, 255, 255, 255);
        
        // Imagen del mapa final (ya sea la tuya o la generada)
        this.add.image(640, 360, 'map_final').setOrigin(0.5);

        // Título estilizado
        this.add.text(640, 60, 'NEPAL: School DocFest', { fontSize: '42px', color: '#c0392b', fontStyle: 'bold' }).setOrigin(0.5);

        // Crear pines desde data.js con animaciones fluidas
        Object.values(GAME_DATA.experts).forEach((exp, index) => {
            let container = this.add.container(exp.mapX, exp.mapY).setAlpha(0);
            
            // Usamos un pin más pequeño para que la interacción sea más precisa
            let pin = this.add.image(0, 0, 'pin').setScale(0.8).setInteractive({ useHandCursor: true });
            
            // Etiqueta de texto elegante con fondo redondeado
            let label = this.add.text(0, -35, exp.role, { fontSize: '14px', color: '#fff', backgroundColor: exp.color, padding: 5 }).setOrigin(0.5);

            container.add([pin, label]);

            // Click: Transición fluida a la escena del experto
            pin.on('pointerdown', () => {
                this.cameras.main.fadeOut(500, 255, 255, 255);
                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.scene.start('ExpertScene', { expert: exp });
                });
            });

            // Animación de entrada de los pines (con un pequeño delay secuencial)
            this.tweens.add({
                targets: container,
                alpha: 1,
                scale: 1,
                duration: 600,
                delay: 200 * index,
                ease: 'Back.easeOut'
            });

            // Animación "Palpitante" (Pulse) continua
            this.tweens.add({
                targets: pin,
                scale: 0.9,
                yoyo: true,
                repeat: -1,
                duration: 1000,
                ease: 'Sine.easeInOut'
            });
        });
    }
}