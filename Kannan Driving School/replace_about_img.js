const fs = require('fs');
const htmlPath = 'd:/Car Driving School/cloned-site/about-us.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const target1 = 'images/6735a4ab485fd8d465311062_image%20%2812%29.png';
const target2 = 'images/6735a4ab485fd8d465311062_image%20%2812%29-p-500.png';
const newImage = 'images/Driving School img/Well-Maintained Dual-Control Fleet.png';
const replacement1 = 'images/Driving%20School%20img/Well-Maintained%20Dual-Control%20Fleet.png';

html = html.split(target1).join(replacement1);
html = html.split(target2).join(replacement1);

const target3 = 'images/6735a4ab485fd8d465311062_image (12).png';
const target4 = 'images/6735a4ab485fd8d465311062_image (12)-p-500.png';
html = html.split(target3).join(replacement1);
html = html.split(target4).join(replacement1);

// Add custom style for it if it's not present (the user added limit in index.html recently, let's keep it clean since it's just image swapping)

fs.writeFileSync(htmlPath, html, 'utf8');
console.log("Image updated successfully in about-us.html");
