class ExpertScene extends Phaser.Scene {
    constructor() { super('ExpertScene'); }
    init(data) { this.expert = data.expert; }

    create() {
        // Estética
        this.add.rectangle(640, 360, 1150, 650, 0xffffff).setStrokeStyle(6, this.expert.color);
        this.add.rectangle(640, 100, 1150, 100, this.expert.color);
        this.add.text(120, 85, this.expert.role.toUpperCase(), { 
            fontSize: '40px', color: '#fff', fontStyle: 'bold', fontFamily: 'Courier' 
        });

        // Botón cerrar
        let close = this.add.text(1150, 85, 'X', { fontSize: '50px', color: '#fff' })
            .setOrigin(0.5).setInteractive({ useHandCursor: true });
        close.on('pointerdown', () => this.scene.start('MapScene'));

        // CONSTRUCTOR DE URL YOUTUBE EMBED (Best Practices)
        const videoId = this.expert.youtubeId;
        // Parámetros: rel=0 (no relacionados), showinfo=0 (menos info)
        const embedUrl = `https://www.youtube.com/watch?v=kuPDXB72JpI&list=TLGGtbHLgqzUymAyNTAzMjAyNg&t=1s`;

        const videoHTML = `
            <div style="width: 800px; height: 450px; background: #000; display: flex; justify-content: center; align-items: center; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.4);">
                <iframe 
                    width="800" 
                    height="450" 
                    src="${embedUrl}" 
                    title="Entrevista Experto"
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                </iframe>
            </div>`;

        this.add.dom(640, 400).createFromHTML(videoHTML);
    }
}