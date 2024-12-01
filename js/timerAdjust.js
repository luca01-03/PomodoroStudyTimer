document.addEventListener('DOMContentLoaded', function() {
    // Reducing timer
    try {
    const workTimerInput = document.getElementById("work-timer");
    const shortBreakInput = document.getElementById("short-break-timer");
    const longBreakInput = document.getElementById("long-break-timer");

    document.querySelectorAll(".number-left").forEach((button) => {
        button.addEventListener("click", function() {
            const input = this.nextElementSibling;
            if (input && input.classList.contains("number-quantity")) {
                console.log(input.value);
            };
        });
    }); 
    } catch (error) {
        console.log("Error: ", error);

    };

    // Adding to timer
    try {
        
        document.querySelectorAll(".number-right").forEach((button) => {
            button.addEventListener("click", function() {
                const input = this.previousElementSibling;
                if (input && input.classList.contains("number-quantity")) {
                    console.log(input.value);
                }
            });
    });
    } catch (error) {
        console.log('error:', error);
    }
});



