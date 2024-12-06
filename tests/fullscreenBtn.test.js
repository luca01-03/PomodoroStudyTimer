const { JSDOM } = require('jsdom');

describe('Fullscreen Button', () => {
  let document;
  let fullscreenBtn;

  beforeEach((done) => {
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pomodoro Timer</title>
      </head>
      <body>
        <button id="fullscreen-btn" class="fullscreen-btn" type="button">
          <svg viewBox="0 0 448 512" height="1em" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"></path>
          </svg>
          <span class="tooltip">Fullscreen</span>
        </button>
        <script>
          document.getElementById("fullscreen-btn").addEventListener("click", function () {
            if (!document.fullscreenElement) {
              const elem = document.documentElement;
              if (elem.requestFullscreen) {
                elem.requestFullscreen();
              } else if (elem.mozRequestFullScreen) { 
                elem.mozRequestFullScreen();
              } else if (elem.webkitRequestFullscreen) { 
                elem.webkitRequestFullscreen();
              } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
              }
            } else {
              if (document.exitFullscreen) {
                document.exitFullscreen();
              } else if (document.mozCancelFullScreen) { 
                document.mozCancelFullScreen();
              } else if (document.webkitExitFullscreen) { 
                document.webkitExitFullscreen();
              } else if (document.msExitFullscreen) { 
                document.msExitFullscreen();
              }
            }
          });
        </script>
      </body>
      </html>
    `, { runScripts: "dangerously", resources: "usable" });

    document = dom.window.document;
    dom.window.onload = () => {
      fullscreenBtn = document.getElementById('fullscreen-btn');
      done();
    };
  });

  test('should request fullscreen when not in fullscreen mode', () => {
    document.fullscreenElement = null;
    const requestFullscreenMock = jest.fn();
    document.documentElement.requestFullscreen = requestFullscreenMock;

    fullscreenBtn.click();

    expect(requestFullscreenMock).toHaveBeenCalled();
  });

  test('should exit fullscreen when in fullscreen mode', () => {
    document.fullscreenElement = document.documentElement;
    const exitFullscreenMock = jest.fn();
    document.exitFullscreen = exitFullscreenMock;

    fullscreenBtn.click();

    expect(exitFullscreenMock).toHaveBeenCalled();
  });
});