let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let btns = ["pink", "blue", "royal-blue", "orange"];

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started === false) {
    console.log("game is started");
    started = true;

    levelUp();

    let allBtns = document.querySelectorAll(".btn");
    for (let btn of allBtns) {
      btn.addEventListener("click", btnPress);
    }
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");

  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `level ${level}`;

  let randInd = Math.floor(Math.random() * 4);
  let randColor = btns[randInd];
  gameSeq.push(randColor);
  console.log(gameSeq);
  let randBtn = document.querySelector(`.${randColor}`);
  btnFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! your score was <b>${level}</b>. <br> Press any key to start.`;
    document.querySelector("body").style.background = "red";
    setTimeout(function () {
      document.querySelector("body").style.background = "white";
    }, 250);
    reset();
  }
}

function btnPress() {
  let btn = this;
  btnFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
