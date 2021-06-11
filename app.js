`use strict`;
const puppeter = require("puppeteer-core");

const { log } = console;

// OBJETO QUE REPRESENTA LOS ID DEL FORMULARIO
let idSurvey = [
  {
    id: ".0.0:$pages.$Frame0.0.1.0.0.1.$question57823451.0.3.0.$singleChoice1",
  },
  {
    id: ".0.0:$pages.$Frame0.0.1.0.0.1.$question57823446.0.3.0.$singleChoice2",
  },
  {
    id: ".0.0:$pages.$Frame0.0.1.0.0.1.$question57823445.0.3.0.$singleChoice0",
  },
  {
    id: ".0.0:$pages.$Frame0.0.1.0.0.1.$question57823448.0.3.0.$singleChoice1",
  },
  {
    id: ".0.0:$pages.$Frame0.0.1.0.0.1.$question57823450.0.3.0.$singleChoice1",
  },
  {
    id: ".0.0:$pages.$Frame0.0.1.0.0.1.$question57823444.0.3.0.$singleChoice1",
  },
  {
    id: ".0.0:$pages.$Frame0.0.1.0.0.1.$question57823444.0.3.0.$singleChoice0",
  },
];

(async () => {
  const browser = await puppeter.launch({
    headless: false,
    executablePath: "/usr/bin/google-chrome-stable",
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto("https://www.survio.com/survey/d/N1M8B4I8V6N7X8E8O", {
    waitUntil: "networkidle2",
  });
  
  await page.click("div.start");

  // RECORREMOS EL ARRAY DECLARADO ARRIBA Y AGREGAMOS VALOR AL FORMULARIO
  for (let index = 0; index < idSurvey.length; index++) {
    await page.click(`[data-reactid="${idSurvey[index].id}"]`);
  }

  await page.type(
    "#text57823449",
    "Aprovechando el talento de las personas",
    3000
  );

  await page.click(`[data-reactid=".0.0:$pages.$Frame0.0.1.0.0.2.0.0.0.1.1"]`);
  await page.waitForTimeout(5000);

  let messageSuccess = await page.evaluate(() => {
    let message1 = document.querySelector(".free2-headline");
    let message2 = document.querySelector(".thank-you>h1");

    return message1 ? message1.textContent : message2.textContent;
  });

  await page.screenshot({ path: "images/success-survey.png" });

  console.log(messageSuccess);
})();
