const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

async function takeScreenshot(username) {
  const url = `https://github.com/${username}`;
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/google-chrome-stable', // Path to Chrome executable
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.setViewport({ width: 1280, height: 800 });
    const screenshotPath = path.join('screenshots', `${username}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    await browser.close();
    return screenshotPath;
  } catch (error) {
    await browser.close();
    throw error;
  }
}

async function main() {
  const username = process.argv[2];
  if (!username) {
    console.error('No username provided');
    process.exit(1);
  }

  const screenshotDir = path.resolve(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }

  try {
    const screenshotPath = await takeScreenshot(username);
    console.log(`Screenshot taken for ${username}: ${screenshotPath}`);
  } catch (error) {
    console.error(`Error taking screenshot for ${username}:`, error);
  }
}

main();
