// single source of information: id of buttons and minute values
const timers = {
  pomodoro: 25,
  longBreak: 15,
  shortBreak: 5
}

// global variables
let seconds = 0; // only count seconds; conversion only happens when displaying time
let currentTimerType;
let iID; // interval ID

// control buttons
const startBtn = document.querySelector('#start');
startBtn.disabled = "true";
const pauseBtn = document.querySelector('#pause');
pauseBtn.disabled = "true";

// update displayed time
function updateDisplay() {
  document.getElementById('minutes').innerText = Math.floor(seconds / 60);

  if (seconds % 60 == 0) {
    document.getElementById('seconds').innerText = '00';
}	else {
    document.getElementById('seconds').innerText = seconds % 60;
    }
  }

// handle timer selection
function setTimer(type) {
  clearInterval(iID);
  currentTimerType = type;
  seconds = timers[currentTimerType] * 60;
  updateDisplay();
  startBtn.removeAttribute('disabled');
}

// start button starts or resumes timer
function startTimer() {
  iID = setInterval(() => {
    seconds--;
    if (seconds === -1) clearInterval(iID);
    else updateDisplay();
  }, 1000);
  startBtn.disabled = "true";
  pauseBtn.removeAttribute('disabled');
}

// pause button
function pauseTimer() {
  clearInterval(iID);
  startBtn.removeAttribute('disabled');
  pauseBtn.disabled = "true";
}

// assign click handlers for timer buttons and control buttons
document.querySelectorAll('#timers button').forEach(button => {
  button.addEventListener('click', () => setTimer(button.id));
});
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
