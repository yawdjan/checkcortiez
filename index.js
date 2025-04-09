import puppeteer from 'puppeteer-core';
import {x_cc, simple_card_site } from './CortF.js';

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium', // or chromium-browser
  headless: false,
  defaultViewport: null,
});

const page = await browser.newPage();

// to check if selector exists 
async function elementExists(page, selector) {
  try {
    const element = await page.$(selector);
    return element !== null;
  } catch (err) {
    return false;
  }
}

// Navigate the page to a URL.
// await page.goto('https://www.amazon.co.uk/s?k=hp+spectre&ref=nb_sb_noss',
//   {
//     waitUntil: 'domcontentloaded'
//   }
// );

// await page.screenshot({ path: 'example.png'});

// const cookieAmazon = await elementExists(page, '#sp-cc');
// if (cookieAmazon) {
//   console.log('Cookie banner found!');
//   const cookieBanner = '#sp-cc > div.sp-cc-buttons-container > div > #a-autoid-0 > span > #sp-cc-accept';
//   await page.click(cookieBanner);
//   console.log('cookies accepted');
// } 

// await page.screenshot({ path: 'example1.png'});

//////////////////////////////////////////////

// Set screen size.
// await page.setViewport({width: 1080, height: 1024});

// Type into search box.
// await page.locator('.devsite-search-field').fill('automate beyond recorder');

// Wait and click on first result.
// await page.locator('.devsite-result-item-link').click();

// Locate the full title with a unique string.
// const textSelector = await page
//   .locator('text/Customize and automate')
//   .waitHandle();
// const fullTitle = await textSelector?.evaluate(el => el.textContent);

// Print the full title.
// console.log('The title of this blog post is "%s".', fullTitle);

const page2 = await browser.newPage();

await page2.goto( simple_card_site,
  {
    waitUntil: 'networkidle0',
    timeout: 0 
  }
);

const site1 = new x_cc(page2, 'loto dnim jackets','Yaw','Danquah','Visa','1234567812345678','123','12','25','B2515 LIberian Rd, Accra, Ghana','000000');
await site1.findProducts('lotto');
const results = await site1.getProducts();
await site1.goToCheckout(results);
// await site1.fill();
// await browser.close();