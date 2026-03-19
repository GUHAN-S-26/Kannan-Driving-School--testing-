const fs = require('fs');

const htmlPath = 'd:/Car Driving School/cloned-site/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const startTag = '<section class="testimonial_section">';
const endTag = '<section class="blog_section">';

const startIndex = html.indexOf(startTag);
const endIndex = html.indexOf(endTag);

if (startIndex === -1 || endIndex === -1) {
    console.error('Testimonial section bounds not found!');
    process.exit(1);
}

const newSection = `
<style>
.testimonial_section_new {
  background-color: #0b0b0b;
  color: #fff;
  padding: 100px 5%;
  font-family: inherit;
}
.testimonial_container {
  display: flex;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
}
.testimonial_left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.testimonial_subtitle {
  color: #a0a0a0;
  font-size: 14px;
  margin-bottom: 20px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.testimonial_title {
  font-size: 44px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 20px;
  color: #fff;
}
.testimonial_desc {
  color: #a0a0a0;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 90%;
}
.testimonial_btn {
  display: inline-flex;
  align-items: center;
  background: #fff;
  color: #000;
  padding: 14px 28px;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  font-size: 15px;
  align-self: flex-start;
  transition: opacity 0.3s;
}
.testimonial_btn:hover {
  opacity: 0.8;
}
.testimonial_btn span {
  margin-left: 10px;
  font-weight: bold;
}
.testimonial_right {
  flex: 1.5;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}
.testimonial_column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.testimonial_column:nth-child(2) {
  margin-top: 40px;
}
.testimonial_card {
  background: #1e1e1e;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border: 1px solid #333;
}
.testimonial_stars {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f59e0b;
  font-weight: 600;
  font-size: 15px;
}
.testimonial_stars svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}
.testimonial_text_p {
  color: #d1d5db;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}
.testimonial_divider {
  height: 1px;
  background: #333;
  margin: 8px 0;
}
.testimonial_author {
  display: flex;
  align-items: center;
  gap: 12px;
}
.testimonial_avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #333;
}
.testimonial_author_info {
  display: flex;
  flex-direction: column;
}
.testimonial_author_name {
  color: #fff;
  font-weight: 600;
  font-size: 13px;
}
.testimonial_author_role {
  color: #9ca3af;
  font-size: 11px;
}

@media (max-width: 991px) {
  .testimonial_container {
    flex-direction: column;
  }
  .testimonial_right {
    grid-template-columns: 1fr;
  }
  .testimonial_column:nth-child(2) {
    margin-top: 0;
  }
}
</style>

<section class="testimonial_section_new">
  <div class="testimonial_container">
    <div class="testimonial_left">
      <div class="testimonial_subtitle">Testimonial</div>
      <h2 class="testimonial_title">Hear From Our<br>Happy Drivers!</h2>
      <p class="testimonial_desc">Real stories from students who've transformed their driving skills with us.</p>
      <a href="contact-us.html" class="testimonial_btn">View all testimonials <span>&gt;</span></a>
    </div>
    <div class="testimonial_right">
      <div class="testimonial_column">
        <!-- Card 1 -->
        <div class="testimonial_card">
          <div class="testimonial_stars">
            <svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            5.0
          </div>
          <p class="testimonial_text_p">Well experienced teacher, very patient, no tension, no fear to learn. Clarification of our doubts is very nice.</p>
          <div class="testimonial_divider"></div>
          <div class="testimonial_author">
            <img src="images/67330937a091ff2b5a744de0_Author.png" alt="Priya M." class="testimonial_avatar">
            <div class="testimonial_author_info">
              <span class="testimonial_author_name">Priya M.</span>
              <span class="testimonial_author_role">Student</span>
            </div>
          </div>
        </div>
        <!-- Card 2 -->
        <div class="testimonial_card">
          <div class="testimonial_stars">
            <svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            4.8
          </div>
          <p class="testimonial_text_p">Everyone at Kannan Driving School was so supportive. They made sure I felt prepared and encouraged every step of the way.</p>
          <div class="testimonial_divider"></div>
          <div class="testimonial_author">
            <img src="images/67330937a091ff2b5a744de0_Author.png" alt="Rajesh K." class="testimonial_avatar">
            <div class="testimonial_author_info">
              <span class="testimonial_author_name">Rajesh K.</span>
              <span class="testimonial_author_role">Working Professional</span>
            </div>
          </div>
        </div>
        <!-- Card 3 -->
        <div class="testimonial_card">
          <div class="testimonial_stars">
            <svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            5.0
          </div>
          <p class="testimonial_text_p">I loved the advanced driving course! I learned skills I hadn’t even thought about, which makes me feel much safer on the road.</p>
          <div class="testimonial_divider"></div>
          <div class="testimonial_author">
            <img src="images/67330937a091ff2b5a744de0_Author.png" alt="Meena R." class="testimonial_avatar">
            <div class="testimonial_author_info">
              <span class="testimonial_author_name">Meena R.</span>
              <span class="testimonial_author_role">Returning Driver</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="testimonial_column">
        <!-- Card 4 -->
        <div class="testimonial_card">
          <div class="testimonial_stars">
            <svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            4.9
          </div>
          <p class="testimonial_text_p">Outstanding training for women drivers! The instructors are so encouraging and create a comfortable learning environment. Highly recommended!</p>
          <div class="testimonial_divider"></div>
          <div class="testimonial_author">
            <img src="images/67330937a091ff2b5a744de0_Author.png" alt="Lakshmi S." class="testimonial_avatar">
            <div class="testimonial_author_info">
              <span class="testimonial_author_name">Lakshmi S.</span>
              <span class="testimonial_author_role">Homemaker</span>
            </div>
          </div>
        </div>
        <!-- Card 5 -->
        <div class="testimonial_card">
          <div class="testimonial_stars">
            <svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            5.0
          </div>
          <p class="testimonial_text_p">I completed my heavy vehicle training here. Excellent dual-control vehicles and expert guidance. Best driving school in Nagercoil!</p>
          <div class="testimonial_divider"></div>
          <div class="testimonial_author">
            <img src="images/67330937a091ff2b5a744de0_Author.png" alt="Suresh P." class="testimonial_avatar">
            <div class="testimonial_author_info">
              <span class="testimonial_author_name">Suresh P.</span>
              <span class="testimonial_author_role">Commercial Driver</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;

const updatedHtml = html.substring(0, startIndex) + newSection + html.substring(endIndex);
fs.writeFileSync(htmlPath, updatedHtml, 'utf8');
console.log('Successfully updated testimonial section');
