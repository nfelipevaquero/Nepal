class BootScene extends Phaser.Scene {
    constructor() { super('BootScene'); }

    preload() {
        this.load.image('map_final', 'assets/map_final.png');
        this.load.image('pin', 'assets/pin.png');
    }

    create() {
        this.add.rectangle(640, 360, 1280, 720, 0xffffff);

        const gifHTML = `
            <div style="width: 1280px; height: 720px; display: flex; justify-content: center; align-items: center;">
                <img src="assets/inicio.gif" style="width: 100%; height: 100%; object-fit: contain;">
            </div>`;
        const gifElement = this.add.dom(640, 360).createFromHTML(gifHTML);

        // Botón Saltar interactivo
        const skipBtn = this.add.text(1200, 680, 'SALTAR ➔', {
            fontSize: '24px', color: '#ffffff', backgroundColor: '#c0392b', padding: { x: 20, y: 10 }, fontStyle: 'bold'
        }).setOrigin(1, 1).setInteractive({ useHandCursor: true });

        const startMap = () => {
            this.cameras.main.fadeOut(500, 255, 255, 255);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                if (gifElement) gifElement.destroy();
                this.scene.start('MapScene');
            });
        };

        skipBtn.on('pointerdown', startMap);
        // Esperamos 12 segundos para que el GIF termine sí o sí
        this.time.delayedCall(12000, startMap);
    }
}