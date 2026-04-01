export const professionalTemplate = () => {
  return `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
  
  .resume-wrapper {
    font-family: 'Roboto', sans-serif;
    color: #333;
    line-height: 1.4;
    max-width: 850px;
    margin: 0 auto;
    padding: 50px;
    background: #fff;
  }

  header {
    background: #003366;
    color: #fff;
    padding: 30px;
    margin: -50px -50px 30px -50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    font-size: 32px;
    margin: 0;
    font-weight: 700;
  }

  .header-info {
    text-align: right;
    font-size: 14px;
    opacity: 0.9;
  }

  section {
    margin-bottom: 25px;
  }

  h2 {
    font-size: 18px;
    color: #003366;
    border-bottom: 2px solid #003366;
    padding-bottom: 3px;
    margin-bottom: 12px;
    font-weight: 700;
  }

  .experience-item {
    margin-bottom: 18px;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    color: #1a1a1a;
  }

  .title-line {
    font-size: 15px;
    color: #555;
    font-weight: 500;
    margin-bottom: 8px;
  }

  ul {
    padding-left: 20px;
  }

  li {
    margin-bottom: 6px;
  }

  .skills-box {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
  }

  .skill-badge {
    background: #f0f4f8;
    color: #003366;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 13px;
    border: 1px solid #d9e2ec;
  }
</style>

<div class="resume-wrapper">
  <header>
    <div>
      <h1>DANIEL MARSHALL</h1>
      <p style="font-size: 18px; margin-top: 5px;">Operations Director</p>
    </div>
    <div class="header-info">
      <p>Chicago, IL</p>
      <p>d.marshall@email.com | (312) 555-0144</p>
      <p>linkedin.com/in/dmarshall-ops</p>
    </div>
  </header>

  <section>
    <h2>Professional Excellence</h2>
    <p>Strategic Operations Leader with over 15 years of experience in optimizing supply chains and streamlining corporate workflows. Proven ability to reduce operational costs by 20% while maintaining exceptional service quality. Expert in lean management, cross-departmental collaboration, and large-scale project execution.</p>
  </section>

  <section>
    <h2>Key Leadership History</h2>
    <div class="experience-item">
      <div class="item-header">
        <span>GLOBAL LOGISTICS CORP</span>
        <span>2016 – Present</span>
      </div>
      <div class="title-line">Operations Director | Chicago, IL</div>
      <ul>
        <li>Orchestrated the digital transformation of the inventory management system, resulting in a $5M annual savings.</li>
        <li>Managed a nationwide team of 200+ employees across 5 regional distribution centers.</li>
        <li>Implemented a safety-first culture that reduced workplace incidents by 45% over a three-year period.</li>
      </ul>
    </div>

    <div class="experience-item">
      <div class="item-header">
        <span>MIDWEST MANUFACTURING</span>
        <span>2012 – 2016</span>
      </div>
      <div class="title-line">Senior Project Manager | Chicago, IL</div>
      <ul>
        <li>Led the expansion of manufacturing facilities into three new states, finishing projects 15% under budget.</li>
        <li>Negotiated high-value contracts with key suppliers, securing a 10% reduction in raw material costs.</li>
      </ul>
    </div>
  </section>

  <section>
    <h2>Education & Certifications</h2>
    <div class="item-header">
      <span>UNIVERSITY OF ILLINOIS</span>
      <span>2008 – 2012</span>
    </div>
    <p>B.S. in Business Administration</p>
    <div class="skills-box">
      <span class="skill-badge">PMP Certified</span>
      <span class="skill-badge">Six Sigma Black Belt</span>
      <span class="skill-badge">Lean Management</span>
    </div>
  </section>

  <section>
    <h2>Strategic Skills</h2>
    <div class="skills-box">
      <span class="skill-badge">Supply Chain Optimization</span>
      <span class="skill-badge">Budget Management ($50M+)</span>
      <span class="skill-badge">Risk Assessment</span>
      <span class="skill-badge">Strategic Planning</span>
      <span class="skill-badge">Stakeholder Management</span>
      <span class="skill-badge">Team Leadership</span>
    </div>
  </section>
</div>
`;
};
