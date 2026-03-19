import fs from 'fs';
import path from 'path';

const directoryPath = 'd:\\Car Driving School\\cloned-site';

function remodel(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // ===== 1. TITLE REPLACEMENTS =====
  content = content.replace(/<title>DriveSchool TNC - Webflow HTML website template<\/title>/g, '<title>Kannan Driving School - Your Trusted Driving Partner Since 1999</title>');
  content = content.replace(/<title>Drive School TNC<\/title>/g, '<title>Kannan Driving School</title>');

  // ===== 2. META DESCRIPTION =====
  content = content.replace(
    /Discover the best driving school to master your skills\. Our expert instructors provide personalized lessons to ensure you become a confident and safe driver\./g,
    'Kannan Driving School, Nagercoil — 25+ years of trusted motor training. LMV, Two-Wheeler, Heavy Vehicle courses &amp; RTO documentation services. Government-approved. Rated 4.7/5.'
  );

  // ===== 3. BRAND NAME REPLACEMENTS (all variations) =====
  content = content.replace(/DriveSchool TNC/g, 'Kannan Driving School');
  content = content.replace(/Drive School TNC/g, 'Kannan Driving School');
  content = content.replace(/drive-school-tnc/g, 'kannan-driving-school');

  // ===== 4. LOGO REPLACEMENTS =====
  // Main site logo in navbar
  content = content.replace(
    /src="images\/6731e99f3255a4fb195de5eb_Frame%2082\.png"/g,
    'src="images/kannan-logo.png"'
  );
  // Favicon
  content = content.replace(
    /href="images\/67515c6817da61ac2115103a_Fav%20Icon\.png"/g,
    'href="images/kannan-logo.png"'
  );
  // Apple touch icon
  content = content.replace(
    /href="images\/67515c6d13d4a48c401d8b9e_Logo\.png"/g,
    'href="images/kannan-logo.png"'
  );

  // ===== 5. CONTACT INFO =====
  content = content.replace(/\+1 \(234\) 567-8901/g, '+91 XXXXX XXXXX');
  content = content.replace(/info@example\.com/g, 'info@kannandriving.com');

  // ===== 6. HERO SECTION (index.html specific) =====
  content = content.replace(
    />Master the Road with Confidence</g,
    '>Master Driving with 25+ Years of Trust'
  );
  content = content.replace(
    />Professional Driving Lessons for All Skill Levels – From Beginners to Advanced Drivers</g,
    '>Government-Approved Motor Training Since 1999 — LMV, Two-Wheeler &amp; Heavy Vehicle Courses in Nagercoil'
  );

  // ===== 7. ABOUT / MISSION TEXT =====
  content = content.replace(
    /At DriveSchool TNC, we're committed to more than just teaching driving skills\. Our mission is to develop responsible, confident drivers through comprehensive training, personalized guidance, and a focus on safety\. With expert instructors and modern vehicles, we support each student's journey from their first lesson to mastering the road\./g,
    'Established in 1999, Kannan Driving School is one of the most reputable and long-standing motor training institutes in Nagercoil. Located in the heart of Meenakshipuram, near SBI Vadiveeswaram, we are widely recognized for our high success rate, patient certified instructors, and personalized teaching approach. With 25+ years of experience and modern dual-control vehicles, we help every learner overcome driving fear and build lifelong confidence on the road.'
  );

  // ===== 8. WHY CHOOSE US — update "13 years" to "25+ years" =====
  content = content.replace(/13 years of experience/g, '25+ years of experience');

  // ===== 9. TESTIMONIALS — update text to reflect real reviews =====
  content = content.replace(
    />The instructors were incredibly professional and patient\. I felt supported from start to finish, and they made learning easy\.</g,
    '>Well experienced teacher, very patient, no tension, no fear to learn. Clarification of our doubts is very nice.'
  );
  content = content.replace(
    />Everyone at DriveSchool TNC was so supportive\. They made sure I felt prepared and encouraged every step of the way\.</g,
    '>Kannan Driving School helped me pass my RTO test on the very first attempt. The instructors are patient, friendly, and highly skilled.'
  );
  content = content.replace(
    />Great value for the quality of training provided\. I felt like I was getting premium instruction without breaking the bank\.</g,
    '>Outstanding training for women drivers! The instructors are so encouraging and create a comfortable learning environment. Highly recommended!'
  );
  content = content.replace(
    />They personalized each session to my learning pace, which really helped me overcome my driving anxieties\. Highly recommended!</g,
    '>I completed my heavy vehicle training here. Excellent dual-control vehicles and expert guidance. Best driving school in Nagercoil!'
  );
  content = content.replace(
    />I loved the advanced driving course! I learned skills I hadn't even thought about, which makes me feel much safer on the road\.</g,
    '>Perfect refresher course! I hadn\'t driven in years but the patient instructors helped me regain full confidence behind the wheel.'
  );

  // ===== 10. TESTIMONIAL AUTHOR NAMES — make them local =====
  content = content.replace(/>Sarah Thompson</g, '>Priya M.<');
  content = content.replace(/>Marketing Specialist</g, '>Student<');
  content = content.replace(/>Michael Scott</g, '>Rajesh K.<');
  content = content.replace(/>Financial Analyst</g, '>Working Professional<');
  content = content.replace(/>Emma Stone</g, '>Lakshmi S.<');
  content = content.replace(/>Small Business Owner</g, '>Homemaker<');
  content = content.replace(/>David Harrison</g, '>Suresh P.<');
  content = content.replace(/>Software Developer</g, '>Commercial Driver<');
  content = content.replace(/>Christopher Davies</g, '>Meena R.<');
  content = content.replace(/>Operations Manager</g, '>Returning Driver<');

  // ===== 11. FOOTER ADDRESS =====
  content = content.replace(
    />Help &amp; Support Center</g,
    '>Grown Plaza, Avvai Shanmugam Salai, Meenakshipuram, Nagercoil'
  );

  // ===== 12. WEBFLOW DOMAIN REFERENCES =====
  content = content.replace(/data-wf-domain="kannan-driving-school\.webflow\.io"/g, 'data-wf-domain="kannandriving.com"');

  // ===== 13. HTML COMMENTS =====
  content = content.replace(/<!-- This site was created in Webflow\. https:\/\/webflow\.com -->/g, '<!-- Kannan Driving School - Est. 1999 -->');
  content = content.replace(/<meta content="Webflow" name="generator">/g, '<meta content="Kannan Driving School" name="generator">');

  // ===== 14. COURSE NAME UPDATES (map existing to Kannan services) =====
  content = content.replace(/Beginner's Compact Driving/g, 'Light Motor Vehicle (LMV)');
  content = content.replace(/Beginner&#x27;s Compact Driving/g, 'Light Motor Vehicle (LMV)');
  content = content.replace(/Advanced Vehicle Driving/g, 'Refresher Courses');
  content = content.replace(/Commercial Vehicle Driving/g, 'Heavy Vehicle Training');
  content = content.replace(/Personalized Driving Lessons/g, 'RTO &amp; Documentation Services');

  // ===== 15. FOOTER COURSE LINK TEXT =====
  // Already handled by the above course name replacements

  // ===== 16. "Why Choose Us" SECTION UPDATES =====
  content = content.replace(/>Experienced and Certified Instructors</g, '>Expert &amp; Patient Certified Instructors<');
  content = content.replace(
    />Our instructors are certified experts with 25\+ years of experience in training drivers across all skill levels\. We are dedicated to helping you feel confident and safe on the road\.</g,
    '>Known for having patient, certified teachers who help learners overcome "driving fear." Our team specializes in creating a comfortable, stress-free learning environment for all genders.<'
  );

  content = content.replace(/>Customized Learning Plans</g, '>Training for Women Drivers<');
  content = content.replace(
    />We understand that every learner has unique strengths and challenges\. That's why we offer personalized lesson plans and flexible scheduling options to ensure you get the most out of your training\.</g,
    '>We feature patient, friendly instructors dedicated to ensuring a comfortable learning environment for women, with flexible scheduling for working professionals and students.<'
  );

  content = content.replace(/>State-of-the-Art-Vehicles and Facilities</g, '>Well-Maintained Dual-Control Fleet<');
  content = content.replace(
    />Our fleet includes the latest models of sedans, SUVs, and commercial vehicles, all equipped with safety features and modern technology to enhance your learning experience in real-world conditions\.</g,
    '>We use modern, dual-control vehicles to ensure maximum safety during practical sessions. Our fleet is regularly serviced and maintained to the highest standards.<'
  );

  content = content.replace(/>Comprehensive Course Selection</g, '>RTO Documentation Assistance<');
  content = content.replace(
    />Our range of courses covers everything from basic driving skills to advanced defensive driving and commercial vehicle training\. Whether you're a new driver or looking to upgrade your skills, we have the right course for you\.</g,
    '>Beyond driving lessons, we offer complete assistance with new license applications (L.L. &amp; Driving License), license renewals, international driving permit consultancy, and vehicle documentation services.<'
  );

  content = content.replace(/>Safety-First Approach</g, '>Proven High Success Rate<');
  content = content.replace(
    />Safety is at the core of our training philosophy\. We emphasize defensive driving techniques, situational awareness, and emergency handling skills to make sure you're well-prepared for any situation on the road\.</g,
    '>With a proven track record of helping students pass their RTO driving tests on the first attempt, we are rated 4.7/5 on major local business directories. Government-approved and recognized motor training school.<'
  );

  // ===== 17. "Building Safe, Confident Drivers for Life" =====
  content = content.replace(
    />Building Safe, Confident Drivers for Life"</g,
    '>25+ Years of Building Confident Drivers in Nagercoil"<'
  );

  // ===== 18. OG TITLE META TAGS =====
  content = content.replace(/content="Drive School TNC" property="og:title"/g, 'content="Kannan Driving School" property="og:title"');
  content = content.replace(/content="Drive School TNC" property="twitter:title"/g, 'content="Kannan Driving School" property="twitter:title"');

  fs.writeFileSync(filePath, content, 'utf8');
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (filePath.endsWith('.html')) {
      console.log(`Remodeling: ${filePath}`);
      remodel(filePath);
    }
  });
}

console.log('=== Starting Kannan Driving School Remodel ===');
processDirectory(directoryPath);
console.log('=== Remodel Complete ===');
