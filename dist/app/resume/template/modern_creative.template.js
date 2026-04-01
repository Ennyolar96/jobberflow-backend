"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modernCreativeTemplate = void 0;
const modernCreativeTemplate = () => {
    return `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');
  
  .resume-wrapper {
    font-family: 'Outfit', sans-serif;
    color: #1a1a1a;
    line-height: 1.6;
    max-width: 850px;
    margin: 0 auto;
    padding: 60px;
    background: #fff;
    position: relative;
    overflow: hidden;
  }

  .resume-wrapper::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(108, 92, 231, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
    z-index: 0;
  }

  header {
    margin-bottom: 50px;
    z-index: 1;
    position: relative;
  }

  h1 {
    font-size: 48px;
    font-weight: 800;
    margin: 0;
    letter-spacing: -2px;
    background: linear-gradient(90deg, #6c5ce7, #a29bfe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .title {
    font-size: 22px;
    font-weight: 400;
    color: #636e72;
    margin-bottom: 20px;
  }

  .contact {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    font-size: 14px;
    color: #636e72;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .contact-item::before {
    content: "•";
    color: #6c5ce7;
    font-weight: bold;
  }

  section {
    margin-bottom: 40px;
    position: relative;
    z-index: 1;
  }

  h2 {
    font-size: 14px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: #6c5ce7;
    margin-bottom: 20px;
  }

  .experience-card {
    border-left: 2px solid #f1f2f6;
    padding-left: 25px;
    margin-left: 10px;
    margin-bottom: 30px;
    position: relative;
  }

  .experience-card::before {
    content: "";
    position: absolute;
    left: -6px;
    top: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #6c5ce7;
  }

  .experience-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .role {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
  }

  .company {
    font-size: 18px;
    font-weight: 400;
    color: #636e72;
  }

  .date {
    font-size: 14px;
    color: #636e72;
    font-weight: 400;
  }

  ul {
    padding-left: 20px;
    margin-top: 10px;
  }

  li {
    margin-bottom: 8px;
    font-size: 15px;
  }

  .skills-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .skill-pill {
    background: #f8f9fa;
    padding: 6px 16px;
    border-radius: 50px;
    font-size: 13px;
    color: #2d3436;
    border: 1px solid #dfe6e9;
    font-weight: 600;
  }

  .skill-pill:hover {
    background: #6c5ce7;
    color: #fff;
    border-color: #6c5ce7;
  }
</style>

<div class="resume-wrapper">
  <header>
    <h1>LEO HAYES</h1>
    <div class="title">Product Manager & Tech Strategist</div>
    <div class="contact">
      <div class="contact-item">San Francisco, CA</div>
      <div class="contact-item">leo.hayes@email.com</div>
      <div class="contact-item">+1 415-555-0321</div>
      <div class="contact-item">linkedin.com/in/leohayes-pm</div>
    </div>
  </header>

  <section id="summary">
    <h2>Philosophy</h2>
    <p style="font-size: 16px; max-width: 700px;">I build products that bridge the gap between human needs and technical possibilities. With 6+ years of experience leading cross-functional teams in high-growth environments, I focus on data-driven decision making, user-centric design, and lean product development.</p>
  </section>

  <section id="experience">
    <h2>The Journey</h2>
    <div class="experience-card">
      <div class="experience-header">
        <span class="role">Group Product Manager</span>
        <span class="date">2021 – Present</span>
      </div>
      <div class="company" style="margin-bottom: 10px;">FLUX INNOVATIONS | San Francisco, CA</div>
      <ul>
        <li>Orchestrated the product roadmap for the company's core AI-driven analytics suite, growing monthly recurring revenue (MRR) from $500K to $2.5M within 18 months.</li>
        <li>Led a multi-disciplinary team of designers, engineers, and data scientists to launch the "SmartInsights" feature, which became the platform's #1 most-used capability.</li>
        <li>Established the framework for automated user feedback loops, reducing the product discovery-to-delivery cycle by 35%.</li>
      </ul>
    </div>

    <div class="experience-card">
      <div class="experience-header">
        <span class="role">Product Manager</span>
        <span class="date">2018 – 2021</span>
      </div>
      <div class="company" style="margin-bottom: 10px;">NEON APPS | Seattle, WA</div>
      <ul>
        <li>Launched two consumer mobile apps with over 1M combined downloads, consistently maintaining a 4.8-star rating.</li>
        <li>Collaborated with the engineering team to optimize backend latency by 50%, directly improving user retention by 15%.</li>
      </ul>
    </div>
  </section>

  <section id="skills">
    <h2>Toolkit</h2>
    <div class="skills-container">
      <div class="skill-pill">Product Strategy</div>
      <div class="skill-pill">Agile / Scrum</div>
      <div class="skill-pill">UX/UI Research</div>
      <div class="skill-pill">Data Analytics (SQL/Python)</div>
      <div class="skill-pill">A/B Testing</div>
      <div class="skill-pill">Go-To-Market Strategy</div>
      <div class="skill-pill">Jira/Asana/Notion</div>
      <div class="skill-pill">Revenue Modeling</div>
    </div>
  </section>

  <section id="education">
    <h2>Background</h2>
    <div style="font-size: 15px; margin-bottom: 5px;"><strong>STANFORD UNIVERSITY</strong> | 2014 – 2018</div>
    <div style="font-size: 15px; color: #636e72;">B.S. in Management Science and Engineering</div>
  </section>
</div>
`;
};
exports.modernCreativeTemplate = modernCreativeTemplate;
//# sourceMappingURL=modern_creative.template.js.map