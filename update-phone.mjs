import fs from 'fs';
import path from 'path';

const siteDir = path.join(process.cwd(), 'cloned-site');
const newPhone = '+9198421 29188';

// Target patterns
const patterns = [
  /\+91 XXXXX XXXXX/g,
  /\(212\) 555-0130/g,
  /\(323\) 555-0141/g,
];

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.html')) {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });

  return arrayOfFiles;
}

const htmlFiles = getAllFiles(siteDir);

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  patterns.forEach(pattern => {
    if (pattern.test(content)) {
      content = content.replace(pattern, newPhone);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated phone in: ${path.basename(filePath)}`);
  }
});

console.log('Phone number update complete!');
