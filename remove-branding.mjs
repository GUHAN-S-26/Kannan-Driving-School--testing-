import fs from 'fs';
import path from 'path';

const directoryPath = 'd:\\Car Driving School\\cloned-site';

function removeBranding(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove the "buy-now" block
  const buyNowRegex = /<div class="buy-now">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
  content = content.replace(buyNowRegex, '');

  // Remove the Webflow badge link
  const webflowBadgeRegex = /<a href="https:\/\/webflow\.com\/\?utm_campaign=brandjs"[\s\S]*?<\/a>/g;
  content = content.replace(webflowBadgeRegex, '');

  fs.writeFileSync(filePath, content, 'utf8');
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (filePath.endsWith('.html')) {
      console.log(`Processing: ${filePath}`);
      removeBranding(filePath);
    }
  });
}

console.log('Starting branding removal process...');
processDirectory(directoryPath);
console.log('Finished branding removal process.');
