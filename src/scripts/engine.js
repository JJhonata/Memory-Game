const emojis = [
  "😭",
  "😭",
  "😍",
  "😍",
  "🫡",
  "🫡",
  "😝",
  "😝",
  "🤨",
  "🤨",
  "😶‍🌫️",
  "😶‍🌫️",
  "😨",
  "😨",
  "🤑",
  "🤑",
];
let openCards = [];
let score = 1000;
let interval;

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

function updateScore() {
  document.getElementById("score").innerText = score;
}

function startTimer() {
  interval = setInterval(() => {
    if (score > 0) {
      score -= 10;
      updateScore();
    } else {
      clearInterval(interval);
      alert("Você perdeu! 😭 O tempo acabou.");
      window.location.reload();
    }
  }, 1000);
}

for (let i = 0; i < emojis.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  box.innerHTML = shuffleEmojis[i];
  box.onclick = handClick;
  document.querySelector(".game").appendChild(box);
}

document.querySelector(".game").addEventListener(
  "click",
  () => {
    if (!interval) {
      startTimer();
    }
  },
  { once: true }
);

function handClick() {
  if (openCards.length < 2) {
    this.classList.add("boxOpen");
    openCards.push(this);
  }

  if (openCards.length == 2) {
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
  } else {
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
  }

  openCards = [];

  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    clearInterval(interval);
    setTimeout(() => alert(`Você venceu com ${score} pontos! 🥳`), 100);
  }
}
