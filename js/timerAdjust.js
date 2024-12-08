import { updateDisplay, timers, setTimer, currentTimerType } from "./timer.js";

document.addEventListener('DOMContentLoaded', function() {

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
        workTimerInput.value = timers.pomodoro;
        shortBreakInput.value = timers.shortBreak;
        longBreakInput.value = timers.longBreak;
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
    closeBtn.addEventListener("click", function(event) {
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
        button.addEventListener("click", function() {
            try {
                const input = this.nextElementSibling;
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
        button.addEventListener("click", function() {
            try {
                const input = this.previousElementSibling;
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
    saveChangesBtn.addEventListener("click", function() {
        try {
            if (validateInputs()) {
                timers.pomodoro = parseInt(workTimerInput.value, 10);
                timers.shortBreak = parseInt(shortBreakInput.value, 10);
                timers.longBreak = parseInt(longBreakInput.value, 10);
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
    cancelChangesBtn.addEventListener("click", function() {
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
        input.addEventListener("input", function() {
            adjustTimerContainer.style.visibility = "visible";
        })});
    
});