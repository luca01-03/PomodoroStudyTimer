const timers = {
  pomodoro: 25,
  longBreak: 15,
  shortBreak: 5,
};

let seconds = 0;
let currentTimerType;
let iID;

// control buttons
const startBtn = document.querySelector("#start");
startBtn.disabled = true;
const pauseBtn = document.querySelector("#pause");
pauseBtn.disabled = true;
const resetBtn = document.querySelector("#reset");

// update displayed time
function updateDisplay() {
  try {
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes < 10) {
      minutesElement.innerText = "0" + minutes;
    } else {
      minutesElement.innerText = minutes;
    }

    if (remainingSeconds === 0) {
      secondsElement.innerText = "00";
    } else if (remainingSeconds < 10) {
      secondsElement.innerText = "0" + remainingSeconds;
    } else {
      secondsElement.innerText = seconds % 60;
    }
  } catch (error) {
    console.error("Can't update display: ", error);
  }
}

// handle timer selection
function setTimer(type) {
  try {
    clearInterval(iID);
    currentTimerType = type;
    seconds = timers[currentTimerType] * 60;
    updateDisplay();
    startBtn.removeAttribute("disabled");
  } catch {
    console.error("Can't set timer: ", error);
  }
}

// start button starts or resumes timer
function startTimer() {
  try {
    iID = setInterval(() => {
      seconds--;
      if (seconds === -1) clearInterval(iID);
      else updateDisplay();
    }, 1000);
    startBtn.disabled = true;
    pauseBtn.removeAttribute("disabled");
  } catch {
    console.log("Can't start or resumer timer: ", error);
  }
}

// pause button
function pauseTimer() {
  try {
    clearInterval(iID);
    startBtn.removeAttribute("disabled");
    pauseBtn.disabled = true;
  } catch {
    console.log("Can't pause timer: ", error);
  }
}

function resetTimer() {
  try {
    clearInterval(iID);
    seconds = 0;
    updateDisplay();
  } catch {
    console.error("Can't reset timer: ", error);
  }
}

// click handlers for timer buttons and control buttons
document.querySelectorAll("#timers button").forEach((button) => {
  button.addEventListener("click", () => setTimer(button.id));
});
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

