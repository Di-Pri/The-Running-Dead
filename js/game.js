window.addEventListener("load", start);

let lives = 4;
let score = 0;

let durationOfGame = 45;
let timeLeft;
let timeTracker;
let deciSeconds;

let gameIsPaused = false;
let gameHasEnded = false;

let zombieSound = document.querySelector("#zombie_sound");
let humanSound = document.querySelector("#human_sound");
let bgMusic = document.querySelector("#background_sound");
let gameOverSound = document.querySelector("#game_over_sound");
let winSound = document.querySelector("#win_screen_sound");

function start() {
  removeEndScreen();

  document.querySelector("#title_screen").classList.remove("hidden");

  document.querySelector("#start_button").classList.remove("hidden");
  document.querySelector("#start_button").classList.add("move");
  document.querySelector("#start_button").addEventListener("click", startGame);

  document.querySelector("#cross_button").classList.add("hidden");
  document.querySelector("#instructions").classList.add("hidden");

  document.querySelector("#instructions_button").classList.remove("hidden");
  document.querySelector("#instructions_button").classList.add("move");
  document.querySelector("#instructions_button").addEventListener("click", instruction);
}

function instruction() {
  document.querySelector("#cross_button").classList.remove("hidden");
  document.querySelector("#cross_button").classList.add("move");
  document.querySelector("#cross_button").addEventListener("click", start);

  document.querySelector("#instructions").classList.remove("hidden");
  document.querySelector("#instructions_button").classList.add("hidden");
}

function startGame() {
  console.log("function startGame()");

  document.querySelector("#title_screen").classList.add("hidden");
  document.querySelector("#instructions").classList.add("hidden");
  document.querySelector("#cross_button").classList.add("hidden");
  document.querySelector("#start_button").classList.add("hidden");
  document.querySelector("#instructions_button").classList.add("hidden");

  document.querySelector("#game_foreground").classList.remove("hidden");
  document.querySelector("#pause").classList.remove("hidden");
  document.querySelector("#mute").classList.remove("hidden");
  document.querySelector("#logo").classList.remove("hidden");

  lives = 4;
  score = 0;

  timeLeft = durationOfGame;

  deciSeconds = durationOfGame * 10;

  startTimer();

  bgMusic.play();

  document.querySelector("#number").textContent = score + "/30";

  document.querySelector("#time_liquid").classList.add("shrink");

  document.querySelector("#con1").classList.add("pos1");
  document.querySelector("#con1").addEventListener("click", clickHuman);
  document.querySelector("#con1").addEventListener("animationiteration", newPos);

  document.querySelector("#con2").classList.add("pos5");
  document.querySelector("#con2").addEventListener("click", clickHuman);
  document.querySelector("#con2").addEventListener("animationiteration", newPos);

  document.querySelector("#con3").classList.add("pos3");
  document.querySelector("#con3").addEventListener("click", clickZombie);
  document.querySelector("#con3").addEventListener("animationiteration", newPos);

  document.querySelector("#con4").classList.add("pos4");
  document.querySelector("#con4").addEventListener("click", clickZombie);
  document.querySelector("#con4").addEventListener("animationiteration", newPos);

  document.querySelector("#con5").classList.add("pos7", "delaySprite");
  document.querySelector("#con5").addEventListener("click", clickZombie);
  document.querySelector("#con5").addEventListener("animationiteration", newPos);

  document.querySelector("#mute").classList.add("soundOn");
  document.querySelector("#mute").classList.add("move");
  document.querySelector("#mute").addEventListener("click", muteSound);

  document.querySelector("#pause").classList.add("pause_button");
  document.querySelector("#pause").classList.add("move");
  document.querySelector("#pause").addEventListener("click", pauseGame);
}

function removeEndScreen() {
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#win").classList.add("hidden");
  document.querySelector("#restart_button").classList.add("hidden");
  document.querySelector("#home_button").classList.add("hidden");

  document.querySelector("#zombie1_over").classList.add("hidden");
  document.querySelector("#zombie2_over").classList.add("hidden");
  document.querySelector("#zombie1_over").classList.remove("dance1");
  document.querySelector("#zombie2_over").classList.remove("dance1", "delay");

  document.querySelector("#human1_win").classList.add("hidden");
  document.querySelector("#human2_win").classList.add("hidden");
  document.querySelector("#human1_win").classList.remove("dance2");
  document.querySelector("#human2_win").classList.remove("dance2");

  document.querySelector("#life1").classList.remove("greyHeart");
  document.querySelector("#life2").classList.remove("greyHeart");
  document.querySelector("#life3").classList.remove("greyHeart");
  document.querySelector("#life1").classList.add("redHeart");
  document.querySelector("#life2").classList.add("redHeart");
  document.querySelector("#life3").classList.add("redHeart");

  gameOverSound.pause();
  gameOverSound.currentTime = 0;
  winSound.pause();
  winSound.currentTime = 0;
  bgMusic.currentTime = 0;

  gameHasEnded = false;
}

function restartGame() {
  removeEndScreen();

  startGame();
}

function pauseGame() {
  if (gameIsPaused == false) {
    document.querySelector("#time_liquid").classList.add("paused");

    document.querySelector("#pause").classList.remove("pause_button");
    document.querySelector("#pause").classList.add("play_button");

    bgMusic.pause();

    document.querySelector("#con1").classList.add("paused");
    document.querySelector("#con2").classList.add("paused");
    document.querySelector("#con3").classList.add("paused");
    document.querySelector("#con4").classList.add("paused");
    document.querySelector("#con5").classList.add("paused");

    document.querySelector("#sprite1").classList.add("paused");
    document.querySelector("#sprite2").classList.add("paused");
    document.querySelector("#sprite3").classList.add("paused");
    document.querySelector("#sprite4").classList.add("paused");
    document.querySelector("#sprite5").classList.add("paused");

    document.querySelector("#con1").removeEventListener("click", clickHuman);
    document.querySelector("#con2").removeEventListener("click", clickHuman);
    document.querySelector("#con3").removeEventListener("click", clickZombie);
    document.querySelector("#con4").removeEventListener("click", clickZombie);
    document.querySelector("#con5").removeEventListener("click", clickZombie);

    gameIsPaused = true;
  } else {
    document.querySelector("#time_liquid").classList.remove("paused");

    document.querySelector("#pause").classList.remove("play_button");
    document.querySelector("#pause").classList.add("pause_button");

    bgMusic.play();

    document.querySelector("#con1").classList.remove("paused");
    document.querySelector("#con2").classList.remove("paused");
    document.querySelector("#con3").classList.remove("paused");
    document.querySelector("#con4").classList.remove("paused");
    document.querySelector("#con5").classList.remove("paused");

    document.querySelector("#sprite1").classList.remove("paused");
    document.querySelector("#sprite2").classList.remove("paused");
    document.querySelector("#sprite3").classList.remove("paused");
    document.querySelector("#sprite4").classList.remove("paused");
    document.querySelector("#sprite5").classList.remove("paused");

    document.querySelector("#con1").addEventListener("click", clickHuman);
    document.querySelector("#con2").addEventListener("click", clickHuman);
    document.querySelector("#con3").addEventListener("click", clickZombie);
    document.querySelector("#con4").addEventListener("click", clickZombie);
    document.querySelector("#con5").addEventListener("click", clickZombie);

    gameIsPaused = false;

    startTimer();
  }
}

function muteSound() {
  if (bgMusic.muted == false) {
    bgMusic.muted = true;
    zombieSound.muted = true;
    humanSound.muted = true;
    gameOverSound.muted = true;
    winSound.muted = true;

    document.querySelector("#mute").classList.remove("soundOn");
    document.querySelector("#mute").classList.add("soundOff");
  } else {
    bgMusic.muted = false;
    zombieSound.muted = false;
    humanSound.muted = false;
    gameOverSound.muted = false;
    winSound.muted = false;

    document.querySelector("#mute").classList.remove("soundOff");
    document.querySelector("#mute").classList.add("soundOn");
  }
}

function clickHuman() {
  humanSound.currentTime = 0;

  humanSound.play();
  humanSound.volume = 0.9;

  lives--;

  this.removeEventListener("click", clickHuman);

  document.querySelector("#life" + lives).classList.remove("redHeart");
  document.querySelector("#life" + lives).classList.add("greyHeart");

  this.classList.add("paused");

  this.firstElementChild.classList.add("fade_out");

  document.querySelector("#game").classList.add("shake");

  this.addEventListener("animationend", restartHuman);

  if (lives == 1) {
    setTimeout(gameOver, 1000);
  }
}

function clickZombie() {
  zombieSound.currentTime = 0;

  zombieSound.play();

  this.removeEventListener("click", clickZombie);

  score++;

  this.classList.add("paused");

  document.querySelector("#number").textContent = score + "/30";

  this.firstElementChild.classList.add("fade_out");

  this.addEventListener("animationend", restartZombie);
}

function restartHuman() {
  this.removeEventListener("animationend", restartHuman);

  document.querySelector("#game").classList.remove("shake");

  this.classList.value = "";
  this.offsetHeight;

  this.firstElementChild.classList.remove("fade_out");

  this.addEventListener("click", clickHuman);

  let randPos = Math.floor(Math.random() * 8) + 1;

  this.classList.add("pos" + randPos);
}

function restartZombie() {
  this.removeEventListener("animationend", restartZombie);

  this.classList.value = "";
  this.offsetHeight;

  this.firstElementChild.classList.remove("fade_out");

  this.addEventListener("click", clickZombie);

  let randPos = Math.floor(Math.random() * 8) + 1;

  this.classList.add("pos" + randPos);
}

function newPos() {
  this.classList.value = "";
  this.offsetHeight;

  let randPos = Math.floor(Math.random() * 8) + 1;

  this.classList.add("pos" + randPos);
}

function clean() {
  document.querySelector("#con1").classList.value = "";
  document.querySelector("#con2").classList.value = "";
  document.querySelector("#con3").classList.value = "";
  document.querySelector("#con4").classList.value = "";
  document.querySelector("#con5").classList.value = "";
  document.querySelector("#sprite1").classList.value = "";
  document.querySelector("#sprite2").classList.value = "";
  document.querySelector("#sprite3").classList.value = "";
  document.querySelector("#sprite4").classList.value = "";
  document.querySelector("#sprite5").classList.value = "";

  document.querySelector("#time_liquid").classList.value = "";

  document.querySelector("#con1").removeEventListener("click", clickHuman);
  document.querySelector("#con1").removeEventListener("animationiteration", newPos);

  document.querySelector("#con2").removeEventListener("click", clickHuman);
  document.querySelector("#con2").removeEventListener("animationiteration", newPos);

  document.querySelector("#con3").removeEventListener("click", clickZombie);
  document.querySelector("#con3").removeEventListener("animationiteration", newPos);

  document.querySelector("#con4").removeEventListener("click", clickZombie);
  document.querySelector("#con4").removeEventListener("animationiteration", newPos);

  document.querySelector("#con5").removeEventListener("click", clickZombie);
  document.querySelector("#con5").removeEventListener("animationiteration", newPos);
}

function gameOver() {
  clearTimeout(timeTracker);

  if (gameHasEnded == false) {
    bgMusic.pause();
    gameOverSound.play();

    clean();
    addEndScreen();

    document.querySelector("#game_over").classList.remove("hidden");

    document.querySelector("#zombie1_over").classList.remove("hidden");
    document.querySelector("#zombie2_over").classList.remove("hidden");
    document.querySelector("#zombie1_over").classList.add("dance1");
    document.querySelector("#zombie2_over").classList.add("dance1", "delay");

    gameHasEnded = true;
  }
}

function win() {
  clearTimeout(timeTracker);

  if (gameHasEnded == false) {
    bgMusic.pause();
    winSound.play();

    clean();
    addEndScreen();

    document.querySelector("#win").classList.remove("hidden");

    document.querySelector("#human1_win").classList.remove("hidden");
    document.querySelector("#human2_win").classList.remove("hidden");
    document.querySelector("#human1_win").classList.add("dance2");
    document.querySelector("#human2_win").classList.add("dance2");

    gameHasEnded = true;
  }
}

function addEndScreen() {
  document.querySelector("#game_foreground").classList.add("hidden");
  document.querySelector("#pause").classList.add("hidden");
  document.querySelector("#mute").classList.add("hidden");
  document.querySelector("#logo").classList.add("hidden");

  document.querySelector("#home_button").classList.remove("hidden");
  document.querySelector("#home_button").classList.add("move");
  document.querySelector("#home_button").addEventListener("click", start);

  document.querySelector("#restart_button").classList.remove("hidden");
  document.querySelector("#restart_button").classList.add("move");
  document.querySelector("#restart_button").addEventListener("click", restartGame);
}

function startTimer() {
  if (gameIsPaused == false) {
    if (timeLeft == 0) {
      gameOver();
    } else {
      timeTracker = setTimeout(showTime, 100);
    }
  }
}

function showTime() {
  if (timeLeft > 0) {
    deciSeconds--;
    timeLeft = Math.ceil(deciSeconds / 10);

    startTimer();

    if (score == 30) {
      win();
    }
  } else {
    gameOver();
  }
}
