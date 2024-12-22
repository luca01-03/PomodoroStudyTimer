const timers = {
  pomodoro: 25,
  longBreak: 50,
  shortBreak: 5,
};

let _seconds = 0;
let currentTimerType = "pomodoro";
let iID;

let startBtn, pauseBtn, resetBtn;

function initDOMElements() {
  try {
    startBtn = document.querySelector("#start");
    pauseBtn = document.querySelector("#pause");
    resetBtn = document.querySelector("#reset");

    startBtn.disabled = false;
    pauseBtn.disabled = true;

    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);

    document.querySelectorAll("#timers button").forEach((button) => {
      button.addEventListener("click", () => setTimer(button.id));
    });

    // Initialize the timer to pomodoro on page load
    setTimer("pomodoro");
    document.getElementById("pomodoro").classList.add("active");
  } catch (error) {
    console.error("Error initializing DOM elements:", error);
  }
}

function setTimer(timerType) {
  try {
    currentTimerType = timerType;
    _seconds = timers[timerType] * 60;
    updateDisplay();
    clearInterval(iID);
    iID = null;
    startBtn.disabled = false;
    pauseBtn.disabled = true;

    // Update active button style
    document.querySelectorAll("#timers button").forEach((button) => {
      button.classList.remove("active");
    });
    document.getElementById(timerType).classList.add("active");
  } catch (error) {
    console.error("Error setting timer:", error);
  }
}

function updateDisplay() {
  try {
    const minutes = Math.floor(_seconds / 60);
    const seconds = _seconds % 60;
    document.querySelector("#minutes").textContent = `${minutes < 10 ? '0' : ''}${minutes}`;
    document.querySelector("#seconds").textContent = `${seconds < 10 ? '0' : ''}${seconds}`;
  } catch (error) {
    console.error("Error updating display:", error);
  }
}

function startTimer() {
  try {
    if (iID) return;
    iID = setInterval(() => {
      if (_seconds > 0) {
        _seconds--;
        updateDisplay();
      } else {
        clearInterval(iID);
        iID = null;
      }
    }, 1000);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
  } catch (error) {
    console.error("Error starting timer:", error);
  }
}

function pauseTimer() {
  try {
    clearInterval(iID);
    iID = null;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  } catch (error) {
    console.error("Error pausing timer:", error);
  }
}

function resetTimer() {
  try {
    clearInterval(iID);
    iID = null;
    _seconds = timers[currentTimerType] * 60;
    updateDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  } catch (error) {
    console.error("Error resetting timer:", error);
  }
}

document.addEventListener("DOMContentLoaded", initDOMElements);

export { updateDisplay, timers, setTimer, currentTimerType, initDOMElements, startTimer, pauseTimer, resetTimer };