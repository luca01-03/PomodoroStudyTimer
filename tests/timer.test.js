import { initDOMElements, updateDisplay, setTimer, startTimer, pauseTimer, resetTimer } from "../js/timer";

describe('Pomodoro Timer', () => {
  let startBtn, pauseBtn, resetBtn;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="timers">
        <button id="pomodoro">Pomodoro</button>
        <button id="longBreak">Long Break</button>
        <button id="shortBreak">Short Break</button>
      </div>
      <div id="timer-display">
        <span id="minutes">00</span>:<span id="seconds">00</span>
      </div>
      <button id="start">Start</button>
      <button id="pause">Pause</button>
      <button id="reset">Reset</button>
    `;

    // Activate the button elements and add listeners
    initDOMElements();

    startBtn = document.getElementById("start");
    pauseBtn = document.getElementById("pause");
    resetBtn = document.getElementById("reset");
  });

  test('should update display', () => {
    setTimer("pomodoro");
    expect(document.getElementById("minutes").textContent).toBe("25");
    expect(document.getElementById("seconds").textContent).toBe("00");
  });

  test('should set timer', () => {
    setTimer("shortBreak");
    expect(document.getElementById("minutes").textContent).toBe("05");
    expect(document.getElementById("seconds").textContent).toBe("00");
  });

  test('should start timer', () => {
    jest.useFakeTimers();
    setTimer("pomodoro");
    startTimer();
    jest.advanceTimersByTime(1000);
    expect(document.getElementById("minutes").textContent).toBe("24");
    expect(document.getElementById("seconds").textContent).toBe("59");
    jest.useRealTimers();
  });

  test('should pause timer', () => {
    jest.useFakeTimers();
    setTimer("pomodoro");
    startTimer();
    jest.advanceTimersByTime(1000);
    pauseTimer();
    jest.advanceTimersByTime(1000);
    expect(document.getElementById("minutes").textContent).toBe("24");
    expect(document.getElementById("seconds").textContent).toBe("59");
    jest.useRealTimers();
  });

  test('should reset timer', () => {
    jest.useFakeTimers();
    setTimer("pomodoro");
    startTimer();
    jest.advanceTimersByTime(1000);
    resetTimer();
    expect(document.getElementById("minutes").textContent).toBe("25");
    expect(document.getElementById("seconds").textContent).toBe("00");
    jest.useRealTimers();
  });
});