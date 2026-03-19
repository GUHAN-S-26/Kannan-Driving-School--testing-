import fs from 'fs';
import path from 'path';

const siteDir = path.join(process.cwd(), 'cloned-site');

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

// More flexible regex to match the logo_marge section
// Matches <div ... class="logo_marge"> followed by any content including nested divs, until it finds the closing </div></div> pattern
const logoSliderRegex = /<div [^>]*class="logo_marge">[\s\S]*?<div [^>]*class="logo_wrapper">[\s\S]*?<\/div>\s*<\/div>/;

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf-8');
  if (logoSliderRegex.test(content)) {
    const newContent = content.replace(logoSliderRegex, '');
    fs.writeFileSync(filePath, content !== newContent ? newContent : content, 'utf-8');
    if (content !== newContent) {
      console.log(`Removed logo slider from: ${path.basename(filePath)}`);
    }
  } else {
     // Fallback if the structure is slightly different but contains logo_marge
     const fallbackRegex = /<div [^>]*class="logo_marge">[\s\S]*?<\/div>\s*<\/div>/;
     if (fallbackRegex.test(content)) {
         const newContent = content.replace(fallbackRegex, '');
         fs.writeFileSync(filePath, newContent, 'utf-8');
         console.log(`Removed logo slider (fallback) from: ${path.basename(filePath)}`);
     }
  }
});

console.log('Logo slider removal complete!');
