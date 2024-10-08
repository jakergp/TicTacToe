const gameboard = (function () {
    let board = Array(9);
    function addMark(type, position) {
        if (board[position] == undefined) {
            board[position] = type;
            return true;
        }
        return false;
    }

    function checkWinner() {
        let winner = false;
        for (let i = 0; i <= 6; i = i + 3) {
            if (
                board[i] == board[i + 1] &&
                board[i] == board[i + 2] &&
                board[i] != undefined
            )
                winner = true;
        }

        for (let i = 0; i <= 2; i++) {
            if (
                board[i] == board[i + 3] &&
                board[i] == board[i + 6] &&
                board[i] != undefined
            )
                winner = true;
        }

        if (
            board[0] == board[4] &&
            board[0] == board[8] &&
            board[0] != undefined
        )
            winner = true;
        if (
            board[2] == board[4] &&
            board[2] == board[6] &&
            board[2] != undefined
        )
            winner = true;

        return winner;
    }

    function init() {
        const board_div = document.getElementById("board");
        for (let i = 0; i < 9; i++) {
            const div = document.createElement("div");
            div.id = i;
            div.addEventListener("click", game.clickCell);
            board_div.appendChild(div);
        }
    }

    function restartBoard() {
        for (let i = 0; i < 9; i++) {
            board[i] = undefined;

            const div = document.getElementById(i);
            div.className = "";
        }
        game.restart();
    }

    return { addMark, checkWinner, init, restartBoard };
})();

const game = (function () {
    let turn = 1;
    let turn_start = turn;
    let turn_number = 0;
    let winner = false;
    let score = [0, 0];
    let result = document.getElementById("result");

    function clickCell() {
        if (winner || turn_number > 8) return;
        const position = this.id;
        let validPosition = gameboard.addMark(turn, position);
        if (validPosition) {
            this.classList.add(turn ? "cross" : "circle");
            nextTurn();
        }
    }

    function nextTurn() {
        turn_number++;
        winner = gameboard.checkWinner();

        if (winner) {
            score[turn]++;
            result.innerText = (turn ? "X" : "O") + " wins.";
            ui.updateScore(turn, score[turn]);
            return;
        }

        if (turn_number == 9) {
            result.innerText = "Tie.";
        }

        turn = turn ? 0 : 1;
    }

    function restart() {
        turn = turn_start ? 0 : 1;
        turn_start = turn;
        turn_number = 0;
        winner = false;
        result.innerText = "";
    }

    return { clickCell, restart };
})();

const ui = (function () {
    const x_score = document.getElementById("playerX");
    const o_score = document.getElementById("playerO");
    const score = [o_score, x_score];
    const restart = document.getElementById("restart");
    restart.addEventListener("click", gameboard.restartBoard);
    
    function updateScore(player, n) {
        score[player].innerText = (player ? 'X' : 'O') + " score: " + n;
    }
    return { updateScore };
})();

gameboard.init();
