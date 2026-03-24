class QuizScene extends Phaser.Scene {
    constructor() { super('QuizScene'); }

    init(data) { this.expert = data.expert; }

    create() {
        this.add.rectangle(640, 360, 1280, 720, 0xffffff);
        const q = this.expert.quiz[0];

        // Texto de la receta
        this.add.text(50, 150, q.recipe, { fontSize: '20px', color: '#333', wordWrap: { width: 450 } });

        // Opciones (Cartas)
        q.options.forEach((opt, i) => {
            let x = 650 + (i * 160);
            let card = this.add.rectangle(x, 360, 140, 200, opt.color).setInteractive({ useHandCursor: true });
            this.add.text(x, 360, opt.text, { fontSize: '18px', color: '#fff', align: 'center' }).setOrigin(0.5);

            card.on('pointerdown', () => {
                if(opt.correct) {
                    this.add.text(640, 600, 'CORRECT!', { fontSize: '48px', color: 'green' }).setOrigin(0.5);
                } else {
                    this.add.text(640, 600, 'TRY AGAIN', { fontSize: '48px', color: 'red' }).setOrigin(0.5);
                }
                this.time.delayedCall(2000, () => this.scene.start('MapScene'));
            });
        });
    }
}