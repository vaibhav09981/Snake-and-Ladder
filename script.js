// script.js
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameBoard[index] !== '' || !gameActive) {
        return;
    }

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWin();
    switchPlayer();
}

function checkWin() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            message.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
    }

    // Check for a tie
    if (!gameBoard.includes('')) {
        message.textContent = "It's a tie!";
        gameActive = false;
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (gameActive) { // Only update the message if the game is still active
        message.textContent = `It's ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    message.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// Initial message
message.textContent = `It's ${currentPlayer}'s turn`;