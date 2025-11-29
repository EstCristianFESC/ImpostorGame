const words = { // Diccionario de palabras por categoría
    Animales: ["Perro", "Gato", "Tigre", "Conejo", "Elefante", "Loro", "León", "Zorro", "Oso", "Serpiente", "Delfín"],
    Comida: ["Pizza", "Arepa", "Hamburguesa", "Tamal", "Pasta", "Empanada", "Chocolate", "Bandeja Paisa", "Sancocho", "Ajiaco"],
    Objetos: ["Silla", "Mesa", "Teléfono", "Lámpara", "Reloj", "Computador", "Teclado", "Audífonos", "Cartera", "Cuaderno"],
    Profesiones: ["Doctor", "Ingeniero", "Abogado", "Profesor", "Policía", "Enfermero", "Chef", "Arquitecto", "Contador"],
    Deportes: ["Fútbol", "Baloncesto", "Tenis", "Natación", "Ciclismo", "Voleibol", "Boxeo", "Atletismo"],
    Marcas: ["Nike", "Adidas", "Apple", "Samsung", "Puma", "Coca-Cola", "Pepsi", "Sony", "BMW"],
    Peliculas: ["Titanic", "Avatar", "Anaconda", "Vengadores", "El Padrino", "Harry Potter", "Toy Story"],
    Frutas: ["Manzana", "Banano", "Mango", "Fresa", "Uva", "Papaya", "Piña", "Sandía"],
    Cantantes: ["Shakira", "Karol G", "Maluma", "Feid", "Bad Bunny", "J Balvin", "Adele", "Bruno Mars"]
};

let revealOrder = []; // Orden de jugadores
let impostors = []; // Lista de impostores
let chosenWord = ""; // Palabra a mostrar
let currentIndex = 0; // Jugador actual
let countdownTimer = null; // Timer del contador

const setup = document.getElementById("setup");
const waiting = document.getElementById("waiting");
const game = document.getElementById("game");
const finalStart = document.getElementById("finalStart");
const wordEl = document.getElementById("word");
const playerHeader = document.getElementById("playerHeader");
const waitingText = document.getElementById("waitingText");
const starterPlayerEl = document.getElementById("starterPlayer");

// Función para barajar un array
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

document.getElementById("startBtn").onclick = () => {
    const nPlayers = parseInt(document.getElementById("numPlayers").value);
    const nImpostors = parseInt(document.getElementById("numImpostors").value);
    const category = document.getElementById("category").value;

    // Elegir palabra según categoría o aleatoria
    if(category === "Aleatorio") {
        const allWords = Object.values(words).flat();
        chosenWord = allWords[Math.floor(Math.random() * allWords.length)];
    } else {
        chosenWord = words[category][Math.floor(Math.random() * words[category].length)];
    }

    // Generar orden de jugadores aleatorio
    revealOrder = shuffle(Array.from({ length: nPlayers }, (_, i) => i + 1));

    // Seleccionar impostores aleatorios
    impostors = [];
    while(impostors.length < nImpostors) {
        let r = Math.floor(Math.random() * nPlayers) + 1;
        if(!impostors.includes(r)) impostors.push(r);
    }

    currentIndex = 0;
    setup.classList.add("hidden");
    waiting.classList.remove("hidden");
    updateWaitingText();
};

// Actualiza texto en pantalla de espera
function updateWaitingText() {
    const player = revealOrder[currentIndex];
    waitingText.textContent = `Jugador ${player}, presiona para ver tu palabra`;
}

// Mostrar palabra con contador debajo
document.getElementById("showWordBtn").onclick = () => {
    waiting.classList.add("hidden");
    game.classList.remove("hidden");

    const player = revealOrder[currentIndex];
    playerHeader.textContent = `Jugador ${player}`;

    // Mostrar palabra o impostor
    if(impostors.includes(player)) {
        wordEl.textContent = "Impostor";
        wordEl.style.color = "#ff006e";
    } else {
        wordEl.textContent = chosenWord;
        wordEl.style.color = (document.getElementById("category").value === "Aleatorio") ? "#00d084" : "#ffbe0b";
    }

    // Crear contador debajo si no existe
    let countdownEl = document.getElementById("countdown");
    if(!countdownEl) {
        countdownEl = document.createElement("span");
        countdownEl.id = "countdown";
        countdownEl.style.display = "block";
        countdownEl.style.color = "white";
        countdownEl.style.marginTop = "10px";
        countdownEl.style.fontSize = "1.2rem";
        wordEl.parentNode.appendChild(countdownEl);
    }

    // Inicializar y mostrar countdown
    let countdown = 5;
    countdownEl.textContent = `Tiempo: ${countdown}s`;
    clearInterval(countdownTimer); // Limpiar cualquier timer previo
    countdownTimer = setInterval(() => {
        countdown--;
        countdownEl.textContent = `Tiempo: ${countdown}s`;
        if(countdown <= 0) {
            clearInterval(countdownTimer);
            countdownEl.textContent = "";
        }
    }, 1000);

    setTimeout(() => {
        game.classList.add("hidden");
        currentIndex++;

        if(currentIndex >= revealOrder.length) {
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

// Reinicio total limpio
document.getElementById("btnReiniciar").onclick = () => {
    revealOrder = [];
    impostors = [];
    chosenWord = "";
    currentIndex = 0;
    clearInterval(countdownTimer);

    waitingText.textContent = "";
    playerHeader.textContent = "";
    wordEl.textContent = "";
    starterPlayerEl.textContent = "";

    // Limpiar contador si existe
    const countdownEl = document.getElementById("countdown");
    if(countdownEl) countdownEl.textContent = "";

    finalStart.classList.add("hidden");
    game.classList.add("hidden");
    waiting.classList.add("hidden");
    setup.classList.remove("hidden");

    document.getElementById("numPlayers").value = "3";
    document.getElementById("numImpostors").value = "1";
    document.getElementById("category").value = "Animales";
};