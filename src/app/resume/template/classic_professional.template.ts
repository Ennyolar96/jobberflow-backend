export const classicProfessionalTemplate = () => {
  return `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Karla:wght@400;700&display=swap');
  
  .resume-wrapper {
    font-family: 'Karla', sans-serif;
    color: #333;
    line-height: 1.5;
    max-width: 850px;
    margin: 0 auto;
    padding: 60px;
    background: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  }

  header {
    margin-bottom: 40px;
  }

  h1 {
    font-family: 'Crimson Pro', serif;
    font-size: 38px;
    font-weight: 700;
    margin: 0;
    color: #4a4a4a;
    letter-spacing: 1px;
  }

  .title {
    font-family: 'Crimson Pro', serif;
    font-size: 20px;
    font-weight: 600;
    color: #3182ce;
    margin-bottom: 20px;
  }

  .contact {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #666;
    border-top: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;
    padding: 10px 0;
  }

  section {
    margin-bottom: 30px;
  }

  h2 {
    font-family: 'Crimson Pro', serif;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #2D3748;
    background: #f7fafc;
    padding: 8px 15px;
    margin-bottom: 20px;
    border-left: 5px solid #2D3748;
  }

  .experience-item {
    margin-bottom: 25px;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    font-size: 16px;
    color: #1a1a1a;
  }

  .company {
    font-style: italic;
    color: #4a5568;
    margin-bottom: 10px;
  }

  ul {
    padding-left: 20px;
  }

  li {
    margin-bottom: 8px;
    font-size: 14.5px;
  }

  .skills-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  .skill-item {
    font-size: 14px;
    display: flex;
    align-items: center;
  }

  .skill-item::before {
    content: "■";
    color: #2D3748;
    font-size: 10px;
    margin-right: 10px;
  }
</style>

<div class="resume-wrapper">
  <header>
    <h1>ROBERT K. VANCE, CPA</h1>
    <div class="title">Chief Operations Officer (COO)</div>
    <div class="contact">
      Houston, TX | r.vance@email.com | (713) 555-0814 | linkedin.com/in/rvance-coo
    </div>
  </header>

  <p style="font-size: 15px; margin-bottom: 35px;">Seasoned Operations Leader and Certified Public Accountant with over 20 years of experience managing complex fiscal and operational infrastructures. Specialist in cost-reduction initiatives, organizational scaling, and rigorous compliance management for large-scale manufacturing and distribution enterprises.</p>

  <section id="experience">
    <h2>Professional Experience</h2>
    <div class="experience-item">
      <div class="item-header">
        <span>Chief Operations Officer</span>
        <span>2015 – Present</span>
      </div>
      <div class="company">Vanguard Industries | Houston, TX</div>
      <ul>
        <li>Orchestrated the operational overhaul of a $250M manufacturing facility, resulting in a 12% increase in EBITDA within two years.</li>
        <li>Implemented a comprehensive ERP system (SAP) across All North American sites, reducing monthly closing time by 4 days.</li>
        <li>Negotiated multi-year vendor contracts valued at $50M+, achieving a $4.5M net savings in procurement costs.</li>
      </ul>
    </div>

    <div class="experience-item">
      <div class="item-header">
        <span>Director of Finance & Operations</span>
        <span>2008 – 2015</span>
      </div>
      <div class="company">Gulf Coast Logistics | New Orleans, LA</div>
      <ul>
        <li>Managed a distributed team of 150+ operational staff and 15 accounting professionals.</li>
        <li>Directed the successful post-merger integration of three regional logistics firms, standardizing workflows and reporting metrics.</li>
      </ul>
    </div>
  </section>

  <section id="skills">
    <h2>Core Competencies</h2>
    <div class="skills-box">
      <div class="skill-item">Fiscal Modeling & Forecasting</div>
      <div class="skill-item">Lean Manufacturing (Kaizen)</div>
      <div class="skill-item">Strategic Supply Chain Management</div>
      <div class="skill-item">Regulatory Compliance (SEC, SOX)</div>
      <div class="skill-item">Executive Leadership & Mentoring</div>
      <div class="skill-item">Capital Budgeting ($100M+)</div>
    </div>
  </section>

  <section id="education">
    <h2>Academic & Credentials</h2>
    <div class="experience-item" style="margin-bottom: 10px;">
      <div class="item-header">
        <span>TEXAS A&M UNIVERSITY</span>
        <span>1998 – 2002</span>
      </div>
      <div style="font-size: 15px;">B.B.A. in Accounting & Finance</div>
    </div>
    <p style="margin: 0; font-weight: 700; color: #2b6cb0;">Certified Public Accountant (CPA) - State of Texas</p>
  </section>
</div>
`;
};
