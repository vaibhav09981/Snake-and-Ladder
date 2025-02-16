// script.js
const board = document.querySelector('.board');
const rollButton = document.getElementById('rollButton');
const diceValueDisplay = document.getElementById('diceValue');
const playerTurnDisplay = document.getElementById('playerTurn');

const gridSize = 10;
let players = [{ position: 0 }, { position: 0 }]; // Two players
let currentPlayerIndex = 0;
let gameOver = false;

// Create the board
for (let i = gridSize * gridSize - 1; i >= 0; i--) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = i + 1; // Cell number for easy visualization
    board.appendChild(cell);
}

const cells = document.querySelectorAll('.cell');

// Add players to the board (initially at position 0)
function updatePlayerPosition(playerIndex) {
    const player = players[playerIndex];
    const cell = cells[player.position];
    const playerDiv = document.createElement('div');
    playerDiv.classList.add('player');
    if (playerIndex === 1) {
        playerDiv.classList.add('player1');
    }
    cell.appendChild(playerDiv); // Add player to cell
}

updatePlayerPosition(0);
updatePlayerPosition(1);

const snakes = {
    16: 6, 47: 26, 49: 11, 56: 53, 64: 24, 87: 18, 93: 68, 98: 65
};

const ladders = {
    1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 51: 67, 72: 91, 80: 99
};

rollButton.addEventListener('click', () => {
    if (gameOver) return; // Game is over, no more rolls

    const diceValue = Math.floor(Math.random() * 6) + 1;
    diceValueDisplay.textContent = `Dice: ${diceValue}`;

    const currentPlayer = players[currentPlayerIndex];
    let newPosition = currentPlayer.position + diceValue;


    if (newPosition < gridSize * gridSize) {  //check for exceeding board
        if (snakes[newPosition]) {
            newPosition = snakes[newPosition];
            alert("Ouch! Snake");
        } else if (ladders[newPosition]) {
            newPosition = ladders[newPosition];
            alert("Yay! Ladder");
        }
        
        // Clear the player's previous position
        const previousCell = cells[currentPlayer.position];
        previousCell.innerHTML = ''; // Remove player div

        currentPlayer.position = newPosition;
        updatePlayerPosition(currentPlayerIndex);

        // Check for win
        if (currentPlayer.position === gridSize * gridSize - 1) {
            playerTurnDisplay.textContent = `Player ${currentPlayerIndex + 1} wins!`;
            gameOver = true;
            rollButton.disabled = true; // Disable the roll button
            return;
        }

        currentPlayerIndex = 1 - currentPlayerIndex; // Switch players (0 <-> 1)
        playerTurnDisplay.textContent = `Player ${currentPlayerIndex + 1}'s turn`;
    } else {
        alert("Can't move beyond board");
    }
});

playerTurnDisplay.textContent = `Player ${currentPlayerIndex + 1}'s turn`; // Initial display
