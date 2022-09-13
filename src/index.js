const { chromium } = require('playwright');
var prompt = require("prompt");
const displayImage = require("display-image");

const data = [];


(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('http://sistemas10.minedu.gob.pe/siagie3/Login.aspx');
  await page.locator('#imgCaptcha').screenshot({ path: `./output/capcha/lastCaptcha.png` });
  await displayImage.fromFile("./output/capcha/lastCaptcha.png").then(image => {
    console.log(image)
  })
  
  //iniciop sesion
  await prompt.start();
  const userName = '07524459';
  const password = 'kOb4Kq?]ygX&';
  const {segCaptcha} = await prompt.get(['segCaptcha']);
  await page.fill('input[id="txtUsuario"]', userName);
  await page.fill('input[id="txtFraseSecreta"]',  password);
  await page.fill('input[id="txtCaptcha"]',segCaptcha.toUpperCase());
  await page.click('.btn-enviar');

  //entramos al sistema
  page.on('modal-content', dialog => dialog.dismiss())
  await page.locator('#btnCerrarModalAutorizacion').click();

  //tomamos captura de pantalla
  await page.screenshot({ path: `./output/screenShot/${Date.now().toString(36)}.png` });
  await browser.close()
})()






