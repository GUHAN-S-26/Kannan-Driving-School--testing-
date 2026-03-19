import fs from 'fs';
import path from 'path';

const directoryPath = 'd:\\Car Driving School\\cloned-site';

function fixPaths(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix CSS file reference - the actual file on disk is still named drive-school-tnc
  content = content.replace(
    /kannan-driving-school\.webflow\.shared\.bad4c619d\.css/g,
    'drive-school-tnc.webflow.shared.bad4c619d.css'
  );

  // Fix any other filename-based references that were incorrectly renamed
  // The webflow domain reference is fine (we want that changed), but file paths must match disk
  content = content.replace(
    /kannan-driving-school\.webflow\./g,
    'drive-school-tnc.webflow.'
  );

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
      console.log(`Fixing paths in: ${filePath}`);
      fixPaths(filePath);
    }
  });
}

console.log('=== Fixing CSS/JS file path references ===');
processDirectory(directoryPath);
console.log('=== Done ===');
