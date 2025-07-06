    let client = "X";
        let gameOver = false;

        let score = JSON.parse(localStorage.getItem('record')) || { X: 0, O: 0 };
        let board = [["", "", ""], ["", "", ""], ["", "", ""]];
        let buttons = document.querySelectorAll(".bbb");

        function updateScores() {
        document.querySelector('.scoresX').innerHTML = `${score["X"]} wins`;
        document.querySelector('.scoresO').innerHTML = `${score["O"]} wins`;
        }
        updateScores();

        buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            press(button, index);
        });
        });

        function checkWinner() {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === client && board[i][1] === client && board[i][2] === client) return true;
            if (board[0][i] === client && board[1][i] === client && board[2][i] === client) return true;
        }
        if (board[0][0] === client && board[1][1] === client && board[2][2] === client) return true;
        if (board[0][2] === client && board[1][1] === client && board[2][0] === client) return true;
        return false;
        }

        function press(button, index) {
        if (gameOver || button.innerHTML !== "") return;

        let row = Math.floor(index / 3);
        let col = index % 3;
        board[row][col] = client;
        button.innerHTML = client;
        button.disabled = true;

        if (checkWinner()) {
            document.querySelector('.result').innerHTML = `${client} is the winner!`;
            score[client]++;
            localStorage.setItem('record', JSON.stringify(score));
            updateScores();
            gameOver = true;
            confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.2 }
            });
            return;
        }

        if ([...buttons].every(btn => btn.innerHTML !== "")) {
            document.querySelector('.result').innerHTML = "It's a draw!";
            gameOver = true;
            return;
        }

        client = client === "X" ? "O" : "X";
        document.querySelector('.turn').innerHTML = `${client}'s turn`;
        }

        function reset() {
        score = { X: 0, O: 0 };
        localStorage.removeItem('record');
        updateScores();
        again();
        }

        function again() {
        board = [["", "", ""], ["", "", ""], ["", "", ""]];
        buttons.forEach(button => {
            button.innerHTML = "";
            button.disabled = false;
        });
        client = "X";
        gameOver = false;
        document.querySelector('.turn').innerHTML = "X's turn";
        document.querySelector('.result').innerHTML = "";
        }