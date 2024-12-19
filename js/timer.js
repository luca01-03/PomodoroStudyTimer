const timers = {
  pomodoro: 25,
  longBreak: 50,
  shortBreak: 5,
};

// private variable for secs needed for testing
let _seconds = 0;
let currentTimerType = "pomodoro";
let iID;

let startBtn, pauseBtn, resetBtn;


function initDOMElements() {
  startBtn = document.querySelector("#start");
  pauseBtn = document.querySelector("#pause");
  resetBtn = document.querySelector("#reset");

  startBtn.disabled = true;
  pauseBtn.disabled = true;

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);

  document.querySelectorAll("#timers button").forEach((button) => {
    button.addEventListener("click", () => setTimer(button.id));
  });
}

// getter and setter for the secs variable
function getSeconds() {
  return _seconds;
}

function setSeconds(value) {
  _seconds = value;
}

// update displayed time
function updateDisplay() {
  try {
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    const minutes = Math.floor(_seconds / 60);
    const remainingSeconds = _seconds % 60;

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
      secondsElement.innerText = remainingSeconds;
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
    setSeconds(timers[currentTimerType] * 60);
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
      setSeconds(getSeconds() - 1);
      if (getSeconds() === -1) clearInterval(iID);
      else updateDisplay();
    }, 1000);
    startBtn.disabled = true;
    pauseBtn.removeAttribute("disabled");
  } catch {
    console.log("Can't start or resume timer: ", error);
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
    setSeconds(0);
    updateDisplay();
  } catch {
    console.error("Can't reset timer: ", error);
  }
}

export { updateDisplay, timers, setTimer, startTimer, pauseTimer, resetTimer, currentTimerType, initDOMElements, getSeconds, setSeconds };