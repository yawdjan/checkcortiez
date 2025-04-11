import puppeteer from 'puppeteer-core';
import {x_cc, simple_card_site } from './CortF.js';

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium', // or chromium-browser
  headless: false,
  defaultViewport: null,
});


// to check if selector exists 
async function elementExists(page, selector) {
  try {
    const element = await page.$(selector);
    return element !== null;
  } catch (err) {
    return false;
  }
}

const page2 = await browser.newPage();

await page2.goto( simple_card_site,
  {
    waitUntil: 'load',
    timeout: 0 
  }
);

const site1 = new x_cc(page2, 'loto knit','Yaw','Danquah','Visa','1234567812345678','123','12','25','B2515 LIberian Rd','000000','Accra','United Kingdom','07552149297');
await site1.findProducts('lotto');
const results = await site1.getProducts();
await site1.goToCheckout(results);
await site1.fill();
// await browser.close();