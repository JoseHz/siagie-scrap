const { chromium } = require('playwright');
var prompt = require("prompt");
const displayImage = require("display-image");

const data = [];


(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('http://sistemas10.minedu.gob.pe/siagie3/Login.aspx');
  await page.locator('#imgCaptcha').screenshot({ path: `./siagie.png` });
  await displayImage.fromFile("siagie.png").then(image => {
    console.log(image)
  })
  
  await prompt.start();
  const {userName, password, segCaptcha} = await prompt.get(['userName', 'password', 'segCaptcha']);
  await console.log(userName, password, segCaptcha);  
  
  await console.log(data);
  await page.fill('input[id="txtUsuario"]', userName);
  await page.fill('input[id="txtFraseSecreta"]',  password);
  await page.fill('input[id="txtCaptcha"]',segCaptcha.toUpperCase());
  await page.click('.btn-enviar');
  await page.screenshot({ path: `./1.png` });
  await page.screenshot({ path: `./2.png` });
  await page.screenshot({ path: `./3.png` });
  await page.screenshot({ path: `./4.png` });
  await page.screenshot({ path: `./5.png` });
  await browser.close()
})()






