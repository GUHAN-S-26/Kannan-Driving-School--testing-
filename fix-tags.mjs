import fs from 'fs';
import path from 'path';

const dir = 'd:\\Car Driving School\\cloned-site';

function fixBrokenTags(directory) {
  const files = fs.readdirSync(directory);
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      fixBrokenTags(filePath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let original = content;

      // Fix broken closing tags where < was consumed by regex: word/tag> → word</tag>
      const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'span', 'a', 'li', 'ul', 'section'];
      tags.forEach(tag => {
        // Match pattern: alphanumeric or punctuation followed by /tag> (missing the <)
        const regex = new RegExp(`([A-Za-z0-9.,;:!?'"\\s])\\/${tag}>`, 'g');
        content = content.replace(regex, `$1</${tag}>`);
      });

      if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed broken tags in: ${file}`);
      }
    }
  });
}

console.log('=== Scanning for broken closing tags ===');
fixBrokenTags(dir);
console.log('=== Done ===');
