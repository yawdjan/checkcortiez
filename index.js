// import puppeteer from 'puppeteer-core';
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
// add stealth plugin and use defaults (all evasion techniques)
puppeteer.use(StealthPlugin())
import { x_cc, simple_card_site } from './CortF.js';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  // executablePath: '/usr/bin/chromium', // or chromium-browser
  // userDataDir: '	C:/Users/USER/AppData/Local/Google/Chrome/User Data',
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

const page = await browser.newPage()
await page.goto('https://bot.sannysoft.com')
await page.screenshot({ path: 'testresult.png', fullPage: true })

const page2 = await browser.newPage();

await page2.goto(simple_card_site,
  {
    waitUntil: 'load',
  }
);
let results;
let keepGoing = true;
//for delivery address
//don't edit page 2 but chnage 'loto kniit' to the name of product or anything close to product name, created a regex similarity function for it so you can't get it wrong 
const site1 = new x_cc(page2, 'loto knit', 'Yaw', 'Danquah', 'Visa', '4660395501239294', '370', '11', '25', '43 Chester Street', 'CV14DH', 'Coventry', 'United Kingdom', '07552149297');
let startTime = Date.now();
const maxDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
let bothErrors = false;

// while (keepGoing && (Date.now() - startTime < maxDuration)) {
  try {
    // also change find product to eiuther 4 or 3 letters of the product name then run it
    await site1.findProducts('loto');
    bothErrors = false; // Reset the flag if this try succeeds
  } catch (error) {
    // no search button found
    console.error("Error in findProducts:", error);
    bothErrors = true;
  }
  try {
    results = await site1.getProducts();
    bothErrors = false; // Reset the flag if this try succeeds
  } catch (error) {
    //product not on page yet
    console.error("Error in getProducts:", error);
    bothErrors = true;
  }

  if (!bothErrors) {
    keepGoing = false; // Exit loop if no errors occurred in either try block
  }
// }
// while (true) {
//   if (!keepGoing) {
    // continue; // Exit the loop if no errors occurred in either try block
  // } else {
    await site1.goToCheckout(results);
    await site1.fill();
    await page2.waitForNavigation({ waitUntil: 'load' });
    const continueButtonXPath2 = '/html/body/div[1]/div[1]/div/div[1]/div/div[1]/div/main/div/div/div/div/div[2]/form/div[1]/div/div/div/div/div[2]/div[1]/button';
    await page2.click(`xpath=${continueButtonXPath2}`);
    await page2.waitForNavigation({ waitUntil: 'load' });
    //for billing address and checkout details
    await site1.fillCard('Yaw', 'Danquah', 'Ghana', 'B2515 Liberian Road', 'Accra', '000000');
    await site1.fill2('Yaw', 'Danquah', 'Ghana', 'B2515 Liberian Road', 'Accra', '000000');
    await page2.screenshot({ path: 'purchase.png', fullPage: true })
    // break;
//   }
// }// the following code will only run after the while loop has finished
// // await browser.close();