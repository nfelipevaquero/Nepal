class BootScene extends Phaser.Scene {
    constructor() { super('BootScene'); }

    preload() {
        this.load.image('map_final', 'assets/map_final.png');
        this.load.image('pin', 'assets/pin.png');
    }

    create() {
        this.add.rectangle(640, 360, 1280, 720, 0xffffff);

        // Inyectamos el GIF centrado
        const gifHTML = `
            <div style="width: 1280px; height: 720px; display: flex; justify-content: center; align-items: center; overflow: hidden;">
                <img src="assets/inicio.gif" style="width: 100%; height: 100%; object-fit: contain;">
            </div>`;
        const gifElement = this.add.dom(640, 360).createFromHTML(gifHTML);

        // Función de cambio DIRECTO
        const goToMap = () => {
            if (gifElement) gifElement.destroy();
            this.scene.start('MapScene'); // Cambio de escena inmediato sin animación
        };

        // Botón Saltar
        const skipBtn = this.add.text(1230, 680, 'SALTAR ➔', {
            fontSize: '22px', color: '#333', backgroundColor: '#eee', padding: { x: 15, y: 10 }, fontFamily: 'Arial Black'
        }).setOrigin(1, 1).setInteractive({ useHandCursor: true });

        skipBtn.on('pointerdown', goToMap);

        // Tiempo exacto para que el GIF termine su ciclo de dibujo
        this.time.delayedCall(17000, goToMap);
    }
}