class QuizScene extends Phaser.Scene {
    constructor() { super('QuizScene'); }

    init(data) {
        this.questions = data.expertData.quiz;
        this.currentQuestionIndex = 0;
        this.score = 0;
    }

    create() {
        // Fondo blanco general
        this.add.rectangle(640, 360, 1280, 720, 0xffffff);

        // Header
        this.headerText = this.add.text(640, 30, `Question 1 of ${this.questions.length}`, { fontSize: '24px', color: '#000' }).setOrigin(0.5);
        
        // Contenedores para UI
        this.recipeText = this.add.text(50, 100, '', { fontSize: '18px', color: '#333', wordWrap: { width: 400 } });
        this.cardsGroup = this.add.group();

        this.loadQuestion();

        // Botón salir
        let exitBtn = this.add.text(1200, 30, 'Exit', { fontSize: '24px', color: '#e74c3c' }).setInteractive({ useHandCursor: true });
        exitBtn.on('pointerdown', () => this.scene.start('MapScene'));
    }

    loadQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showGameOver();
            return;
        }

        let q = this.questions[this.currentQuestionIndex];
        this.headerText.setText(`Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`);
        this.recipeText.setText(q.recipe);

        // Limpiar cartas anteriores
        this.cardsGroup.clear(true, true);

        // Crear las 4 cartas de opciones
        let startX = 550;
        q.options.forEach((opt, index) => {
            let cardX = startX + (index * 170);
            let cardY = 360;

            // Tarjeta visual (simulando imagen de comida)
            let bg = this.add.rectangle(cardX, cardY, 150, 250, opt.color).setInteractive({ useHandCursor: true });
            let text = this.add.text(cardX, cardY - 100, opt.text, { fontSize: '20px', color: '#fff' }).setOrigin(0.5);
            
            this.cardsGroup.addMultiple([bg, text]);

            bg.on('pointerdown', () => this.handleAnswer(opt.correct, cardX, cardY));
        });
    }

    handleAnswer(isCorrect, x, y) {
        // Feedback visual (Check verde o X roja)
        let icon = isCorrect ? '✔️' : '❌';
        let color = isCorrect ? '#2ecc71' : '#e74c3c';
        
        let feedback = this.add.text(x, y, icon, { fontSize: '80px', color: color, stroke: '#fff', strokeThickness: 5 }).setOrigin(0.5);
        
        if (isCorrect) this.score++;

        // Desactivar clicks temporalmente
        this.cardsGroup.getChildren().forEach(child => child.disableInteractive());

        // Esperar 1.5 segundos y pasar a la siguiente
        this.time.delayedCall(1500, () => {
            feedback.destroy();
            this.currentQuestionIndex++;
            this.loadQuestion();
        });
    }

    showGameOver() {
        this.cardsGroup.clear(true, true);
        this.recipeText.setText('');
        
        this.add.text(640, 200, 'Game Over', { fontSize: '64px', color: '#000', fontStyle: 'bold' }).setOrigin(0.5);
        
        // Caja de puntuación
        this.add.rectangle(640, 350, 300, 150, 0x333333);
        this.add.text(640, 320, `Score\n${this.score} / ${this.questions.length}`, { fontSize: '24px', color: '#fff', align: 'center' }).setOrigin(0.5);

        let restartBtn = this.add.text(640, 400, 'Start again', { fontSize: '24px', color: '#3498db' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        restartBtn.on('pointerdown', () => {
            this.currentQuestionIndex = 0;
            this.score = 0;
            this.scene.restart(); // Reinicia la escena
        });
    }
}