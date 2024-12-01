document.addEventListener("DOMContentLoaded", function () {
  try {
    const settingsContainer = document.getElementById("settings-container");
    const timerContainer = document.getElementById("timer-settings-selection");

    const settingsBtn = document.getElementById("settings");
    const closeBtn = document.getElementById("button-close");
    const themeBtn = document.getElementById("theme-settings");
    const timerBtn = document.getElementById("timer-settings");

    settingsBtn.addEventListener("click", function () {
      settingsContainer.style.visibility = "visible";
      timerContainer.style.visibility = "visible";
    });

    closeBtn.addEventListener("click", function () {
      settingsContainer.style.visibility = "hidden";
      timerContainer.style.visibility = "hidden";
    });

    themeBtn.addEventListener("click", function () {
      timerContainer.style.visibility = "hidden";
    });

    timerBtn.addEventListener("click", function () {
      timerContainer.style.visibility = "visible";
    });
  } catch (error) {
    console.error("Error: ", error);
  }
});
