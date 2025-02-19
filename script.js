const cells = document.querySelectorAll(".cell");
const text = document.querySelector("#text");
const restartBtn = document.querySelector("#restartBtn");
const scoreX = document.querySelector("#scoreX");
const scoreY = document.querySelector("#scoreY");
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let xPoints = 0, yPoints = 0;
let running = true;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClick));
    restartBtn.addEventListener("click", restart);
}

function cellClick() {
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] != "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = `${currentPlayer}`;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    text.textContent = text.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const winCombo = winningCombinations[i];
        const cellA = options[winCombo[0]];
        const cellB = options[winCombo[1]];
        const cellC = options[winCombo[2]];
        if (cellA == "" || cellB == "" || cellC == "")
            continue;
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            if (currentPlayer == "X") {
                xPoints++
                scoreX.textContent = `${xPoints}`;
            }
            else {
                yPoints++;
                scoreY.textContent = `${yPoints}`;
            }
            break;
        }
    }
    if (roundWon)
    {
        text.textContent = `${currentPlayer} Wins!`;
    running = false;
    }
    else if (!options.includes(""))
        text.textContent = "DRAW!";
    else
        changePlayer();
}
function restart() {
    if (currentPlayer == "X")
        currentPlayer = "O"
    else if (currentPlayer == "O")
        currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    text.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}