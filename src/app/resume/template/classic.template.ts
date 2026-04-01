export const classicTemplate = () => {
  return `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=PT+Serif:wght@400;700&display=swap');
  
  .resume-wrapper {
    font-family: 'PT Serif', serif;
    color: #000;
    line-height: 1.5;
    max-width: 850px;
    margin: 0 auto;
    padding: 60px;
    background: #fff;
  }

  header {
    text-align: center;
    border-bottom: 2px solid #000;
    padding-bottom: 20px;
    margin-bottom: 30px;
  }

  h1 {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .contact-info {
    font-size: 14px;
    word-spacing: 5px;
  }

  section {
    margin-bottom: 30px;
  }

  h2 {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    text-transform: uppercase;
    border-bottom: 1px solid #ccc;
    margin-bottom: 15px;
    padding-bottom: 5px;
  }

  .experience-item {
    margin-bottom: 20px;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .company-name {
    font-size: 16px;
    font-style: italic;
  }

  ul {
    padding-left: 25px;
    margin-top: 10px;
  }

  li {
    margin-bottom: 8px;
    text-align: justify;
  }

  .skills-list {
    font-style: italic;
  }
</style>

<div class="resume-wrapper">
  <header>
    <h1>Jonathan B. Sterling</h1>
    <div class="contact-info">
      123 Wall Street, New York, NY | (212) 555-0198 | j.sterling@email.com | LinkedIn.com/in/jsterling
    </div>
  </header>

  <section>
    <h2>Professional Profile</h2>
    <p>Distinguished Financial Analyst with over 12 years of experience in investment banking and portfolio management. Proven expertise in fiscal modeling, risk assessment, and strategic asset allocation. Committed to delivering superior returns through data-driven insights and meticulous market analysis.</p>
  </section>

  <section>
    <h2>Professional Experience</h2>
    <div class="experience-item">
      <div class="item-header">
        <span>GOLDMAN & ASSOCIATES</span>
        <span>2015 – Present</span>
      </div>
      <div class="item-header">
        <span class="company-name">Senior Portfolio Manager</span>
        <span>New York, NY</span>
      </div>
      <ul>
        <li>Oversaw a multi-asset class portfolio valued at $1.5 billion, consistently outperforming the S&P 500 benchmark by 15% annually.</li>
        <li>Developed proprietary algorithmic trading models that increased execution efficiency by 25% and reduced transaction costs.</li>
        <li>Led a team of 10 analysts in conducting comprehensive due diligence for large-scale mergers and acquisitions.</li>
      </ul>
    </div>

    <div class="experience-item">
      <div class="item-header">
        <span>MORGAN STANLEY CAPITAL</span>
        <span>2010 – 2015</span>
      </div>
      <div class="item-header">
        <span class="company-name">Investment Analyst</span>
        <span>New York, NY</span>
      </div>
      <ul>
        <li>Performed complex financial forecasting and valuation for Fortune 500 companies in the technology sector.</li>
        <li>Collaborated with senior partners to restructure distressed assets, resulting in a 30% recovery of capital for investors.</li>
      </ul>
    </div>
  </section>

  <section>
    <h2>Education</h2>
    <div class="item-header">
      <span>HARVARD BUSINESS SCHOOL</span>
      <span>2008 – 2010</span>
    </div>
    <p>Master of Business Administration (MBA)</p>
    
    <div class="item-header" style="margin-top: 10px;">
      <span>YALE UNIVERSITY</span>
      <span>2004 – 2008</span>
    </div>
    <p>B.A. in Economics, Cum Laude</p>
  </section>

  <section>
    <h2>Expertise</h2>
    <p class="skills-list">Quantitative Analysis, Risk Management, Financial Reporting (IFRS/GAAP), Bloomberg Terminal, Python for Finance (NumPy, Pandas), Strategic Planning.</p>
  </section>
</div>
`;
};
