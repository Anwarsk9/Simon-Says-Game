let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let startBtn = document.querySelector("button");
let btns = ["red", "blue", "purple", "orange"];
let h2 = document.querySelector("h2");

startBtn.addEventListener("click", () => {
  if (started === false) {
    started = true;
    startBtn.style.visibility = "hidden";
    h2.style.visibility = "visible";
    console.log("game started");
    addEvent(1);

    setTimeout(levelUp, 700);
  }
});

function addEvent(arg) {
  let allBtns = document.querySelectorAll(".btn");
  if (arg == true) {
    for (let btn of allBtns) {
      btn.style.cursor = "pointer";
      btn.addEventListener("click", btnPress);
    }
  }else{
    for (let btn of allBtns) {
      btn.style.cursor = "no-drop";
      btn.removeEventListener("click", btnPress);
    }
  }
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `level ${level}`;

  let ranInd = Math.floor(Math.random() * 4);
  let randcolor = btns[ranInd];
  gameSeq.push(randcolor);
  console.log(gameSeq);
  let btn = document.querySelector(`#${randcolor}`);
  btnFlash(btn);
}

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 300);
}

function btnPress() {
  let btn = this;
  let btnColor = btn.getAttribute("id");
  userSeq.push(btnColor);
  console.log(userSeq);
  btnFlash(btn);
  btnCheck(userSeq.length - 1);
}

function btnCheck(ind) {
  if (userSeq[ind] === gameSeq[ind]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    level--;
    h2.innerHTML = `Game Over! your score is <b>${level}</b>`;
    startBtn.innerText = "play again";
    startBtn.style.width = "120px";
    startBtn.style.visibility = "visible";
    reset();
  }
}

function reset() {
  level = 0;
  gameSeq = [];
  userSeq = [];
  started = false;
  addEvent(false);
}
