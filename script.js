const cells = document.querySelectorAll(".cell");
const text = document.querySelector("#text");
const restartBtn = document.querySelector("#restartBtn");
const submitBtn = document.querySelector("#submit");
const playerOneScore = document.querySelector("#playerOneScore");
const playerTwoScore = document.querySelector("#playerTwoScore");
const form = document.getElementById("formId");
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
let running = true;
let currentPlayer, playerOneName, playerTwoName,player1,player2;

form.addEventListener("submit", submitForm);

function player(name, mark) {
    let score = 0;
    this.mark = mark;
    const addScore = () => score++;
    const getScore = () => score;
    return { getScore, name, addScore, mark };
}

function submitForm(e) {
    e.preventDefault();
    playerOneName = document.querySelector("#playerOne").value;
    playerTwoName = document.querySelector("#playerTwo").value;
    document.querySelector(".nonModal").classList.remove("nonModal");
    const modal = document.querySelector("#modalContainer");
    modal.classList.remove("modalContainer","active");
    modal.style.opacity = 0;
    document.querySelector("#playerOne").value = "";
    document.querySelector("#playerTwo").value = "";
    initializeGame();
}

function initializeGame() {
     player1 = player(playerOneName, "X");
     player2 = player(playerTwoName, "O");

    currentPlayer = player1;

    playerOneScore.textContent = `${player1.name}: ${player1.getScore()}`;
    playerTwoScore.textContent = `${player2.name}: ${player2.getScore()}`;
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
    options[index] = currentPlayer.mark;
    cell.textContent = `${currentPlayer.mark}`;
}

function changePlayer() {
    currentPlayer = (currentPlayer.mark == "X") ? currentPlayer = player2 : currentPlayer = player1;
    text.textContent = text.textContent = `${currentPlayer.name}'s turn`;
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
            if (currentPlayer.mark == "X") {
                currentPlayer.addScore();
                playerOneScore.textContent = `${currentPlayer.name}: ${currentPlayer.getScore()}`;
            }
            else {
                currentPlayer = player2;
                currentPlayer.addScore();
                playerTwoScore.textContent = `${currentPlayer.name}: ${currentPlayer.getScore()}`;
            }
            break;
        }
    }
    if (roundWon) {
        text.textContent = `${currentPlayer.name} Wins!`;
        running = false;
    }
    else if (!options.includes(""))
        text.textContent = "DRAW!";
    else
        changePlayer();
}
function restart() {
    currentPlayer = (currentPlayer == player1) ? currentPlayer = player2 : currentPlayer = player1;
    options = ["", "", "", "", "", "", "", "", ""];
    text.textContent = `${currentPlayer.name}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}