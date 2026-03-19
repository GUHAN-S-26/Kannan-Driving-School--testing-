import fs from 'fs';
let html = fs.readFileSync('cloned-site/contact-us.html', 'utf8');
html = html.replace(/<div class="branch_location_wrapper">[\s\S]*?(?=<\/section>)/, '');
fs.writeFileSync('cloned-site/contact-us.html', html);
