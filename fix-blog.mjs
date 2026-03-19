import fs from 'fs';
const file = 'cloned-site/blog.html';
let content = fs.readFileSync(file, 'utf8');
// Remove unnecessary inline opacity and transforms from banner text to make it permanently visible in our new layout
content = content.replace(/style="-webkit-transform:[^"]*opacity:0"/g, '');
fs.writeFileSync(file, content);
