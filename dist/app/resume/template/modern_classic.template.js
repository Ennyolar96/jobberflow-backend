"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modernClassicTemplate = void 0;
const modernClassicTemplate = () => {
    return `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&family=Montserrat:wght@300;600&display=swap');
  
  .resume-wrapper {
    font-family: 'Montserrat', sans-serif;
    color: #2c3e50;
    line-height: 1.6;
    max-width: 850px;
    margin: 0 auto;
    padding: 60px;
    background: #fff;
    border-top: 10px solid #2c3e50;
  }

  header {
    text-align: center;
    margin-bottom: 40px;
  }

  h1 {
    font-family: 'Libre+Baskerville', serif;
    font-size: 34px;
    margin-bottom: 10px;
    font-weight: 700;
  }

  .subtitle {
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 14px;
    color: #7f8c8d;
    margin-bottom: 20px;
  }

  .contact-info {
    font-size: 13px;
    color: #34495e;
    border-top: 1px solid #bdc3c7;
    border-bottom: 1px solid #bdc3c7;
    padding: 10px 0;
  }

  section {
    margin-bottom: 30px;
  }

  h2 {
    font-family: 'Libre+Baskerville', serif;
    font-size: 18px;
    color: #2c3e50;
    border-bottom: 2px solid #2c3e50;
    padding-bottom: 5px;
    margin-bottom: 15px;
  }

  .experience-item {
    margin-bottom: 20px;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    font-size: 15px;
  }

  .company {
    color: #2980b9;
  }

  ul {
    padding-left: 20px;
    margin-top: 8px;
  }

  li {
    margin-bottom: 6px;
    font-size: 14px;
  }

  .summary {
    font-style: italic;
    color: #34495e;
    text-align: center;
    margin-bottom: 30px;
  }
</style>

<div class="resume-wrapper">
  <header>
    <h1>Benjamin Thorne</h1>
    <div class="subtitle">Senior Management Consultant</div>
    <div class="contact-info">
      London, UK | b.thorne.consulting@email.com | +44 20 7946 0123 | linkedin.com/in/b-thorne
    </div>
  </header>

  <p class="summary">Results-driven management consultant with a decade of experience advising FTSE 100 companies on organizational transformation and digital strategy. Specialist in change management and post-merger integration with a proven impact on operational efficiency.</p>

  <section>
    <h2>Expertise</h2>
    <div style="display: flex; justify-content: space-between; font-size: 14px;">
      <div>• Strategic Planning</div>
      <div>• Digital Transformation</div>
      <div>• Change Management</div>
      <div>• Operational Excellence</div>
    </div>
  </section>

  <section>
    <h2>Professional Experience</h2>
    <div class="experience-item">
      <div class="item-header">
        <span class="company">MBCC CONSULTING GROUP</span>
        <span>2017 – Present</span>
      </div>
      <div class="item-header">
        <span style="font-style: italic;">Principal Consultant</span>
        <span>London, UK</span>
      </div>
      <ul>
        <li>Led the multi-year transformation of a major retail client, resulting in a 25% reduction in supply chain costs.</li>
        <li>Architected a new operating model for a global financial services firm across 12 countries.</li>
        <li>Managed cross-functional teams of up to 15 consultants on high-stakes engagements.</li>
      </ul>
    </div>

    <div class="experience-item">
      <div class="item-header">
        <span class="company">STRATOS ADVISORY</span>
        <span>2013 – 2017</span>
      </div>
      <div class="item-header">
        <span style="font-style: italic;">Senior Associate</span>
        <span>London, UK</span>
      </div>
      <ul>
        <li>Executed comprehensive due diligence for the acquisition of a $500M tech startup by a major telecom operator.</li>
        <li>Developed data-driven market entry strategies for clients expanding into emerging markets in Southeast Asia.</li>
      </ul>
    </div>
  </section>

  <section>
    <h2>Education</h2>
    <div class="item-header">
      <span>LONDON SCHOOL OF ECONOMICS</span>
      <span>2011 – 2013</span>
    </div>
    <p style="font-size: 14px; margin: 0;">MSc in Management & Strategy</p>
    
    <div class="item-header" style="margin-top: 10px;">
      <span>UNIVERSITY OF OXFORD</span>
      <span>2008 – 2011</span>
    </div>
    <p style="font-size: 14px; margin: 0;">B.A. in Philosophy, Politics, and Economics (PPE)</p>
  </section>
</div>
`;
};
exports.modernClassicTemplate = modernClassicTemplate;
//# sourceMappingURL=modern_classic.template.js.map