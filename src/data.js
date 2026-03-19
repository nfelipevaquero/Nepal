const GAME_DATA = {
    experts: {
        food: {
            id: 'food',
            role: 'Food Expert',
            name: 'Kavita Gurung',
            location: 'Pokhara - Province 4',
            mapX: 600, mapY: 350, color: 0xe74c3c,
            youtubeId: 'dQw4w9WgXcQ', // Cambia por el ID real del video
            quiz: [
                {
                    recipe: "Recipe E for 2-3 people\n\nIngredients:\n- 50 grams ready-to-fry panipuri\n- Onion, tomato, potatoes\n- Spices, chili, lemon\n\nMethod:\nDeep fry the ready-made pellets...\nServe a plate with 10 stuffed balls.",
                    options: [
                        { text: "Samosa", correct: false, color: 0x9b59b6 },
                        { text: "Panipuri", correct: true, color: 0x3498db },
                        { text: "Roti alu dum", correct: false, color: 0x2ecc71 },
                        { text: "Chicken curry", correct: false, color: 0xf1c40f }
                    ]
                },
                {
                    recipe: "Recipe F for 2-3 people\n\nIngredients:\n- 200 grams of flour\n- 4 cups of broth\n- Cabbage and carrot\n- Spinach\n\nMethod:\nMix the flour with water...\nFlatten out the dough...",
                    options: [
                        { text: "Samosa", correct: false, color: 0x9b59b6 },
                        { text: "Roti alu dum", correct: false, color: 0x3498db },
                        { text: "Thenthuk", correct: true, color: 0x2ecc71 },
                        { text: "Chatpate", correct: false, color: 0xf1c40f }
                    ]
                }
            ]
        },
        culture: {
            id: 'culture', role: 'Culture Expert', name: 'Ashmita', location: 'Lumbini',
            mapX: 450, mapY: 480, color: 0xc0392b, youtubeId: '', quiz: []
        }
        // Puedes añadir más expertos aquí (Geography, Festivals, etc.)
    }
};