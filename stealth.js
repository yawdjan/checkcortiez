import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

// add stealth plugin and use defaults (all evasion techniques)
puppeteer.use(StealthPlugin())

// puppeteer usage as normal
puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 
    // executablePath: '/usr/bin/chromium', // or chromium-browser
    userDataDir: '	C:/Users/USER/AppData/Local/Google/Chrome/User Data',
    headless: false,
    defaultViewport: null,
  }).then(async browser => {
  console.log('Running tests..')
  const page = await browser.newPage()
  await page.goto('https://bot.sannysoft.com')
//   await page.waitForTimeout(5000)
  await page.screenshot({ path: 'testresult.png', fullPage: true })
  await browser.close()
  console.log(`All done, check the screenshot. ✨`)
})