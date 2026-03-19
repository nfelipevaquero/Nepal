const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    backgroundColor: '#ffffff',
    dom: {
        createContainer: true // <-- VITAL para iframes de YouTube
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [BootScene, MapScene, ExpertScene, QuizScene]
};

const game = new Phaser.Game(config);