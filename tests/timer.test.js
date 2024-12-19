import { updateDisplay, setTimer, startTimer, pauseTimer, resetTimer, timers, initDOMElements, getSeconds, setSeconds } from "../js/timer";

describe("Pomodoro Timer", () => {
  let startBtn, pauseBtn, resetBtn, pomodoroBtn, longBreakBtn, shortBreakBtn, minutesElement, secondsElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="mainContainer">
        <div id="timers" class="timerButtons">
          <button id="pomodoro" class="button" type="button">pomodoro</button>
          <button id="longBreak" class="button" type="button">long break</button>
          <button id="shortBreak" class="button" type="button">short break</button>
        </div>
        <div id="timer-display">
          <span id="minutes" class="mainTimer">00</span>
          <span class="mainTimer">:</span>
          <span id="seconds" class="mainTimer">00</span>
        </div>
        <div>
          <button id="start" class="button" type="button" disabled>start</button>
          <button id="pause" class="button" type="button" disabled>pause</button>
          <button id="reset" class="button" type="button">reset</button>
        </div>
      </div>
    `;

    // activate the button els and add listeners
    initDOMElements();

    startBtn = document.getElementById("start");
    pauseBtn = document.getElementById("pause");
    resetBtn = document.getElementById("reset");
    pomodoroBtn = document.getElementById("pomodoro");
    longBreakBtn = document.getElementById("longBreak");
    shortBreakBtn = document.getElementById("shortBreak");
    minutesElement = document.getElementById("minutes");
    secondsElement = document.getElementById("seconds");
  });

  test("should update display", () => {
    setSeconds(125); 
    updateDisplay();
    expect(minutesElement.innerText).toBe("02");
    expect(secondsElement.innerText).toBe("05");
  });

  test("should set timer", () => {
    setTimer("shortBreak");
    expect(getSeconds()).toBe(timers.shortBreak * 60);
    expect(startBtn.disabled).toBe(false);
  });

  test("should start timer", () => {
    setTimer("pomodoro");
    startTimer();
    expect(startBtn.disabled).toBe(true);
    expect(pauseBtn.disabled).toBe(false);
  });

  test("should pause timer", () => {
    setTimer("pomodoro");
    startTimer();
    pauseTimer();
    expect(startBtn.disabled).toBe(false);
    expect(pauseBtn.disabled).toBe(true);
  });

  test("should reset timer", () => {
    setTimer("pomodoro");
    startTimer();
    resetTimer();
    expect(getSeconds()).toBe(0);
    expect(minutesElement.innerText).toBe("00");
    expect(secondsElement.innerText).toBe("00");
  });
});