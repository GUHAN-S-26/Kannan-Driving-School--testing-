import fs from 'fs';
const htmlPath = 'cloned-site/about-us.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const target1 = '<h5 class="primary_colored_heading">RTO Documentation Assistance</h5><p class="_16px_text">Our range of courses covers everything from basic driving skills to advanced defensive driving and commercial vehicle training. Whether you’re a new driver or looking to upgrade your skills, we have the right course for you.</p>';

const target2 = '<h5 class="primary_colored_heading">RTO Documentation Assistance</h5><p class="_16px_text">Our range of courses covers everything from basic driving skills to advanced defensive driving and commercial vehicle training. Whether you&#x2019;re a new driver or looking to upgrade your skills, we have the right course for you.</p>';

const replacement = `<h5 class="primary_colored_heading">RTO Documentation Assistance</h5><p class="_16px_text">We provide complete assistance with all RTO-related documentation, including learner's licenses, permanent licenses, and renewals, ensuring a smooth and hassle-free process for all our students.</p>`;

if (html.includes(target1)) {
    html = html.replace(target1, replacement);
    fs.writeFileSync(htmlPath, html);
    console.log('Replaced target1 successfully');
} else if (html.includes(target2)) {
    html = html.replace(target2, replacement);
    fs.writeFileSync(htmlPath, html);
    console.log('Replaced target2 successfully');
} else {
    console.log('Target not found.');
}
