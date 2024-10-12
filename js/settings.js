document.getElementById("settings").addEventListener("click", settings);
document.getElementById("button-close").addEventListener("click", closeSettings);

const containerEl = document.getElementById("settings-container");

function settings() {
  containerEl.style.visibility = "visible";
}

function closeSettings() {
    containerEl.style.visibility = "hidden";
}