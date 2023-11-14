var player1 = "R";
var player2 = "Y";
var currPlayer = player1;
var board;
var gameOver = false;
var rows = 6;
var columns = 7;
var currColumns = []; 

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", playerMove);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function playerMove() {
    if (gameOver == true) {
        return;
    }

    let position = this.id.split("-");
    let r = parseInt(position[0]);
    let c = parseInt(position[1]);

    r = currColumns[c]; 

    if (r < 0) { 
        return;
    }

    board[r][c] = currPlayer; 
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == player1) {
        tile.classList.add("red-piece");
        currPlayer = player2;
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = player1;
    }

    r -= 1; 
    currColumns[c] = r; 

    winningPosition();
}

function winningPosition() {
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1]) {
                    if(board[r][c+1] == board[r][c+2]){
                        if(board[r][c+2] == board[r][c+3]){
                            displayWinner(r, c);
                            return;
                        }
                    }
                    
                }
            }
         }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c]) {
                    if(board[r+1][c] == board[r+2][c]){
                        if(board[r+2][c] == board[r+3][c]){
                            displayWinner(r, c);
                            return;
                        }
                    }
                }
            }
        }
    }

    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1]) {
                    if(board[r+1][c+1] == board[r+2][c+2]){
                        if(board[r+2][c+2] == board[r+3][c+3]){
                            displayWinner(r, c);
                            return;
                        }
                    }
                }
            }
        }
    }

    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1]) {
                    if(board[r-1][c+1] == board[r-2][c+2]){
                        if(board[r-2][c+2] == board[r-3][c+3]){
                            displayWinner(r, c);
                            return;
                        }
                    }
                }
            }
        }
    }
}

function displayWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == player1) {
        winner.innerText = "Red Wins";
    } else {
        winner.innerText = "Yellow Wins";
    }
    gameOver = true;
}
