class ExpertScene extends Phaser.Scene {
    constructor() { super('ExpertScene'); }

    init(data) {
        this.expert = data.expertData;
    }

    create() {
        // Fondo rojo de la tarjeta
        this.add.rectangle(640, 360, 1100, 600, 0xefefef).setStrokeStyle(10, 0xe74c3c);

        // Cabecera
        this.add.rectangle(640, 120, 1100, 100, 0xe74c3c);
        this.add.text(140, 90, this.expert.role, { fontSize: '32px', color: '#fff', fontStyle: 'bold' });
        this.add.text(140, 130, `${this.expert.name} | ${this.expert.location}`, { fontSize: '20px', color: '#fff' });

        // Botón cerrar (X)
        let closeBtn = this.add.text(1150, 90, 'X', { fontSize: '40px', color: '#fff' }).setInteractive({ useHandCursor: true });
        closeBtn.on('pointerdown', () => this.scene.start('MapScene'));

        // Bloque Izquierdo: Opening Activity
        this.add.rectangle(300, 450, 350, 200, 0xffffff).setStrokeStyle(2, 0xcccccc);
        this.add.text(300, 380, 'Opening Activity', { fontSize: '28px', color: '#e74c3c', fontStyle: 'bold' }).setOrigin(0.5);
        let quizBtn = this.add.circle(300, 470, 40, 0x9b59b6).setInteractive({ useHandCursor: true });
        this.add.text(300, 470, '🔑', { fontSize: '30px' }).setOrigin(0.5); // Icono temporal
        
        quizBtn.on('pointerdown', () => {
            this.scene.start('QuizScene', { expertData: this.expert });
        });

        // Bloque Central: The Interview (YouTube Video)
        this.add.text(640, 250, 'Closing Activity - The Interview', { fontSize: '28px', color: '#000' }).setOrigin(0.5);
        
        if (this.expert.youtubeId) {
            // Creamos un iframe nativo de HTML sobre el canvas de Phaser
            let iframeHTML = `
                <iframe width="450" height="250" 
                src="https://www.youtube.com/embed/${this.expert.youtubeId}" 
                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
                </iframe>
            `;
            this.videoDom = this.add.dom(640, 420).createFromHTML(iframeHTML);
        }
    }
}