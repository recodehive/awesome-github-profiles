const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeScreenshot(username) {
  const url = `https://github.com/${username}`;
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/chromium-browser', // Explicitly set the path to Chromium
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });
    const screenshotPath = path.join(__dirname, '../../screenshots', `${username}.png`);

    // Get the full height of the page
    const bodyHandle = await page.$('body');
    const { height } = await bodyHandle.boundingBox();
    await bodyHandle.dispose();

    // Set viewport to full height
    await page.setViewport({
      width: 1280,
      height: Math.ceil(height),
    });

    // Capture screenshot
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

  const screenshotDir = path.resolve(__dirname, '../../screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  try {
    const screenshotPath = await takeScreenshot(username);
    console.log(`Screenshot taken for ${username}: ${screenshotPath}`);
  } catch (error) {
    console.error(`Error taking screenshot for ${username}:`, error);
  }
}

main();
