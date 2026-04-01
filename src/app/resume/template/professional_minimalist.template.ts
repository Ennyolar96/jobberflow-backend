export const professionalMinimalistTemplate = () => {
  return `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;600;700&display=swap');
  
  .resume-wrapper {
    font-family: 'Public Sans', sans-serif;
    color: #333;
    line-height: 1.5;
    max-width: 850px;
    margin: 0 auto;
    padding: 60px;
    background: #fff;
    border: 1px solid #E2E8F0;
  }

  header {
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    font-size: 28px;
    font-weight: 700;
    margin: 0;
    color: #1a202c;
  }

  .meta {
    font-size: 13px;
    color: #718096;
    text-align: right;
  }

  section {
    margin-bottom: 35px;
  }

  h2 {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: #4A5568;
    background: #EDF2F7;
    padding: 6px 12px;
    margin-bottom: 20px;
    border-radius: 4px;
    display: inline-block;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  .experience-item {
    margin-bottom: 25px;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 5px;
  }

  .company {
    color: #3182ce;
    font-size: 14px;
    margin-bottom: 10px;
  }

  ul {
    padding-left: 18px;
    margin-top: 10px;
  }

  li {
    margin-bottom: 6px;
    font-size: 14px;
  }

  .summary {
    font-size: 14px;
    color: #4A5568;
    background: #F7FAFC;
    padding: 20px;
    border-left: 4px solid #4A5568;
    margin-bottom: 30px;
  }

  .skill-group {
    margin-bottom: 15px;
  }

  .skill-group strong {
    font-size: 12px;
    text-transform: uppercase;
    display: block;
    margin-bottom: 5px;
    color: #718096;
  }

  .skill-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .skill-pill {
    font-size: 12px;
    background: #fff;
    border: 1px solid #E2E8F0;
    padding: 4px 10px;
    border-radius: 4px;
  }
</style>

<div class="resume-wrapper">
  <header>
    <h1>DERRICK S. TAN</h1>
    <div class="meta">
      Senior Project Manager | PMP | Austin, TX | +1 512-555-0917 | d.tan.pm@email.com
    </div>
  </header>

  <p class="summary">Analytical and systematic Project Manager with 10+ years of experience leading complex technical projects in the fintech sector. Specialist in Agile transformation, cross-functional resource allocation, and delivering high-stakes software products on time and within budget.</p>

  <section>
    <h2>Work History</h2>
    <div class="experience-item">
      <div class="item-header">
        <span>Director of Program Management</span>
        <span>2018 – Present</span>
      </div>
      <div class="company">FinSecure Corp | Austin, TX</div>
      <ul>
        <li>Directed the development and successful rollout of a major security upgrade across the entire banking platform, impacting 2M+ users.</li>
        <li>Spearheaded the organization's transition from Waterfall to Agile, improving feature delivery speed by 40% within the first year.</li>
        <li>Managed a $12M annual CapEx budget for technology infrastructure and software licensing.</li>
      </ul>
    </div>

    <div class="experience-item">
      <div class="item-header">
        <span>Senior IT Project Manager</span>
        <span>2012 – 2018</span>
      </div>
      <div class="company">Lumina Software | Plano, TX</div>
      <ul>
        <li>Led the successful migration of on-premise infrastructure to AWS, achieving a 99.9% uptime record over three years.</li>
        <li>Managed a globally distributed team of 25+ engineers across three time zones.</li>
      </ul>
    </div>
  </section>

  <div class="grid-2">
    <section>
      <h2>Core Methodology</h2>
      <div class="skill-group">
        <strong>Project Planning</strong>
        <div class="skill-list">
          <span class="skill-pill">Gantt Charts</span>
          <span class="skill-pill">Critical Path (CPM)</span>
          <span class="skill-pill">Risk Mitigation</span>
        </div>
      </div>
      <div class="skill-group">
        <strong>Agile / Scrum</strong>
        <div class="skill-list">
          <span class="skill-pill">Sprint Planning</span>
          <span class="skill-pill">Backlog Grooming</span>
          <span class="skill-pill">Scrum Master</span>
        </div>
      </div>
    </section>

    <section>
      <h2>Background</h2>
      <div class="experience-item" style="margin-bottom: 10px;">
        <div class="item-header">
          <span style="font-size: 14px;">B.S. in Systems Engineering</span>
          <span style="font-size: 13px; color: #718096;">2008 – 2012</span>
        </div>
        <div style="font-size: 13px;">UT Austin | Austin, TX</div>
      </div>
      <div style="font-size: 13px; font-weight: 700;">Project Management Professional (PMP)</div>
      <div style="font-size: 13px; font-weight: 700;">Certified Scrum Master (CSM)</div>
    </section>
  </div>
</div>
`;
};
