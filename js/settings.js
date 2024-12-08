document.addEventListener("DOMContentLoaded", function () {
  try {
    const settingsContainer = document.getElementById("settings-container");
    const timerContainer = document.getElementById("timer-settings-selection");
    const adjustTimerContainer = document.getElementById("adjust-timer-container");
    const errorFlagContainer = document.getElementById("error");
    const errorCloseBtn = document.querySelector(".error-close");

    const settingsBtn = document.getElementById("settings");
    const closeBtn = document.getElementById("button-close");
    const themeBtn = document.getElementById("theme-settings");
    const timerBtn = document.getElementById("timer-settings");

    settingsBtn.addEventListener("click", function () {
      settingsContainer.style.visibility = "visible";
      timerContainer.style.visibility = "visible";
      adjustTimerContainer.style.visibility = "hidden";
      errorFlagContainer.style.visibility = "hidden";
    });

    closeBtn.addEventListener("click", function () {
      settingsContainer.style.visibility = "hidden";
      timerContainer.style.visibility = "hidden";
      adjustTimerContainer.style.visibility = "hidden";

    });

    themeBtn.addEventListener("click", function () {
      timerContainer.style.visibility = "hidden";
      adjustTimerContainer.style.visibility = "hidden";

    });

    timerBtn.addEventListener("click", function () {
      timerContainer.style.visibility = "visible";
    });

    errorCloseBtn.addEventListener("click", function () {
      errorFlagContainer.style.visibility = "hidden";
    })
  } catch (error) {
    console.error("Error: ", error);
  }
});
