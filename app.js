let timer = 60;
let score = 0;
let new_hit = 0;
let clock_sound = document.querySelector('#clock-tik');

function restart() {
  timer = 60;
  score = 0;
  new_hit = 0;
  document.querySelector('#score-value').innerText = score;
  setTimeout(function () {
    clock_sound.play();
  }, 70);
  create_bubble();
  update_hit();
  run_timer();
}

setTimeout(function () {
  clock_sound.play();
}, 70);

function update_score() {
  score += 10;
  document.querySelector('#score-value').innerText = score;
}

function update_hit() {
  new_hit = Math.floor(Math.random() * 10);
  document.querySelector('#hit-value').innerText = new_hit;
  if (timer != 0 && timer != 60)
    document.querySelector('#update-hit').play();
}

function create_bubble() {
  let temp_div = '';
  for (let i = 1; i <= 102; i++) {
    let temp_num = Math.floor(Math.random() * 10);
    temp_div += `<div class="bubble">${temp_num}</div>`
  }
  document.querySelector('#bottom').innerHTML = temp_div;
};

function run_timer() {
  document.querySelector('#timer-value').innerText = timer;
  let timer_interval = setInterval(function () {
    if (timer > 0) {
      timer--;
      document.querySelector('#timer-value').innerText = timer;
    } else {
      clearInterval(timer_interval);
      document.querySelector('#bottom').classList.add('bottom-game-over');
      document.querySelector('#bottom').innerHTML = `<h1>GAME OVER<hr>Score : ${score}<br><button id="restart"><h2>REPLAY</h2></button>`;
      document.querySelector('#hit-value').innerText = '-';
      document.querySelector('#timer-value').innerText = '-';
      document.querySelector('#score-value').innerText = '-';
      document.querySelector('#game-over').play();
      document.querySelector('#restart').addEventListener('click', function () {
        restart();
      });
    }
  }, 1000);
}

document.querySelector('#bottom').addEventListener('click', function (details) {
  let hitted_num = Number(details.target.innerText);
  if (hitted_num === new_hit) {
    update_score();
    update_hit();
    create_bubble();
  }
})

create_bubble();
update_hit();
run_timer();