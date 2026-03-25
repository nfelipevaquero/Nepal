class QuizScene extends Phaser.Scene {
    constructor() { super('QuizScene'); }
    create() {
        this.add.text(640, 360, 'Quiz Loading...', { color: '#000' }).setOrigin(0.5);
        this.time.delayedCall(2000, () => this.scene.start('MapScene'));
    }
}