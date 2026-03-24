class ExpertScene extends Phaser.Scene {
    constructor() { super('ExpertScene'); }

    init(data) { this.expert = data.expert; }

    create() {
        // Fondo rojo de la ficha
        this.add.rectangle(640, 360, 1100, 600, 0xffffff).setStrokeStyle(10, 0xc0392b);
        this.add.rectangle(640, 100, 1100, 100, 0xc0392b);

        this.add.text(120, 80, this.expert.role, { fontSize: '32px', color: '#fff', fontStyle: 'bold' });
        this.add.text(120, 120, this.expert.name + " | " + this.expert.location, { fontSize: '20px', color: '#fff' });

        // Botón Cerrar
        let close = this.add.text(1130, 80, 'X', { fontSize: '40px', color: '#fff' }).setInteractive({ useHandCursor: true });
        close.on('pointerdown', () => this.scene.start('MapScene'));

        // Botón Actividad
        let actBtn = this.add.rectangle(250, 400, 200, 100, 0xeeeeee).setInteractive({ useHandCursor: true });
        this.add.text(250, 400, 'OPENING\nACTIVITY', { color: '#000', align: 'center' }).setOrigin(0.5);
        actBtn.on('pointerdown', () => this.scene.start('QuizScene', { expert: this.expert }));

        // Video de YouTube
        let videoHTML = `<iframe width="500" height="300" src="https://www.youtube.com/embed/${this.expert.youtubeId}" frameborder="0" allowfullscreen></iframe>`;
        this.add.dom(750, 400).createFromHTML(videoHTML);
    }
}