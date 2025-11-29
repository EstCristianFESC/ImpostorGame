const words = { 
    Animales: [
        "Perro","Gato","Tigre","Conejo","Elefante","Loro","León","Zorro","Oso","Serpiente",
        "Delfín","Canguro","Jirafa","Halcón","Cisne","Panda","Erizo","Camaleón","Tortuga","Pingüino",
        "Cebra","Hipopótamo","Murciélago","Lobo","Orca","Gallo","Paloma","Ratón","Caballo","Burro",
        "Castor","Hormiga","Liebre","Nutria","Ocelote","Pez","Sapo","Venado","Ballena","Carpa"
    ],
    Comida: [
        "Pizza","Arepa","Hamburguesa","Tamal","Pasta","Empanada","Chocolate","Sancocho","Ajiaco","Ceviche",
        "Tacos","Sushi","Enchiladas","Lasagna","Helado","Panqueques","Galletas","Churros","Curry","Quesadilla",
        "Nachos","Falafel","Brócoli","Arroz","Paella","Crepas","Sopa","Cereal","Frijoles","Lentejas",
        "Huevo","Carne","Pescado","Queso","Mantequilla","Aceite","Azúcar","Sal","Pan","Leche",
        "Tomate","Pepino","Cebolla","Pimiento","Espinaca","Zanahoria","Champiñón","Patata","Maíz","Calabaza"
    ],
    Objetos: [
        "Silla","Mesa","Teléfono","Lámpara","Reloj","Computador","Teclado","Audífonos","Cartera","Cuaderno",
        "Bolígrafo","Mochila","Televisor","Ventilador","Cámara","Microondas","Paraguas","Gafas","Estufa","Espejo",
        "Cojín","Llavero","Zapato","Botella","Tablet","Mouse","Cinta","Puerta","Ventana","Taza",
        "Plato","Cuchara","Tenedor","Cuchillo","Sartén","Cama","Almohada","Toalla","Linterna","Maleta",
        "Libro","Cepillo","Sofá","Pantalla","Botella de agua","Termo","Gorra","Guantes","Chaqueta","Cinturón"
    ],
    Profesiones: [
        "Doctor","Ingeniero","Abogado","Profesor","Policía","Enfermero","Chef","Arquitecto","Contador",
        "Bombero","Piloto","Periodista","Diseñador","Carpintero","Electricista","Plomero","Psicólogo","Veterinario",
        "Actor","Bailarín","Programador","Dentista","Guía","Científico","Editor","Animador","Traductor","Barbero",
        "Jardinero","Panadero","Pescador","Agricultor","Soldado","Atleta","Sastre","Mecánico","Carnicero","Maestro"
    ],
    Deportes: [
        "Fútbol","Baloncesto","Tenis","Natación","Ciclismo","Voleibol","Boxeo","Atletismo",
        "Golf","Rugby","Hockey","Béisbol","Skateboard","Surf","Esquí","Snowboard","Karate","Taekwondo",
        "Escalada","Esgrima","Ping pong","Patinaje","Bádminton","Paracaidismo","Motocross","Kayak","Triatlón",
        "Remo","Tiro","Carrera","Salto","Lanzamiento","Canoa","Raqueta","Pesas","Gimnasia","Buceo"
    ],
    Marcas: [
        "Zapato","Camisa","Sombrero","Bolso","Mochila","Reloj","Silla","Mesa","Teléfono","Audífono",
        "Televisor","Carro","Moto","Bicicleta","Avión","Barco","Lámpara","Cámara","Libro","Cuaderno",
        "Botella","Taza","Cuchara","Tenedor","Cuchillo","Sartén","Ventana","Puerta","Cinta","Sombrilla",
        "Maleta","Bolígrafo","Manta","Almohada","Cojín","Lámpara de escritorio","Espejo","Tablet","Mouse","Linterna"
    ],
    Peliculas: [
        "Acción","Aventura","Comedia","Drama","Terror","Suspenso","Misterio","Romance","Fantasía","Animación",
        "Ciencia ficción","Historia","Documental","Musical","Infantil","Épica","Biografía","Crimen","Guerra","Policial",
        "Espacial","Mágica","Oscura","Ficción","Clásica","Moderna","Independiente","Romántica","Western","Thriller"
    ],
    Frutas: [
        "Manzana","Banano","Mango","Fresa","Uva","Papaya","Piña","Sandía","Cereza","Durazno",
        "Pera","Kiwi","Mandarina","Frambuesa","Arándano","Guayaba","Coco","Higo",
        "Melón","Aguacate","Maracuyá","Naranja","Ciruela","Pomelo","Tamarindo","Carambola","Pitaya","Mandarino"
    ],
    Cantantes: [
        "Cantar","Gritar","Susurrar","Tararear","Rasguear","Tocar","Bailar","Ritmo","Melodía","Armonía",
        "Improvisar","Entonar","Vibrar","Vocalizar","Componer","Interpretar","Afinar","Sonar","Ejecutar","Percutir",
        "Silbar","Timbre","Compás","Refrán","Verso","Estrofa","Coro","Instrumento","Canción","Balada"
    ]
};

let revealOrder = [];
let impostors = [];
let currentIndex = 0;
let countdownTimer = null;
let playerWords = {};
let usedWords = new Set();
let currentRoundCategory = "";

const setup = document.getElementById("setup");
const waiting = document.getElementById("waiting");
const game = document.getElementById("game");
const finalStart = document.getElementById("finalStart");
const wordEl = document.getElementById("word");
const playerHeader = document.getElementById("playerHeader");
const waitingText = document.getElementById("waitingText");
const starterPlayerEl = document.getElementById("starterPlayer");

function assignWords(category){
    const nPlayers = revealOrder.length;
    playerWords = {};

    let targetWord = "";
    let candidates = [];
    
    if(category === "Aleatorio"){
        candidates = Object.values(words).flat();
    } else {
        candidates = words[category];
    }

    let available = candidates.filter(w => !usedWords.has(w));

    if(available.length === 0){
        available = candidates;
        candidates.forEach(w => usedWords.delete(w));
    }

    targetWord = available[Math.floor(Math.random() * available.length)];
    usedWords.add(targetWord);

    if(category === "Aleatorio"){
        for(const [cat, list] of Object.entries(words)){
            if(list.includes(targetWord)){
                currentRoundCategory = cat;
                break;
            }
        }
    } else {
        currentRoundCategory = category;
    }

    for(let player of revealOrder){
        if(impostors.includes(player)){
            playerWords[player] = "Impostor";
        } else {
            playerWords[player] = targetWord;
        }
    }
}

function animateWord(text){
    wordEl.textContent = "";
    let i = 0;
    const interval = setInterval(()=>{
        wordEl.textContent += text[i];
        i++;
        if(i >= text.length) clearInterval(interval);
    }, 150);
}

document.getElementById("startBtn").onclick = () => {
    const nPlayers = parseInt(document.getElementById("numPlayers").value);
    const nImpostors = parseInt(document.getElementById("numImpostors").value);
    const category = document.getElementById("category").value;

    revealOrder = Array.from({length:nPlayers}, (_, i) => i + 1);

    impostors = [];
    const indices = Array.from({length: nPlayers}, (_, i) => i + 1);
    
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    impostors = indices.slice(0, nImpostors);

    assignWords(category);

    currentIndex = 0;
    setup.classList.add("hidden");
    waiting.classList.remove("hidden");
    updateWaitingText();
};

function updateWaitingText(){
    const player = revealOrder[currentIndex];
    waitingText.textContent = `Jugador ${player}, presiona para ver tu palabra`;
}

document.getElementById("showWordBtn").onclick = () => {
    waiting.classList.add("hidden");
    game.classList.remove("hidden");

    const player = revealOrder[currentIndex];
    playerHeader.textContent = `Jugador ${player}`;

    const wordToShow = playerWords[player]; 
    const isImpostor = impostors.includes(player);

    wordEl.style.color = isImpostor ? "#ff006e" : "#ffffff";
    animateWord(wordToShow);

    const catDisplay = document.getElementById("categoryDisplay");
    const globalCategory = document.getElementById("category").value;

    if(catDisplay){
        if(isImpostor && globalCategory === "Aleatorio"){
            catDisplay.textContent = "Categoría: ???";
        } else {
            catDisplay.textContent = `Categoría: ${currentRoundCategory}`;
        }
    }

    let countdownEl = document.getElementById("countdown");
    if(!countdownEl){
        countdownEl = document.createElement("span");
        countdownEl.id = "countdown";
        countdownEl.style.display = "block";
        countdownEl.style.color = "white";
        countdownEl.style.marginTop = "10px";
        countdownEl.style.fontSize = "1.2rem";
        wordEl.parentNode.appendChild(countdownEl);
    }

    let countdown = 5;
    countdownEl.textContent = `Tiempo: ${countdown}s`;

    clearInterval(countdownTimer);
    countdownTimer = setInterval(()=>{
        countdown--;
        countdownEl.textContent = `Tiempo: ${countdown}s`;
        if(countdown <= 0){
            clearInterval(countdownTimer);
            countdownEl.textContent = "";
        }
    }, 1000);

    setTimeout(()=>{
        game.classList.add("hidden");
        currentIndex++;

        if(currentIndex >= revealOrder.length){
            const starter = revealOrder[Math.floor(Math.random() * revealOrder.length)];
            starterPlayerEl.textContent = `Jugador ${starter}`;
            finalStart.classList.remove("hidden");
            waiting.classList.add("hidden");
        } else {
            waiting.classList.remove("hidden");
            updateWaitingText();
        }
    }, 5000);
};

document.getElementById("btnReiniciar").onclick = () => {
    revealOrder = [];
    impostors = [];
    currentIndex = 0;
    playerWords = {};
    clearInterval(countdownTimer);

    waitingText.textContent = "";
    playerHeader.textContent = "";
    wordEl.textContent = "";
    starterPlayerEl.textContent = "";
    const countdownEl = document.getElementById("countdown");
    if(countdownEl) countdownEl.textContent = "";

    const catDisplay = document.getElementById("categoryDisplay");
    if(catDisplay) catDisplay.textContent = "";

    finalStart.classList.add("hidden");
    game.classList.add("hidden");
    waiting.classList.add("hidden");
    setup.classList.remove("hidden");

    document.getElementById("numPlayers").value = "3";
    document.getElementById("numImpostors").value = "1";
    document.getElementById("category").value = "Aleatorio";
};

// --- MUSIC CONTROL ---
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
let musicPlaying = false;
let musicInitialized = false;

// Set initial volume
bgMusic.volume = 0.3;

musicToggle.onclick = () => {
    if (musicPlaying) {
        bgMusic.pause();
        musicToggle.textContent = "🔇";
        musicToggle.classList.remove("playing");
        musicPlaying = false;
    } else {
        bgMusic.play()
            .then(() => {
                musicToggle.textContent = "🔊";
                musicToggle.classList.add("playing");
                musicPlaying = true;
                musicInitialized = true;
            })
            .catch(e => {
                console.log("Audio play prevented:", e);
                musicToggle.textContent = "🔇";
            });
    }
};

// Auto-start music when user clicks "Iniciar Juego"
const startBtn = document.getElementById("startBtn");
const originalStartHandler = startBtn.onclick;

startBtn.onclick = function() {
    // Execute original game logic
    originalStartHandler.call(this);
    
    // Try to start music
    if (!musicInitialized && !musicPlaying) {
        bgMusic.play()
            .then(() => {
                musicToggle.textContent = "🔊";
                musicToggle.classList.add("playing");
                musicPlaying = true;
                musicInitialized = true;
            })
            .catch(e => {
                console.log("Audio autoplay prevented. Click the music button to enable:", e);
            });
    }
};