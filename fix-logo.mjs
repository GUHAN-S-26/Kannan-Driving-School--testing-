import fs from 'fs';
import path from 'path';
const dir = 'cloned-site';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let count = 0;
files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace only the broken part by prepending the missing a and img tags
  const brokenStr = '<div class="logo_text_container"><span class="logo_main_text">Kannan</span><span class="logo_sub_text">Driving School</span></div>';
  const fixedStr = '<a href="index.html" class="site_logo_wrapper w-nav-brand"><img src="images/kannan-logo.png" loading="lazy" alt="Kannan Driving School" class="site_logo"><div class="logo_text_container"><span class="logo_main_text">Kannan</span><span class="logo_sub_text">Driving School</span></div>';
  if (content.includes(brokenStr)) {
    content = content.split(brokenStr).join(fixedStr);
    fs.writeFileSync(filePath, content);
    count++;
  }
});
console.log('Fixed files: ' + count);
