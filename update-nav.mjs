import fs from 'fs';
import path from 'path';

const siteDir = path.join(process.cwd(), 'cloned-site');

// New simple nav menu (no dropdowns)
function getNavMenu(currentPage) {
  const pages = [
    { name: 'Home', href: 'index.html' },
    { name: 'Courses', href: 'courses.html' },
    { name: 'Services', href: 'services.html' },
    { name: 'About Us', href: 'about-us.html' },
    { name: 'Contact', href: 'contact-us.html' },
  ];

  const items = pages.map(p => {
    const isCurrent = p.href === currentPage;
    const currentAttr = isCurrent ? ' aria-current="page"' : '';
    const currentClass = isCurrent ? ' w--current' : '';
    return `<li class="nav_list"><a href="${p.href}"${currentAttr} class="nav_link${currentClass}">${p.name}</a></li>`;
  }).join('');

  return items;
}

// New footer links
const newFooterLinks = `<div class="footer-block link_block"><div data-w-id="7051e30f-aff1-9802-dbd2-5c9dde5164c6" class="courses_block"><div class="footer_title_block"><div class="footer_title">Quick Links</div></div><div class="footer_link_wrappe"><a href="index.html" class="footer-link">Home</a><a href="courses.html" class="footer-link">Courses</a><a href="services.html" class="footer-link">Services</a><a href="about-us.html" class="footer-link">About Us</a><a href="contact-us.html" class="footer-link">Contact</a></div></div><div data-w-id="93d81291-6325-75fc-7004-2db65e8caa2e" class="courses_block no_border"><div class="footer_title_block"><div class="footer_title">Our Courses</div></div><div class="footer_link_wrapper"><a href="beginners-compact-driving.html" class="footer-link">Beginner's Compact Driving</a><a href="two-wheeler-driving.html" class="footer-link">Two-Wheeler Driving</a><a href="advanced-vehicle-driving.html" class="footer-link">Refresher Courses</a><a href="commercial-vehicle-driving.html" class="footer-link">Heavy Vehicle Training</a></div></div></div>`;

const filesToUpdate = fs.readdirSync(siteDir).filter(file => file.endsWith('.html'));

for (const file of filesToUpdate) {
  const filePath = path.join(siteDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');

  // 1. Replace nav menu items
  // Match the <ul role="list" class="nav_menu">...</ul>
  const navMenuRegex = /<ul role="list" class="nav_menu">[\s\S]*?<\/ul>/;
  const newNavMenu = `<ul role="list" class="nav_menu">${getNavMenu(file)}</ul>`;
  html = html.replace(navMenuRegex, newNavMenu);

  // 2. Remove dropdown sections (pages and courses mega menus)
  // Remove <section class="navbar_dropdown_wrapper pages">...</section>
  const pagesDropdownRegex = /<section class="navbar_dropdown_wrapper pages">[\s\S]*?<\/section>/;
  html = html.replace(pagesDropdownRegex, '');

  // Remove <section class="navbar_dropdown_wrapper courses">...</section>
  const coursesDropdownRegex = /<section class="navbar_dropdown_wrapper courses">[\s\S]*?<\/section>/;
  html = html.replace(coursesDropdownRegex, '');

  // 3. Update footer links
  // Replace the footer-block link_block section
  const footerLinksRegex = /<div class="footer-block link_block">[\s\S]*?<\/div><\/div><\/div>/;
  // Need a more specific pattern since the HTML is complex
  // Let's match from footer-block link_block to the closing patterns
  const footerMatch = html.match(/<div class="footer-block link_block">([\s\S]*?)(<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>)/);
  if (footerMatch) {
    // Replace the footer link block more carefully
    html = html.replace(
      /<div class="footer-block link_block">[\s\S]*?<div class="footer_title">Utility Pages<\/div>[\s\S]*?<\/div><\/div><\/div>/,
      newFooterLinks
    );
  }

  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`Updated: ${file}`);
}

console.log('All pages updated!');
