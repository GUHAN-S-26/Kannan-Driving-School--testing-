import fs from 'fs';
import path from 'path';

const directoryPath = 'd:\\Car Driving School\\cloned-site';

function removeBranding(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove the "buy-now" block by targeting the end tag structure
  const buyNowRegex = /<div class="buy-now">[\s\S]*?<div class="buy-now-line"><\/div>\s*<\/div>/g;
  content = content.replace(buyNowRegex, '');

  // Remove copyright wrapper completely
  const copyrightRegex = /<div class="copyright_wrapper">[\s\S]*?<\/div>\s*<\/div>/g;
  content = content.replace(copyrightRegex, '');

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

// Also append CSS overrides to the main CSS file to guarantee hiding of dynamic elements like the Webflow badge
const cssPath = path.join(directoryPath, 'css', 'drive-school-tnc.webflow.shared.bad4c619d.css');
if (fs.existsSync(cssPath)) {
  const overrideCss = `\n\n/* Antigravity Custom Overrides to forcefully hide Webflow Branding and Copyright */\n.buy-now, .w-webflow-badge, .copyright_wrapper { display: none !important; opacity: 0 !important; visibility: hidden !important; height: 0 !important; width: 0 !important; overflow: hidden !important; margin: 0 !important; padding: 0 !important; pointer-events: none !important; }\n`;
  fs.appendFileSync(cssPath, overrideCss, 'utf8');
  console.log('Appended CSS overrides.');
}

console.log('Finished branding removal process.');
