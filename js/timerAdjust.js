document.addEventListener('DOMContentLoaded', function() {
    const workTimerInput = document.getElementById("work-timer");
    const shortBreakInput = document.getElementById("short-break-timer");
    const longBreakInput = document.getElementById("long-break-timer");
    const closeBtn = document.getElementById("button-close");
    const saveChangesBtn = document.getElementById("save-changes");
    const cancelChangesBtn = document.getElementById("cancel-changes");
    const adjustTimerContainer = document.getElementById("adjust-timer-container");

    const originalTimers = {
        work: workTimerInput.value,
        shortBreak: shortBreakInput.value,
        longBreak: longBreakInput.value
    };

    // validating the users input
    function validateInputs() {
        const workTime = parseInt(workTimerInput.value, 10);
        const shortBreakTime = parseInt(shortBreakInput.value, 10);
        const longBreakTime = parseInt(longBreakInput.value, 10);

        if (isNaN(workTime) || workTime <= 0 || workTime > 60) {
            alert("Work timer must be between 1 and 60 minutes.");
            return false;
        }

        if (isNaN(shortBreakTime) || shortBreakTime <= 0 || shortBreakTime > 60) {
            alert("Short break timer must be between 1 and 60 minutes.");
            return false;
        }

        if (isNaN(longBreakTime) || longBreakTime <= 0 || longBreakTime > 60) {
            alert("Long break timer must be between 1 and 60 minutes.");
            return false;
        }

        if (shortBreakTime >= longBreakTime) {
            alert("Short break timer must be less than long break timer.");
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
                document.getElementById("settings-container").style.visibility = "hidden";
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
                document.getElementById("settings-container").style.visibility = "hidden";
            }
        } catch (error) {
            console.error("Error saving:", error);
        }
    });

    // Cancel changes
    cancelChangesBtn.addEventListener("click", function() {
        try {
            workTimerInput.value = originalTimers.work;
            shortBreakInput.value = originalTimers.shortBreak;
            longBreakInput.value = originalTimers.longBreak;
            adjustTimerContainer.style.visibility = "hidden";
            document.getElementById("settings-container").style.visibility = "hidden";
        } catch (error) {
            console.error("Error cancelling timer:", error);
        }
    });
});