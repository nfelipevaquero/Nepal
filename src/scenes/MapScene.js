class MapScene extends Phaser.Scene {
    constructor() { super('MapScene'); }

    create() {
        this.cameras.main.fadeIn(500, 255, 255, 255);

        // Forzamos el tamaño para que coincida con el GIF
        let map = this.add.image(640, 360, 'map_final');
        map.setDisplaySize(1280, 720); 

        // Título con fuente Courier para que parezca de "documental"
        this.add.text(640, 50, 'NEPAL: School DocFest', { 
            fontSize: '40px', color: '#c0392b', fontStyle: 'bold', fontFamily: 'Courier' 
        }).setOrigin(0.5);

        // Dibujamos los pines
        Object.values(GAME_DATA.experts).forEach(exp => {
            let container = this.add.container(exp.mapX, exp.mapY);
            
            // Un pin que destaca sobre el blanco
            let circle = this.add.circle(0, 0, 12, exp.color).setInteractive({ useHandCursor: true });
            let label = this.add.text(0, -30, exp.role, { 
                fontSize: '14px', color: '#fff', backgroundColor: '#000', padding: 4 
            }).setOrigin(0.5);

            container.add([circle, label]);

            circle.on('pointerdown', () => {
                this.scene.start('ExpertScene', { expert: exp });
            });

            // Animación de escala para que se vea vivo
            this.tweens.add({
                targets: circle,
                scale: 1.4,
                duration: 800,
                yoyo: true,
                repeat: -1
            });
        });
    }
}