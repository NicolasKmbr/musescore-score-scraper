import puppeteer from "puppeteer";
// Or import puppeteer from 'puppeteer-core';

// Get the URL from command line arguments
const args = process.argv.slice(2);
const url = args[0];

// Check if URL is provided
if (!url) {
  console.error("Please provide a URL as a command line argument.");
  console.log("Usage: node main.js <URL>");
  console.log("Example: node main.js https://developer.chrome.com/");
  process.exit(1);
}

// Validate URL format
let targetUrl;
try {
  targetUrl = new URL(url);
} catch (error) {
  console.error("Invalid URL provided:", url);
  console.log(
    "Please provide a valid URL including the protocol (http:// or https://)"
  );
  process.exit(1);
}

console.log(`Navigating to: ${targetUrl.href}`);

// TODO: Add Captcha handling if needed (User Agents)

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto(targetUrl.href, { waitUntil: "load" });

// Set screen size.
await page.setViewport({ width: 1080, height: 1024 });

// Target img src within div with classes "EPvAl KeW0A"
try {
  // Wait for the div with the specific classes to appear
  await page.waitForSelector("div.EEnGW.F16e6", { timeout: 10000 });

  // Find the image within the div and get its src attribute
  const imgSrc = await page.evaluate(() => {
    const targetDiv = document.querySelector("div.EEnGW.F16e6");
    if (targetDiv) {
      const img = targetDiv.querySelector("img");
      return img ? img.src : null;
    }
    return null;
  });

  if (imgSrc) {
    console.log("Found image source:", imgSrc);
  } else {
    console.log('No image found within the div with classes "EPvAl KeW0A"');
  }
} catch (error) {
  console.error("Error targeting the image:", error.message);
}

await browser.close();
