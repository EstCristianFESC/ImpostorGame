const words = { 
    Animales: [
        "Perro","Gato","Tigre","Conejo","Elefante","Loro","León","Zorro","Oso","Serpiente",
        "Delfín","Canguro","Jirafa","Halcón","Cisne","Panda","Erizo","Camaleón","Tortuga","Pingüino",
        "Cebra","Hipopótamo","Murciélago","Lobo","Orca","Gallo","Paloma","Ratón","Caballo","Burro",
        "Castor","Hormiga","Liebre","Nutria","Sapo","Venado","Ballena"],
    Comida: [
        "Pizza","Arepa","Hamburguesa","Tamal","Pasta","Empanada","Chocolate","Sancocho","Ajiaco","Ceviche",
        "Tacos","Sushi","Enchiladas","Lasagña","Helado","Panqueques","Galletas","Churros","Quesadilla",
        "Nachos","Brócoli","Arroz","Paella","Crepas","Sopa","Cereal","Frijoles","Lentejas",
        "Huevo","Carne","Pescado","Queso","Mantequilla","Aceite","Azúcar","Sal","Leche",
        "Tomate","Pepino","Cebolla","Pimiento","Espinaca","Zanahoria","Champiñón","Patata","Maíz","Calabaza"],
    Objetos: [
        "Silla","Mesa","Teléfono","Lámpara","Computador","Teclado","Audífonos","Cartera","Cuaderno",
        "Bolígrafo","Mochila","Televisor","Ventilador","Cámara","Microondas","Paraguas","Gafas","Estufa","Espejo",
        "Cojín","Llavero","Zapato","Botella","Taza","Cuchara","Tenedor","Cuchillo","Sartén","Cama",
        "Almohada","Toalla","Linterna","Maleta","Libro","Cepillo","Sofá","Pantalla","Termo","Gorra",
        "Guantes","Chaqueta","Cinturón"],
    Profesiones: [
        "Doctor","Ingeniero","Abogado","Profesor","Policía","Enfermero","Chef","Arquitecto","Contador",
        "Bombero","Piloto","Periodista","Diseñador","Carpintero","Electricista","Plomero","Psicólogo","Veterinario",
        "Actor","Bailarín","Programador","Dentista","Científico","Editor","Animador","Traductor","Barbero",
        "Jardinero","Panadero","Pescador","Agricultor","Soldado","Atleta","Sastre","Mecánico","Carnicero","Maestro"],
    Deportes: [
        "Fútbol","Baloncesto","Tenis","Natación","Ciclismo","Voleibol","Boxeo","Atletismo",
        "Golf","Rugby","Hockey","Béisbol","Skateboard","Surf","Esquí","Snowboard","Karate","Taekwondo",
        "Escalada","Esgrima","Ping pong","Patinaje","Bádminton","Paracaidismo","Motocross","Kayak","Triatlón",
        "Remo","Tiro","Jabalina","Canoa","Raqueta","Pesas","Gimnasia","Buceo"],
    Marcas: [
        "Nike","Adidas","Apple","Samsung","Sony","Coca-Cola","Pepsi","Toyota","Honda","BMW",
        "Mercedes","Puma","Reebok","Canon","Panasonic","Ikea","Lego","Rolex","Gucci","Prada",
        "Versace","Levi's","H&M","Zara","Fila","Colgate","Nestlé","Heineken","Starbucks"],
    Peliculas: [
        "Acción","Aventura","Comedia","Drama","Terror","Suspenso","Misterio","Romance","Fantasía","Animación",
        "Ciencia ficción","Historia","Documental","Musical","Infantil","Épica","Biografía","Crimen","Guerra","Policial",
        "Espacial","Mágica","Oscura","Ficción","Clásica","Moderna","Independiente"],
    Frutas: [
        "Manzana","Banano","Mango","Fresa","Uva","Papaya","Piña","Sandía","Cereza","Durazno",
        "Pera","Kiwi","Mandarina","Frambuesa","Arándano","Guayaba","Coco",
        "Melón","Aguacate","Maracuyá","Naranja","Ciruela","Pomelo","Tamarindo","Carambola","Pitaya"],
    Cantantes: [
        "Shakira","Bad Bunny","Beyoncé","Taylor Swift","Ed Sheeran","Adele","Rihanna","Bruno Mars","Justin Bieber","Morat",
        "Coldplay","Billie Eilish","Drake","Lady Gaga","Dua Lipa","Maluma","Karol G","Camilo","Ariana Grande","Post Malone",
        "J Balvin","Selena Gomez","Celine Dion","Elvis Presley","Michael Jackson","Queen","Madonna","Prince","Luis Miguel","Marc Anthony"]
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

function updateWaitingText(){
    const nextPlayer = revealOrder[currentIndex];
    waitingText.textContent = `Pásale el dispositivo al Jugador ${nextPlayer}`;
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

// --- SETTINGS MODAL LOGIC ---
const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeModal = document.querySelector(".close-modal");
const lightModeToggle = document.getElementById("lightModeToggle");

settingsBtn.onclick = () => {
    settingsModal.classList.remove("hidden");
};

closeModal.onclick = () => {
    settingsModal.classList.add("hidden");
};

window.onclick = (event) => {
    if (event.target == settingsModal) {
        settingsModal.classList.add("hidden");
    }
};

window.toggleLightModeUI = () => {
    const isLight = ThemeSystem.toggleLightMode();
    // Optional: Update button text or icon if needed
};

// --- INTEGRATE ANIMATIONS & SOUNDS ---

// Modified showWordBtn logic
document.getElementById("showWordBtn").onclick = () => {
    // Play reveal sound
    SoundSystem.playSound('reveal');

    // Transition
    AnimationSystem.transitionSection(waiting, game);

    const player = revealOrder[currentIndex];
    playerHeader.textContent = `Jugador ${player}`;

    const wordToShow = playerWords[player]; 
    const isImpostor = impostors.includes(player);

    wordEl.style.color = isImpostor ? "var(--secondary-color)" : "var(--text-color)";
    
    // Glitch effect for Impostor
    if (isImpostor) {
        AnimationSystem.applyGlitchEffect(wordEl, wordToShow);
        // Play suspense sound
        SoundSystem.playSound('suspense');
    } else {
        // Stop suspense if it was playing (optional, or let it fade)
        SoundSystem.stopSound('suspense');
    }

    animateWord(wordToShow);

    // Mostrar categoría (incluso al impostor, para ayudarle a mentir mejor)
    // PERO si es modo Aleatorio, el usuario pidió ocultársela al impostor
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
            SoundSystem.stopSound('suspense'); // Stop suspense when time is up
        }
    }, 1000);

    setTimeout(()=>{
        // Transition back
        AnimationSystem.transitionSection(game, waiting);
        
        // Wait for transition to finish before updating state
        setTimeout(() => {
            currentIndex++;

            if(currentIndex >= revealOrder.length){
                const starter = revealOrder[Math.floor(Math.random() * revealOrder.length)];
                starterPlayerEl.textContent = `Jugador ${starter}`;
                
                // Final transition
                AnimationSystem.transitionSection(waiting, finalStart);
                
                // Particles for celebration
                AnimationSystem.createParticles(finalStart);
                SoundSystem.playSound('reveal');
                
            } else {
                updateWaitingText();
                // Ensure waiting screen is visible (transitionSection handles it but just in case)
                waiting.classList.remove("hidden"); 
            }
        }, 500); // Match transition duration

    }, 5000);
};

// Modified Start Button
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
    
    // Transition
    AnimationSystem.transitionSection(setup, waiting);
    updateWaitingText();
    
    // Try to start music (existing logic)
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

// Modified Restart Button
document.getElementById("btnReiniciar").onclick = () => {
    revealOrder = [];
    impostors = [];
    currentIndex = 0;
    playerWords = {};
    clearInterval(countdownTimer);
    SoundSystem.stopSound('suspense');

    waitingText.textContent = "";
    playerHeader.textContent = "";
    wordEl.textContent = "";
    starterPlayerEl.textContent = "";
    const countdownEl = document.getElementById("countdown");
    if(countdownEl) countdownEl.textContent = "";

    const catDisplay = document.getElementById("categoryDisplay");
    if(catDisplay) catDisplay.textContent = "";

    // Transition back to setup
    AnimationSystem.transitionSection(finalStart, setup);

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