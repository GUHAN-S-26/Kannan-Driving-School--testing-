import fs from 'fs';
import path from 'path';
const dir = 'cloned-site';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let count = 0;
files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  const regex = /(<a[^>]*class=["'][^"']*site_logo_wrapper[^"']*["'][^>]*>\s*<img[^>]*class=["'][^"']*site_logo[^"']*["'][^>]*>)(?!<div class="logo_text_container")/g;
  if (regex.test(content)) {
    content = content.replace(regex, '<div class="logo_text_container"><span class="logo_main_text">Kannan</span><span class="logo_sub_text">Driving School</span></div>');
    fs.writeFileSync(filePath, content);
    count++;
  }
});
console.log("Updated files: " + count);
