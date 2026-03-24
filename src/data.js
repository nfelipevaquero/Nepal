const GAME_DATA = {
    experts: {
        food: {
            id: 'food',
            role: 'Food Expert',
            name: 'Kavita Gurung',
            location: 'Pokhara - Province 4',
            mapX: 615, mapY: 285, // Coordenadas aproximadas según tu vídeo
            color: 0xe74c3c,
            youtubeId: '7X9G_S_8f0s', 
            quiz: [
                {
                    recipe: "Recipe J for 2-3 people\n\n50 grams of ready-to-fry panipuri pellets.\nOnion, tomato and potatoes.\nMethod: Deep fry the pellets till they become small balls...",
                    options: [
                        { text: "Samosa", correct: false, color: 0x9b59b6 },
                        { text: "Panipuri", correct: true, color: 0x3498db },
                        { text: "Roti alu dum", correct: false, color: 0x2ecc71 },
                        { text: "Chicken curry", correct: false, color: 0xf1c40f }
                    ]
                }
            ]
        }
    }
};