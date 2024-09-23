// Lista de palabras y sus pistas
const wordsWithHints = {
    "algoritmo": "Es un conjunto de pasos para resolver un problema.",
    "depuracion": "Es el proceso de eliminar errores en el código.",
    "compilador": "Convierte el código fuente a código máquina.",
    "variable": "Es un espacio en memoria para almacenar datos.",
    "framework": "Es un conjunto de herramientas para facilitar el desarrollo.",
    "tacos": "Comida mexicana famosa.",
    "sushi": "Comida japonesa hecha con arroz y pescado.",
    "pizza": "Comida italiana con masa, salsa y queso.",
    "ensalada": "Plato que generalmente contiene verduras crudas.",
    "chocolate": "Dulce hecho de cacao.",
    "elefante": "Es un mamífero grande con trompa.",
    "giraffe": "Es el animal terrestre más alto.",
    "canguro": "Es un marsupial que salta.",
    "pingüino": "Es un ave que no vuela y vive en el agua.",
    "tortuga": "Reptil con caparazón.",
    "guitarra": "Instrumento musical de cuerdas.",
    "piano": "Instrumento musical de teclas.",
    "batería": "Conjunto de instrumentos de percusión.",
    "saxofón": "Instrumento musical de metal con sonido de lengüeta.",
    "violín": "Instrumento musical de cuerda frotada.",
    "fútbol": "Deporte en el que dos equipos patean un balón.",
    "basketball": "Deporte en el que dos equipos lanzan una pelota a una canasta.",
    "tenis": "Deporte que se juega en una cancha con raquetas.",
    "natación": "Actividad de nadar en el agua.",
    "ciclismo": "Deporte que se realiza en bicicleta.",
    "acción": "Género de películas que incluyen aventuras emocionantes.",
    "comedia": "Género de películas que busca hacer reír.",
    "drama": "Género de películas que presenta situaciones serias.",
    "terror": "Género de películas que busca asustar.",
    "aventura": "Género de películas con exploraciones emocionantes.",
    "maleta": "Objeto utilizado para llevar ropa y objetos.",
    "pasaporte": "Documento necesario para viajar a otros países.",
    "aeropuerto": "Lugar donde llegan y salen los vuelos.",
    "destino": "Lugar al que se va.",
    "computadora": "Máquina electrónica para procesar datos.",
    "internet": "Red global que conecta computadoras.",
    "robótica": "Campo que involucra la construcción de robots.",
    "ciberseguridad": "Prácticas para proteger sistemas y datos digitales.",
    "inteligencia": "Capacidad de aprender y entender.",
    "montañas": "Grandes elevaciones naturales de la superficie terrestre.",
    "río": "Cuerpo de agua que fluye hacia un océano o lago.",
    "bosque": "Área grande cubierta de árboles.",
    "desierto": "Área árida con muy poca lluvia.",
    "océano": "Gran cuerpo de agua que cubre la mayor parte de la Tierra.",
    "civilizacion": "Sociedad avanzada con un alto nivel de cultura.",
    "revolucion": "Cambio radical en la política o en la sociedad.",
    "monarquia": "Sistema de gobierno con un rey o reina.",
    "imperio": "Extensa colección de territorios bajo un solo gobernante.",
    "dinastia": "Serie de gobernantes de la misma familia."
};

// Variables globales
let word;
let hint;
let guessedWord;
let wrongLetters;
let attemptsLeft;
let waterPercentage = 0;

// Elementos HTML
const wordContainer = document.getElementById("wordContainer");
const letterInput = document.getElementById("letterInput");
const submitLetter = document.getElementById("submitLetter");
const wrongLettersDiv = document.getElementById("wrongLetters");
const attemptsLeftDiv = document.getElementById("attemptsLeft");
const hintContainer = document.getElementById("hintContainer");
const waterAnimation = document.getElementById("waterAnimation");

// Función para iniciar el juego
function startGame() {
    // Elegir una palabra y su pista
    word = Object.keys(wordsWithHints)[Math.floor(Math.random() * Object.keys(wordsWithHints).length)].toLowerCase();
    hint = wordsWithHints[word];
    guessedWord = Array(word.length).fill("_");
    wrongLetters = [];
    attemptsLeft = 6;
    waterPercentage = 0;
    waterAnimation.style.display = "none"; // Ocultar animación al reiniciar

    updateWord();
    updateWrongLetters();
    updateAttempts();
    updateHint();
}

// Actualizar la palabra oculta
function updateWord() {
    wordContainer.textContent = guessedWord.join(" ");
}

// Mostrar letras incorrectas
function updateWrongLetters() {
    wrongLettersDiv.textContent = `Letras incorrectas: ${wrongLetters.join(", ")}`;
}

// Mostrar intentos restantes
function updateAttempts() {
    attemptsLeftDiv.textContent = `Intentos restantes: ${attemptsLeft}`;
}

// Actualizar la pista
function updateHint() {
    hintContainer.textContent = `Pista: ${hint}`;
}

// Incrementar la animación del agua
function incrementWaterAnimation() {
    if (waterPercentage < 100) {
        waterPercentage += (100 / 6);  // 6 es el número total de intentos
        document.getElementById("water").style.transform = `translate(0, ${100 - waterPercentage}%)`;
    }
}

// Mostrar la animación de agua la primera vez que se equivoquen
function showWaterAnimation() {
    if (waterAnimation.style.display === "none") {
        waterAnimation.style.display = "block";
    }
    incrementWaterAnimation();
}

// Comprobar letra
function checkLetter(letter) {
    if (word.includes(letter)) {
        // Letra correcta
        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) {
                guessedWord[i] = letter;
            }
        }
    } else {
        // Letra incorrecta
        wrongLetters.push(letter);
        attemptsLeft--;
        showWaterAnimation();  // Mostrar o incrementar la animación de agua
        updateHint();  // Mostrar la pista
    }

    updateWord();
    updateWrongLetters();
    updateAttempts();

    if (guessedWord.join("") === word) {
        alert("¡Felicidades! Ganaste.");
        resetGame(); // Reiniciar el juego al ganar
    }

    if (attemptsLeft === 0) {
        alert("Perdiste. La palabra era: " + word);
        resetGame(); // Reiniciar el juego al perder
    }
}

// Función para reiniciar el juego
function resetGame() {
    startGame();
}

// Evento para probar la letra
submitLetter.addEventListener("click", () => {
    const letter = letterInput.value.toLowerCase();
    if (letter && !wrongLetters.includes(letter) && !guessedWord.includes(letter)) {
        checkLetter(letter);
    }
    letterInput.value = "";
});

// Inicializar el juego
startGame();
