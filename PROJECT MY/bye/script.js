const wordList = ["javascript", "html", "css", "python", "react", "node", "express"];
let selectedWord, wordDisplay, incorrectGuesses, guessedLetters;

document.addEventListener("DOMContentLoaded", () => {
    startGame();
});

function startGame() {
    // Reset the game variables
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
    wordDisplay = Array(selectedWord.length).fill("_");
    incorrectGuesses = 0;
    guessedLetters = [];

    document.getElementById("wordDisplay").textContent = wordDisplay.join(" ");
    document.getElementById("incorrectGuesses").textContent = incorrectGuesses;
    document.getElementById("message").textContent = "";
    document.getElementById("restartBtn").style.display = "none";

    // Create letter buttons
    createLetterButtons();
}

function createLetterButtons() {
    const lettersContainer = document.getElementById("letters");
    lettersContainer.innerHTML = ""; // Clear previous buttons
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

    alphabet.forEach((letter) => {
        const button = document.createElement("button");
        button.textContent = letter;
        button.addEventListener("click", () => handleGuess(letter));
        lettersContainer.appendChild(button);
    });
}

function handleGuess(letter) {
    // Disable the letter button once clicked
    const button = document.querySelector(`button:contains(${letter})`);
    button.disabled = true;

    // Check if the letter was already guessed
    if (guessedLetters.includes(letter)) {
        return;
    }

    guessedLetters.push(letter);

    if (selectedWord.includes(letter)) {
        updateWordDisplay(letter);
    } else {
        incorrectGuesses++;
        document.getElementById("incorrectGuesses").textContent = incorrectGuesses;
    }

    checkGameStatus();
}

function updateWordDisplay(letter) {
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
            wordDisplay[i] = letter;
        }
    }
    document.getElementById("wordDisplay").textContent = wordDisplay.join(" ");
}

function checkGameStatus() {
    if (wordDisplay.join("") === selectedWord) {
        document.getElementById("message").textContent = "Congratulations, you won!";
        document.getElementById("restartBtn").style.display = "block";
    } else if (incorrectGuesses >= 6) {
        document.getElementById("message").textContent = `Game Over! The word was "${selectedWord}".`;
        document.getElementById("restartBtn").style.display = "block";
    }
}
