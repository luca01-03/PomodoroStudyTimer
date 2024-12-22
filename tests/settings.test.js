import { JSDOM } from 'jsdom';

describe('Settings functionality', () => {
  let document, settingsContainer, timerContainer, adjustTimerContainer, dropdownContainer, errorFlagContainer, errorCloseBtn;
  let settingsBtn, closeBtn, themeBtn, timerBtn;

  beforeEach((done) => {
    // Adding event listeners inline fixes problem had earlier where listeners weren't being inited
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Settings Test</title>
      </head>
      <body>
        <div id="settings-container" style="visibility: hidden;"></div>
        <div id="timer-settings-selection" style="visibility: hidden;"></div>
        <div id="adjust-timer-container" style="visibility: hidden;"></div>
        <div id="dropdown-container" style="visibility: hidden; display: none;"></div>
        <div id="error" style="visibility: hidden; display: block;">
          <div class="error-close"></div>
        </div>
        <button id="settings">Settings</button>
        <button id="button-close">Close</button>
        <button id="theme-settings">Theme</button>
        <button id="timer-settings">Timer</button>
        <script>
          document.addEventListener("DOMContentLoaded", () => {
            try {
              const settingsContainer = document.getElementById("settings-container");
              const timerContainer = document.getElementById("timer-settings-selection");
              const adjustTimerContainer = document.getElementById("adjust-timer-container");
              const dropdownContainer = document.getElementById("dropdown-container");
              const errorFlagContainer = document.getElementById("error");
              const errorCloseBtn = document.querySelector(".error-close");

              const settingsBtn = document.getElementById("settings");
              const closeBtn = document.getElementById("button-close");
              const themeBtn = document.getElementById("theme-settings");
              const timerBtn = document.getElementById("timer-settings");

              settingsBtn.addEventListener("click", () => {
                settingsContainer.style.visibility = "visible";
                timerContainer.style.visibility = "visible";
                adjustTimerContainer.style.visibility = "hidden";
                errorFlagContainer.style.visibility = "hidden";
                dropdownContainer.style.visibility = "hidden";
                dropdownContainer.style.display = 'block';
              });

              closeBtn.addEventListener("click", () => {
                settingsContainer.style.visibility = "hidden";
                timerContainer.style.visibility = "hidden";
                adjustTimerContainer.style.visibility = "hidden";
                dropdownContainer.style.display = "none";
                errorFlagContainer.style.visibility = "hidden";
                errorFlagContainer.style.display = "block";
              });

              themeBtn.addEventListener("click", () => {
                timerContainer.style.visibility = "hidden";
                adjustTimerContainer.style.visibility = "hidden";
                dropdownContainer.style.display = "block";
                dropdownContainer.style.visibility = "visible";
              });

              timerBtn.addEventListener("click", () => {
                timerContainer.style.visibility = "visible";
                adjustTimerContainer.style.visibility = "hidden";
                dropdownContainer.style.visibility = "hidden";
                dropdownContainer.style.display = "none";
              });

              errorCloseBtn.addEventListener("click", () => {
                errorFlagContainer.style.visibility = "hidden";
              });
            } catch (error) {
              console.error("Error: ", error);
            }
          });
        </script>
      </body>
      </html>
    `, { runScripts: "dangerously", resources: "usable" });

    document = dom.window.document;
    dom.window.onload = () => {
      settingsContainer = document.getElementById('settings-container');
      timerContainer = document.getElementById('timer-settings-selection');
      adjustTimerContainer = document.getElementById('adjust-timer-container');
      dropdownContainer = document.getElementById('dropdown-container');
      errorFlagContainer = document.getElementById('error');
      errorCloseBtn = document.querySelector('.error-close');

      settingsBtn = document.getElementById('settings');
      closeBtn = document.getElementById('button-close');
      themeBtn = document.getElementById('theme-settings');
      timerBtn = document.getElementById('timer-settings');
      done();
    };
  });

  test('should show settings container when settings btn is clicked', () => {
    settingsBtn.click();
    expect(settingsContainer.style.visibility).toBe('visible');
    expect(timerContainer.style.visibility).toBe('visible');
    expect(adjustTimerContainer.style.visibility).toBe('hidden');
    expect(errorFlagContainer.style.visibility).toBe('hidden');
    expect(dropdownContainer.style.visibility).toBe('hidden');
    expect(dropdownContainer.style.display).toBe('block');
  });

  test('should hide settings container when close btn is clicked', () => {
    closeBtn.click();
    expect(settingsContainer.style.visibility).toBe('hidden');
    expect(timerContainer.style.visibility).toBe('hidden');
    expect(adjustTimerContainer.style.visibility).toBe('hidden');
    expect(dropdownContainer.style.display).toBe('none');
    expect(errorFlagContainer.style.visibility).toBe('hidden');
    expect(errorFlagContainer.style.display).toBe('block');
  });

  test('should show dropdown when theme btn is clicked', () => {
    themeBtn.click();
    expect(timerContainer.style.visibility).toBe('hidden');
    expect(adjustTimerContainer.style.visibility).toBe('hidden');
    expect(dropdownContainer.style.display).toBe('block');
    expect(dropdownContainer.style.visibility).toBe('visible');
  });

  test('should show adjust timer setting when timer btn is clicked', () => {
    timerBtn.click();
    expect(timerContainer.style.visibility).toBe('visible');
    expect(adjustTimerContainer.style.visibility).toBe('hidden');
    expect(dropdownContainer.style.visibility).toBe('hidden');
    expect(dropdownContainer.style.display).toBe('none');
  });

  test('should hide error flag when error close btn is clicked', () => {
    errorCloseBtn.click();
    expect(errorFlagContainer.style.visibility).toBe('hidden');
  });
});