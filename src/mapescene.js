class MapScene extends Phaser.Scene {
    constructor() { super('MapScene'); }

    create() {
        // 1. Mapa de fondo
        this.mapImage = this.add.image(640, 360, 'map_political');

        // 2. Título
        this.add.text(640, 40, 'School DocFest', { fontSize: '48px', color: '#e74c3c', fontStyle: 'bold' }).setOrigin(0.5);

        // 3. Botones de UI inferior izquierda
        this.createMenuButton(150, 600, 'Political Map', () => this.mapImage.setTexture('map_political'));
        this.createMenuButton(150, 650, 'Physical Map', () => this.mapImage.setTexture('map_physical'));

        // 4. Pines de los expertos (cargados desde data.js)
        Object.values(GAME_DATA.experts).forEach(expert => {
            this.createExpertPin(expert);
        });
    }

    createMenuButton(x, y, text, callback) {
        let btn = this.add.text(x, y, text, { fontSize: '24px', color: '#000' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', callback)
            .on('pointerover', () => btn.setColor('#e74c3c'))
            .on('pointerout', () => btn.setColor('#000'));
    }

    createExpertPin(expert) {
        // Fondo del pin
        let pin = this.add.circle(expert.mapX, expert.mapY, 30, expert.color)
            .setInteractive({ useHandCursor: true });
        
        // Texto dentro del pin
        let label = this.add.text(expert.mapX, expert.mapY, expert.role.split(' ')[0], { fontSize: '14px', color: '#fff' }).setOrigin(0.5);

        // Hover effect
        pin.on('pointerover', () => { pin.setScale(1.1); label.setScale(1.1); });
        pin.on('pointerout', () => { pin.setScale(1); label.setScale(1); });

        // Al hacer click, pasamos a la escena del experto con sus datos
        pin.on('pointerdown', () => {
            this.scene.start('ExpertScene', { expertData: expert });
        });
    }
}