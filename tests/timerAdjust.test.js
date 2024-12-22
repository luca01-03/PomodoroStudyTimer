import { JSDOM } from 'jsdom';
import { updateDisplay, setTimer, timers, currentTimerType } from "../js/timer";

describe('Timer Adjustment Functionality', () => {
  let document, window, workTimerInput, shortBreakInput, longBreakInput, closeBtn, saveChangesBtn, cancelChangesBtn;
  let adjustTimerContainer, timerContainer, settingsContainer, errorFlag, errorFlagContainer;

  beforeEach((done) => {
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Timer Adjustment Test</title>
      </head>
      <body>
        <div id="settings-container" style="visibility: hidden;"></div>
        <div id="timer-settings-selection" style="visibility: hidden;"></div>
        <div id="adjust-timer-container" style="visibility: hidden;"></div>
        <div id="error" style="visibility: hidden;">
          <div id="error-title"></div>
        </div>
        <input type="number" id="work-timer" class="number-quantity">
        <input type="number" id="short-break-timer" class="number-quantity">
        <input type="number" id="long-break-timer" class="number-quantity">
        <button id="button-close">Close</button>
        <button id="save-changes">Save</button>
        <button id="cancel-changes">Cancel</button>
        <div class="number-left"></div>
        <div class="number-right"></div>
        <script>
          window.timers = ${JSON.stringify(timers)};
          document.addEventListener('DOMContentLoaded', () => {
            const workTimerInput = document.getElementById("work-timer");
            const shortBreakInput = document.getElementById("short-break-timer");
            const longBreakInput = document.getElementById("long-break-timer");
            const closeBtn = document.getElementById("button-close");
            const saveChangesBtn = document.getElementById("save-changes");
            const cancelChangesBtn = document.getElementById("cancel-changes");
            const adjustTimerContainer = document.getElementById("adjust-timer-container");
            const timerContainer = document.getElementById("timer-settings-selection");
            const settingsContainer = document.getElementById("settings-container");

            const errorFlag = document.getElementById("error-title");
            const errorFlagContainer = document.getElementById("error");

            function updateInputFields() {
                workTimerInput.value = window.timers.pomodoro;
                shortBreakInput.value = window.timers.shortBreak;
                longBreakInput.value = window.timers.longBreak;
            }

            // validating the users input
            function validateInputs() {
                const workTime = parseInt(workTimerInput.value, 10);
                const shortBreakTime = parseInt(shortBreakInput.value, 10);
                const longBreakTime = parseInt(longBreakInput.value, 10);

                if (isNaN(workTime) || workTime <= 0 || workTime > 60) {
                    errorFlag.textContent = "Work timer must be between 1 and 60 minutes";
                    errorFlagContainer.style.visibility = "visible";

                    return false;
                }

                if (isNaN(shortBreakTime) || shortBreakTime <= 0 || shortBreakTime > 60) {
                    errorFlag.textContent = "Short break timer must be between 1 and 60 minutes";
                    errorFlagContainer.style.visibility = "visible";
                    return false;
                }

                if (isNaN(longBreakTime) || longBreakTime <= 0 || longBreakTime > 60) {
                    errorFlag.textContent = "Long break timer must be between 1 and 60 minutes";
                    errorFlagContainer.style.visibility = "visible";
                    return false;
                }

                if (shortBreakTime >= longBreakTime) {
                    errorFlag.textContent = "Short break timer must be less than long break timer";
                    errorFlagContainer.style.visibility = "visible";
                    return false;
                }

                return true;
            }

            // close settings
            closeBtn.addEventListener("click", (event) => {
                try {
                    if (!validateInputs()) {
                        event.preventDefault();
                    } else {
                        settingsContainer.style.visibility = "hidden";
                    }
                } catch (error) {
                    console.error("Error closing settings:", error);
                }
            });

            // Reducing timer on click
            document.querySelectorAll(".number-left").forEach((button) => {
                button.addEventListener("click", () => {
                    try {
                        const input = button.nextElementSibling;
                        if (input && input.classList.contains("number-quantity")) {
                            let currentValue = parseInt(input.value, 10);
                            if (!isNaN(currentValue) && currentValue > 1) {
                                input.value = currentValue - 1;
                                adjustTimerContainer.style.visibility = "visible";
                            }
                        }
                    } catch (error) {
                        console.error("Error deincremeneting timer:", error);
                    }
                });
            });

            // Adding to timer on click
            document.querySelectorAll(".number-right").forEach((button) => {
                button.addEventListener("click", () => {
                    try {
                        const input = button.previousElementSibling;
                        if (input && input.classList.contains("number-quantity")) {
                            let currentValue = parseInt(input.value, 10);
                            if (!isNaN(currentValue) && currentValue < 60) {
                                input.value = currentValue + 1;
                                adjustTimerContainer.style.visibility = "visible";
                            }
                        }
                    } catch (error) {
                        console.error("Error incrementing timer:", error);
                    }
                });
            });

            // Save changes 
            saveChangesBtn.addEventListener("click", () => {
                try {
                    if (validateInputs()) {
                        window.timers.pomodoro = parseInt(workTimerInput.value, 10);
                        window.timers.shortBreak = parseInt(shortBreakInput.value, 10);
                        window.timers.longBreak = parseInt(longBreakInput.value, 10);
                        adjustTimerContainer.style.visibility = "hidden";
                        settingsContainer.style.visibility = "hidden";
                        timerContainer.style.visibility = "hidden";
                        updateDisplay();
                        setTimer(currentTimerType);
                        
                    }
                } catch (error) {
                    console.error("Error saving:", error);
                }
            });

            // Cancel changes
            cancelChangesBtn.addEventListener("click", () => {
                try {
                    updateInputFields();
                    adjustTimerContainer.style.visibility = "hidden";
                    settingsContainer.style.visibility = "hidden";
                    timerContainer.style.visibility = "hidden";
                    errorFlagContainer.style.visibility = "hidden";
                } catch (error) {
                    console.error("Error cancelling timer:", error);
                }
            });

            // Implemented this so that the cancel/save btns appear when directly inputting nos
            [workTimerInput, shortBreakInput, longBreakInput].forEach((input) => {
                input.addEventListener("input", () => {
                    adjustTimerContainer.style.visibility = "visible";
                })});
            
            updateInputFields();
          });
        </script>
      </body>
      </html>
    `, { runScripts: "dangerously", resources: "usable" });


    document = dom.window.document;
    window = dom.window;
    dom.window.onload = () => {
      workTimerInput = document.getElementById('work-timer');
      shortBreakInput = document.getElementById('short-break-timer');
      longBreakInput = document.getElementById('long-break-timer');
      closeBtn = document.getElementById('button-close');
      saveChangesBtn = document.getElementById('save-changes');
      cancelChangesBtn = document.getElementById('cancel-changes');
      adjustTimerContainer = document.getElementById('adjust-timer-container');
      timerContainer = document.getElementById('timer-settings-selection');
      settingsContainer = document.getElementById('settings-container');
      errorFlag = document.getElementById('error-title');
      errorFlagContainer = document.getElementById('error');
      done();
    };
  });

  test('should update input fields with timer values on load', () => {
    expect(workTimerInput.value).toBe(timers.pomodoro.toString());
    expect(shortBreakInput.value).toBe(timers.shortBreak.toString());
    expect(longBreakInput.value).toBe(timers.longBreak.toString());
  });

  test('should show error if work timer input is invalid', () => {
    workTimerInput.value = '0';
    closeBtn.click();
    expect(errorFlag.textContent).toBe('Work timer must be between 1 and 60 minutes');
    expect(errorFlagContainer.style.visibility).toBe('visible');
  });

  test('should show error if short break timer input is invalid', () => {
    shortBreakInput.value = '0';
    closeBtn.click();
    expect(errorFlag.textContent).toBe('Short break timer must be between 1 and 60 minutes');
    expect(errorFlagContainer.style.visibility).toBe('visible');
  });

  test('should show error if long break timer input is invalid', () => {
    longBreakInput.value = '0';
    closeBtn.click();
    expect(errorFlag.textContent).toBe('Long break timer must be between 1 and 60 minutes');
    expect(errorFlagContainer.style.visibility).toBe('visible');
  });

  test('should show error if short break timer is greater than or equal to long break timer', () => {
    shortBreakInput.value = '30';
    longBreakInput.value = '20';
    closeBtn.click();
    expect(errorFlag.textContent).toBe('Short break timer must be less than long break timer');
    expect(errorFlagContainer.style.visibility).toBe('visible');
  });

  test('should save changes and update timers', () => {
    workTimerInput.value = '25';
    shortBreakInput.value = '5';
    longBreakInput.value = '15';
    saveChangesBtn.click();
    expect(window.timers.pomodoro).toBe(25);
    expect(window.timers.shortBreak).toBe(5);
    expect(window.timers.longBreak).toBe(15);
    expect(adjustTimerContainer.style.visibility).toBe('hidden');
    expect(settingsContainer.style.visibility).toBe('hidden');
    expect(timerContainer.style.visibility).toBe('hidden');
  });

  test('should cancel changes and reset input fields', () => {
    workTimerInput.value = '25';
    shortBreakInput.value = '5';
    longBreakInput.value = '15';
    cancelChangesBtn.click();
    expect(workTimerInput.value).toBe(window.timers.pomodoro.toString());
    expect(shortBreakInput.value).toBe(window.timers.shortBreak.toString());
    expect(longBreakInput.value).toBe(window.timers.longBreak.toString());
    expect(adjustTimerContainer.style.visibility).toBe('hidden');
    expect(settingsContainer.style.visibility).toBe('hidden');
    expect(timerContainer.style.visibility).toBe('hidden');
    expect(errorFlagContainer.style.visibility).toBe('hidden');
  });
});