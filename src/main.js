const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    backgroundColor: '#f4f7f6',
    dom: { createContainer: true }, // Crítico para usar vídeos
    scale: {
        mode: Phaser.Scale.FIT, // Mantiene proporción y escala DOM
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [BootScene, MapScene, ExpertScene, QuizScene]
};
const game = new Phaser.Game(config);