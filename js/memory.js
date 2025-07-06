document.querySelectorAll('.card-box').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

document.getElementById('start-game').addEventListener('click', () => {
  let yourname = prompt("Enter your name :");
  if (yourname == null || yourname == "") {
    document.querySelector('.name span').innerText = "Guest";
  } else {
    document.querySelector('.name span').innerText = yourname;
  }
  document.querySelector(".control-buttons").remove();
});

let duration = 1000;
let blocksContainer = document.querySelector(".game-board");
let blocks = Array.from(blocksContainer.children);

// Shuffle the order
let orderRange = [...Array(blocks.length).keys()].sort(() => Math.random() - 0.5);
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let tries = 0;

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
});
document.querySelectorAll('.card-box').forEach(card => {
  card.addEventListener('click', () => {
    if (lockBoard || card === firstCard || card.classList.contains("matched")) return;

    card.classList.add("flipped");

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      checkMatch(); // نستدعي دالة المقارنة
    }
  });
});
function checkMatch() {
  let firstImg = firstCard.querySelector('.card-back img').getAttribute("src");
  let secondImg = secondCard.querySelector('.card-back img').getAttribute("src");

  if (firstImg === secondImg) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetCards();
  } else {
    lockBoard = true;
    tries++;
    document.getElementById("tries").innerText = tries;

    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetCards();
    }, 1000);
  }
}
function resetCards() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
