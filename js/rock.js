
    // Game Logic
    let score = JSON.parse(localStorage.getItem('score')) || { win: 0, loss: 0, tie: 0 };
    updateitem();

        function play(player) {
        const comp = findrand();
        let result = '';

        if (player === comp) {
            result = 'tie';
            score.tie++;
        } else if (
            (player === 'rock' && comp === 'scissors') ||
            (player === 'paper' && comp === 'rock') ||
            (player === 'scissors' && comp === 'paper')
        ) {
            result = 'win';
            score.win++;
        } else {
            result = 'loss';
            score.loss++;
        }
        if ( result === 'win'){
            confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.2 }
            });
        }
        localStorage.setItem('score', JSON.stringify(score));
        document.querySelector('.result').textContent = `You ${result}`;
        document.querySelector('.info').innerHTML = `
            <div class="vsp">
            <div class="text-center">
                <img class="vs" src="img/${player}.png" alt="${player}">
                <p>Player</p>
            </div>
            <div class="text-center">
                <img class="vs" src="img/${comp}.png" alt="${comp}">
                <p>Computer</p>
            </div>
            </div>`;
        updateitem();
        }

        function updateitem() {
        document.querySelector('.scores').textContent =
            `Player: ${score.win}  |  Computer: ${score.loss}  |  Ties: ${score.tie}`;
        }

        function resetScore() {
        score = { win: 0, loss: 0, tie: 0 };
        localStorage.removeItem('score');
        updateitem();
        document.querySelector('.result').textContent = '';
        document.querySelector('.info').innerHTML = '';
        }

        function findrand() {
        const rand = Math.random();
        return rand < 1 / 3 ? 'rock' : rand < 2 / 3 ? 'paper' : 'scissors';
        }