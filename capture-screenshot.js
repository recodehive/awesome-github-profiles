const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeScreenshot(username) {
  const url = `https://github.com/${username}`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  await page.setViewport({ width: 1280, height: 800 });
  const screenshotPath = path.join('screenshots', `${username}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  await browser.close();
  return screenshotPath;
}

async function main() {
  const username = process.argv[2];
  if (!username) {
    console.error('No username provided');
    process.exit(1);
  }
  
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }

  const screenshotPath = await takeScreenshot(username);
  console.log(`Screenshot taken for ${username}: ${screenshotPath}`);
}

main();
