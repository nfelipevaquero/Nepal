const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    backgroundColor: '#ffffff',
    dom: { createContainer: true },
    scene: [BootScene, MapScene, ExpertScene, QuizScene]
};

const game = new Phaser.Game(config);