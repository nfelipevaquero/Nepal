class BootScene extends Phaser.Scene {
    constructor() { super('BootScene'); }

    preload() {
        // Aquí cargarías tus imágenes reales:
        // this.load.image('map_political', 'assets/map_political.png');
        // this.load.image('map_physical', 'assets/map_physical.png');

        // Generamos fondos falsos para que funcione el ejemplo
        let g = this.make.graphics();
        g.fillStyle(0xeeeeee); g.fillRect(0, 0, 1280, 720);
        g.fillStyle(0xcccccc); g.fillCircle(640, 360, 300); // Simulando forma de Nepal
        g.generateTexture('map_political', 1280, 720);
        
        g.clear();
        g.fillStyle(0xd5e8d4); g.fillRect(0, 0, 1280, 720);
        g.fillStyle(0x82b366); g.fillCircle(640, 360, 300);
        g.generateTexture('map_physical', 1280, 720);
    }

    create() {
        this.scene.start('MapScene');
    }
}