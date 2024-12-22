import { JSDOM } from 'jsdom';

describe('Adjust theme feature', () => {
  let document, themeOptions;

  beforeEach((done) => {
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Theme Adjustment Test</title>
      </head>
      <body>
        <input type="radio" name="option" id="salad days">
        <input type="radio" name="option" id="night-time-countryside">
        <input type="radio" name="option" id="timeless-togetherness">
        <input type="radio" name="option" id="study-girl">
        <script>
          document.addEventListener("DOMContentLoaded", () => {
            const themeOptions = document.querySelectorAll("input[name='option']");
            document.body.classList.add("study-girl-theme");

            themeOptions.forEach((option) => {
              option.addEventListener("click", () => {
                document.body.className = '';
                switch(option.id) {
                  case "salad days":
                    document.body.classList.add("salad-days-theme");
                    break;
                  case "night-time-countryside":
                    document.body.classList.add("night-time-countryside-theme");
                    break;
                  case "timeless-togetherness":
                    document.body.classList.add("timeless-togetherness-theme");
                    break;
                  default: 
                    document.body.classList.add("study-girl-theme");
                    break;
                }
              });
            });
          });
        </script>
      </body>
      </html>
    `, { runScripts: "dangerously", resources: "usable" });

    document = dom.window.document;
    dom.window.onload = () => {
      themeOptions = document.querySelectorAll("input[name='option']");
      done();
    };
  });

  test('should add study girlclass to dom on load as default', () => {
    expect(document.body.classList.contains('study-girl-theme')).toBe(true);
  });

  test('should change to salad days on click', () => {
    const saladDaysOption = document.getElementById('salad days');
    saladDaysOption.click();
    expect(document.body.classList.contains('salad-days-theme')).toBe(true);
  });

  test('should change to night time countryside theme on click ', () => {
    const nightTimeCountrysideOption = document.getElementById('night-time-countryside');
    nightTimeCountrysideOption.click();
    expect(document.body.classList.contains('night-time-countryside-theme')).toBe(true);
  });

  test('should change to timeless togetherness on clickk', () => {
    const timelessTogethernessOption = document.getElementById('timeless-togetherness');
    timelessTogethernessOption.click();
    expect(document.body.classList.contains('timeless-togetherness-theme')).toBe(true);
  });

  test('should change to stuy girl theme on click', () => {
    const studyGirlOption = document.getElementById('study-girl');
    studyGirlOption.click();
    expect(document.body.classList.contains('study-girl-theme')).toBe(true);
  });
});