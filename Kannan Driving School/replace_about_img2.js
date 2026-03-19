const fs = require('fs');
const htmlPath = 'd:/Car Driving School/cloned-site/about-us.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const target1 = 'images/6735a4cedd6a66d4b9d847e3_image%20%2814%29.png';
const target2 = 'images/6735a4cedd6a66d4b9d847e3_image%20%2814%29-p-500.png';
const replacement1 = 'images/Driving%20School%20img/Proven%20High%20Success%20Rate.png';

html = html.split(target1).join(replacement1);
html = html.split(target2).join(replacement1);

const target3 = 'images/6735a4cedd6a66d4b9d847e3_image (14).png';
const target4 = 'images/6735a4cedd6a66d4b9d847e3_image (14)-p-500.png';
html = html.split(target3).join(replacement1);
html = html.split(target4).join(replacement1);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log("Image updated successfully in about-us.html");
