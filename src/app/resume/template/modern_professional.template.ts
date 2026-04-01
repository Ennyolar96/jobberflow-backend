export const modernProfessionalTemplate = () => {
  return `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap');
  
  .resume-wrapper {
    font-family: 'Poppins', sans-serif;
    color: #333;
    line-height: 1.5;
    max-width: 850px;
    margin: 0 auto;
    padding: 50px;
    background: #fff;
    border-right: 25px solid #0056b3;
  }

  header {
    margin-bottom: 40px;
  }

  h1 {
    font-size: 42px;
    font-weight: 800;
    color: #1a1a1a;
    margin: 0;
    line-height: 1;
    letter-spacing: -1px;
  }

  .title {
    font-size: 20px;
    font-weight: 400;
    color: #0056b3;
    margin-bottom: 15px;
  }

  .contact {
    display: flex;
    gap: 20px;
    font-size: 13px;
    color: #666;
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 15px;
  }

  section {
    margin-bottom: 30px;
  }

  h2 {
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #1a1a1a;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }

  h2::after {
    content: "";
    flex: 1;
    height: 2px;
    background: #f1f1f1;
    margin-left: 15px;
  }

  .experience-item {
    margin-bottom: 25px;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 5px;
  }

  .company {
    color: #0056b3;
  }

  .metrics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-bottom: 30px;
  }

  .metric-card {
    background: #f8faff;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    border-left: 4px solid #0056b3;
  }

  .metric-value {
    font-size: 24px;
    font-weight: 800;
    color: #0056b3;
    display: block;
  }

  .metric-label {
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 600;
    color: #666;
  }

  ul {
    padding-left: 20px;
  }

  li {
    margin-bottom: 8px;
    font-size: 14px;
  }

  .skills-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .skill-tag {
    background: #1a1a1a;
    color: #fff;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 400;
  }
</style>

<div class="resume-wrapper">
  <header>
    <h1>SARAH JENKINS</h1>
    <div class="title">SVP of Global Sales & Marketing</div>
    <div class="contact">
      New York, NY | sarah.jenkins@email.com | (212) 555-0789 | linkedin.com/in/sarahjenkins
    </div>
  </header>

  <div class="metrics">
    <div class="metric-card">
      <span class="metric-value">$85M</span>
      <span class="metric-label">Annual Revenue Growth</span>
    </div>
    <div class="metric-card">
      <span class="metric-value">4.5x</span>
      <span class="metric-label">Marketing ROI Increase</span>
    </div>
    <div class="metric-card">
      <span class="metric-value">120+</span>
      <span class="metric-label">International Markets Secured</span>
    </div>
  </div>

  <section id="experience">
    <h2>Select Experience</h2>
    <div class="experience-item">
      <div class="item-header">
        <span class="company">VELOCITY TECH GROUP</span>
        <span>2018 – Present</span>
      </div>
      <div class="item-header">
        <span style="font-weight: 400;">Global Sales Director</span>
        <span>New York, NY</span>
      </div>
      <ul>
        <li>Spearheaded international sales strategy, exceeding annual revenue targets by an average of 40% year-over-year.</li>
        <li>Built a world-class sales organization from 15 to 80+ team members across three continents.</li>
        <li>Orchestrated the launch of Enterprise SaaS products into 12 new European markets, securing $12M in ARR within the first year.</li>
      </ul>
    </div>

    <div class="experience-item">
      <div class="item-header">
        <span class="company">IMPACT MARKETING SOLUTIONS</span>
        <span>2013 – 2018</span>
      </div>
      <div class="item-header">
        <span style="font-weight: 400;">Regional Marketing Manager</span>
        <span>Boston, MA</span>
      </div>
      <ul>
        <li>Revolutionized the company's digital marketing approach, decreasing lead acquisition costs by 55% through precision targeting.</li>
        <li>Managed a $1.2M monthly advertising budget, optimizing channel performance across social, search, and display.</li>
      </ul>
    </div>
  </section>

  <section id="education">
    <h2>Education</h2>
    <div class="item-header">
      <span>UNIVERSITY OF PENNSYLVANIA</span>
      <span>2009 – 2013</span>
    </div>
    <p style="font-size: 14px; margin: 0;">B.S. in Economics, Wharton School of Business</p>
  </section>

  <section id="skills">
    <h2>Core Strengths</h2>
    <div class="skills-tags">
      <span class="skill-tag">Strategic Sales</span>
      <span class="skill-tag">International Expansion</span>
      <span class="skill-tag">B2B SaaS</span>
      <span class="skill-tag">Sales Force Automation</span>
      <span class="skill-tag">Data-Driven Marketing</span>
      <span class="skill-tag">Team Leadership</span>
      <span class="skill-tag">Revenue Operations</span>
    </div>
  </section>
</div>
`;
};
