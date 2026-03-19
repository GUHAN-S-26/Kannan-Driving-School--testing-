import fs from 'fs';
import path from 'path';

const siteDir = 'd:\\Car Driving School\\cloned-site';
const cssPath = path.join(siteDir, 'css', 'drive-school-tnc.webflow.shared.bad4c619d.css');

// --- 1. Add Google Fonts <link> to all HTML files ---
const fontLink = '<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Figtree:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">';

function addFontToHTML(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      addFontToHTML(filePath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf8');
      // Only add if not already present
      if (!content.includes('Manrope')) {
        // Insert before the closing </head>
        content = content.replace('</head>', fontLink + '\n</head>');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Added Manrope/Figtree fonts to: ${file}`);
      }
    }
  });
}

addFontToHTML(siteDir);

// --- 2. Append CSS enhancements ---
const cssEnhancements = `

/* ===================================================================
   KANNAN DRIVING SCHOOL — DESIGN ENHANCEMENT OVERRIDES
   =================================================================== */

/* --- 1. TYPOGRAPHY: Manrope for headings, Figtree for body --- */
h1, h2, h3, h4, h5, h6,
.hero_heading,
.heading,
.course_heading,
._62px_text,
._40px_text,
._26px_gap,
.cta_text,
.cta_text_2nd,
.footer_title,
.blog_heading,
.primary_colored_heading,
.infinity_slider_title {
  font-family: 'Manrope', sans-serif !important;
  letter-spacing: -0.02em !important;
}

body,
p,
a,
div,
span,
.nav_link,
._18px-text,
._16px_text,
._14px_text,
.footer_text,
.footer_paragraph,
.footer-link,
.button_text,
.testimonial_text,
.author_name,
.position,
.blog_date,
.tags,
.white_color,
.serial_no,
._18px_heading,
._40px_top_margin {
  font-family: 'Figtree', sans-serif !important;
}

/* --- 2. COLOR PALETTE: Premium deep red accent --- */
.nav_link.w--current,
.button_text.red,
.primary_colored_heading,
.star_icon {
  color: #cc0000 !important;
}

.button_color,
.button .button_icon_wrapper {
  background-color: #cc0000 !important;
}

.button:hover .button_color {
  background-color: #a30000 !important;
}

.green_border {
  border-color: #00cc6a !important;
}

/* --- 3. NAVBAR ENHANCEMENTS --- */
.navbar {
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  background: rgba(17, 17, 20, 0.92) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
  transition: background 0.3s ease !important;
}

.site_logo {
  max-height: 55px !important;
  width: auto !important;
  height: auto !important;
  object-fit: contain !important;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3)) !important;
  transition: transform 0.3s ease !important;
}

.site_logo:hover {
  transform: scale(1.05) !important;
}

.nav_link {
  transition: color 0.3s ease, transform 0.2s ease !important;
  position: relative !important;
}

.nav_link:hover {
  color: #cc0000 !important;
}

/* --- 4. COURSE CARDS: Hover lift + shadow --- */
.course_card_wrapper {
  transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 0.35s ease !important;
  border-radius: 12px !important;
  overflow: hidden !important;
}

.course_card_wrapper:hover {
  transform: translateY(-8px) !important;
  box-shadow: 0 16px 40px rgba(204, 0, 0, 0.12),
              0 8px 16px rgba(0, 0, 0, 0.25) !important;
}

.course_image {
  transition: transform 0.5s ease !important;
}

.course_card_wrapper:hover .course_image {
  transform: scale(1.05) !important;
}

.course_title_wrapper {
  transition: background-color 0.3s ease !important;
}

/* --- 5. BUTTONS: Modern glow & transitions --- */
.button {
  transition: transform 0.3s ease, box-shadow 0.3s ease !important;
  border-radius: 6px !important;
  overflow: hidden !important;
}

.button:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(204, 0, 0, 0.35) !important;
}

.secondary_button {
  transition: transform 0.3s ease, color 0.3s ease !important;
}

.secondary_button:hover {
  transform: translateX(4px) !important;
}

.secondary_button:hover .button_text.red {
  color: #ff3333 !important;
}

.cta_button {
  transition: transform 0.3s ease, box-shadow 0.3s ease !important;
}

.cta_button:hover {
  transform: scale(1.08) !important;
  box-shadow: 0 8px 24px rgba(204, 0, 0, 0.4) !important;
}

/* --- 6. TESTIMONIAL CARDS --- */
.testimonial_card_507px {
  transition: transform 0.3s ease, box-shadow 0.3s ease !important;
  border-radius: 12px !important;
}

.testimonial_card_507px:hover {
  transform: translateY(-4px) !important;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3) !important;
}

/* --- 7. BLOG CARDS --- */
.blog_wrapper {
  transition: transform 0.35s ease, box-shadow 0.35s ease !important;
  border-radius: 12px !important;
  overflow: hidden !important;
}

.blog_wrapper:hover {
  transform: translateY(-6px) !important;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25) !important;
}

/* --- 8. FOOTER ENHANCEMENTS --- */
.footer {
  border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
}

.footer-link {
  transition: color 0.25s ease, transform 0.2s ease !important;
}

.footer-link:hover {
  color: #cc0000 !important;
  transform: translateX(3px) !important;
}

.social_link.footer-link {
  transition: color 0.25s ease !important;
}

.social_link.footer-link:hover {
  color: #ff3333 !important;
}

/* --- 9. SCROLLBAR STYLING --- */
::-webkit-scrollbar {
  width: 8px !important;
}

::-webkit-scrollbar-track {
  background: #111114 !important;
}

::-webkit-scrollbar-thumb {
  background: #333 !important;
  border-radius: 4px !important;
}

::-webkit-scrollbar-thumb:hover {
  background: #cc0000 !important;
}

/* --- 10. SELECTION COLOR --- */
::selection {
  background: rgba(204, 0, 0, 0.3) !important;
  color: #fff !important;
}

/* --- 11. SMOOTH GLOBAL TRANSITIONS --- */
* {
  scroll-behavior: smooth;
}

/* --- 12. HERO HEADING ENHANCEMENT --- */
.hero_heading {
  font-weight: 800 !important;
  letter-spacing: -0.03em !important;
  line-height: 1.05 !important;
}

/* --- 13. INFINITY SLIDER --- */
.infinity_slider_title {
  font-weight: 700 !important;
  letter-spacing: 0.02em !important;
  text-transform: uppercase !important;
}

/* --- 14. WHY CHOOSE US SECTION --- */
.serial_no {
  font-family: 'Manrope', sans-serif !important;
  font-weight: 800 !important;
  color: #cc0000 !important;
}

.primary_colored_heading {
  font-weight: 700 !important;
}

/* --- 15. STEP SECTION --- */
._18px_heading {
  font-family: 'Manrope', sans-serif !important;
  font-weight: 700 !important;
  color: #cc0000 !important;
}
`;

fs.appendFileSync(cssPath, cssEnhancements, 'utf8');
console.log('CSS enhancements appended successfully!');
