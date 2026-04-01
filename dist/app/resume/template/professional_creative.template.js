"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.professionalCreativeTemplate = void 0;
const professionalCreativeTemplate = () => {
    return `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&family=Outfit:wght@300;400;600&display=swap');
  
  .resume-wrapper {
    font-family: 'Outfit', sans-serif;
    color: #444;
    line-height: 1.6;
    max-width: 850px;
    margin: 0 auto;
    background: #fff;
    display: flex;
    box-shadow: 0 10px 40px rgba(0,0,0,0.05);
  }

  .sidebar {
    background: #F4F7FB;
    width: 300px;
    padding: 60px 40px;
    border-right: 1px solid #E2E8F0;
  }

  .main-content {
    flex: 1;
    padding: 60px 50px;
  }

  h1 {
    font-family: 'Quicksand', sans-serif;
    font-size: 34px;
    font-weight: 700;
    margin: 0;
    color: #2D3748;
    line-height: 1.1;
  }

  .title {
    font-size: 18px;
    color: #4C51BF;
    font-weight: 600;
    margin-bottom: 25px;
  }

  .contact-box {
    margin-bottom: 40px;
    font-size: 14px;
    color: #718096;
  }

  .contact-box div {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  section {
    margin-bottom: 35px;
  }

  h2 {
    font-family: 'Quicksand', sans-serif;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 2px;
    color: #4C51BF;
    margin-bottom: 20px;
    border-bottom: 2px solid #E2E8F0;
    padding-bottom: 8px;
  }

  .experience-item {
    margin-bottom: 30px;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    font-size: 17px;
    color: #2D3748;
  }

  .company {
    font-size: 15px;
    color: #718096;
    font-weight: 400;
    margin-bottom: 12px;
  }

  ul {
    padding-left: 20px;
    margin-top: 10px;
  }

  li {
    margin-bottom: 8px;
    font-size: 14.5px;
  }

  .pills {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .pill {
    background: #EBF4FF;
    color: #4C51BF;
    padding: 5px 12px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
  }

  .summary {
    font-size: 15px;
    margin-bottom: 40px;
    max-width: 90%;
  }

  .sidebar-section {
    margin-bottom: 40px;
  }

  .skill-level {
    height: 6px;
    background: #EDF2F7;
    border-radius: 3px;
    margin-top: 5px;
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .skill-level::after {
    content: "";
    position: absolute;
    height: 100%;
    background: #4C51BF;
    border-radius: 3px;
  }
</style>

<div class="resume-wrapper">
  <div class="sidebar">
    <div class="sidebar-section">
      <h2>Contact</h2>
      <div class="contact-box">
        <div>Austin, TX</div>
        <div>k.morgan.hr@email.com</div>
        <div>(512) 555-0342</div>
        <div>linkedin.com/in/kmorganhr</div>
      </div>
    </div>

    <div class="sidebar-section">
      <h2>Top Strengths</h2>
      <div style="font-size: 14px; margin-bottom: 15px;">
        Talent Acquisition
        <div class="skill-level" style="width: 100%;"><div style="width: 95%; height: 100%; background: #4C51BF;"></div></div>
      </div>
      <div style="font-size: 14px; margin-bottom: 15px;">
        Employer Branding
        <div class="skill-level" style="width: 100%;"><div style="width: 90%; height: 100%; background: #4C51BF;"></div></div>
      </div>
      <div style="font-size: 14px; margin-bottom: 15px;">
        Diversity & Inclusion
        <div class="skill-level" style="width: 100%;"><div style="width: 85%; height: 100%; background: #4C51BF;"></div></div>
      </div>
      <div style="font-size: 14px; margin-bottom: 15px;">
        Conflict Resolution
        <div class="skill-level" style="width: 100%;"><div style="width: 80%; height: 100%; background: #4C51BF;"></div></div>
      </div>
    </div>

    <div class="sidebar-section">
      <h2>Interests</h2>
      <p style="font-size: 13px; color: #718096; line-height: 1.8;">Leadership Coaching, Workplace Psychology, Remote Culture Building, Community Volunteering.</p>
    </div>
  </div>

  <div class="main-content">
    <h1>KAREN MORGAN</h1>
    <div class="title">Senior HR Director & People Strategist</div>
    
    <p class="summary">Compassionate and results-oriented HR leader with 12+ years of experience helping tech companies scale from 50 to 500+ employees. Expert in building high-performing cultures, navigating complex employment laws, and designing compensation structures that attract world-class talent.</p>

    <div class="sidebar-section">
      <h2>Experience</h2>
      <div class="experience-item">
        <div class="item-header">
          <span>Head of People Operations</span>
          <span>2019 – Present</span>
        </div>
        <div class="company">Hyperion Tech | Austin, TX</div>
        <ul>
          <li>Orchestrated the recruitment strategy for 150+ new hires across engineering, product, and sales in under 18 months.</li>
          <li>Implemented a comprehensive D&I framework that increased minority representation in leadership by 30%.</li>
          <li>Developed an internal career pathing system used by 95% of employees, reducing annual turnover by 20%.</li>
        </ul>
      </div>

      <div class="experience-item">
          <div class="item-header">
            <span>Senior HR Business Partner</span>
            <span>2014 – 2019</span>
          </div>
          <div class="company">CloudPulse Systems | Austin, TX</div>
          <ul>
            <li>Partnered with executive leadership to redesign the company's performance management system, focusing on 360-degree feedback and continuous growth.</li>
            <li>Resolved high-level employee relations issues with empathy and legal precision.</li>
          </ul>
      </div>
    </div>

    <div class="sidebar-section">
      <h2>Key Tools</h2>
      <div class="pills">
        <span class="pill">Workday</span>
        <span class="pill">Greenhouse</span>
        <span class="pill">BambooHR</span>
        <span class="pill">Lattice</span>
        <span class="pill">Paylocity</span>
        <span class="pill">Slack / Zoom</span>
      </div>
    </div>
  </div>
</div>
`;
};
exports.professionalCreativeTemplate = professionalCreativeTemplate;
//# sourceMappingURL=professional_creative.template.js.map