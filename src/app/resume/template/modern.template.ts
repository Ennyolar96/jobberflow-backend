export const modernTemplate = () => {
  return `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
  
  .resume-wrapper {
    font-family: 'Inter', sans-serif;
    color: #1a202c;
    line-height: 1.6;
    max-width: 850px;
    margin: 0 auto;
    padding: 40px;
    background: #fff;
  }

  header {
    border-bottom: 3px solid #3182ce;
    padding-bottom: 20px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  h1 {
    font-size: 36px;
    margin: 0;
    color: #2d3748;
    letter-spacing: -0.5px;
  }

  .header-info {
    text-align: right;
    font-size: 14px;
    color: #4a5568;
  }

  section {
    margin-bottom: 25px;
  }

  h2 {
    font-size: 18px;
    text-transform: uppercase;
    color: #3182ce;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 5px;
    margin-bottom: 15px;
    font-weight: 700;
  }

  .job-item {
    margin-bottom: 20px;
  }

  .job-header {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    color: #2d3748;
  }

  .job-title {
    color: #2b6cb0;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  ul {
    padding-left: 20px;
    margin: 5px 0;
  }

  li {
    margin-bottom: 5px;
  }
</style>

<div class="resume-wrapper">
  <header>
    <div>
      <h1>ALEX RIVERA</h1>
      <p class="job-title" style="font-size: 18px; font-weight: 600;">Senior Full Stack Engineer</p>
    </div>
    <div class="header-info">
      <p>San Francisco, CA</p>
      <p>alex.rivera@email.com | (555) 012-3456</p>
      <p>github.com/arivera | linkedin.com/in/arivera</p>
    </div>
  </header>

  <section id="summary">
    <h2>Professional Summary</h2>
    <p>Dynamic Software Engineer with over 8 years of experience building scalable web applications. Expert in React, Node.js, and cloud architecture, with a proven track record of improving system performance by 40% and leading cross-functional teams to deliver high-impact features.</p>
  </section>

  <section id="competencies">
    <h2>Core Competencies</h2>
    <div class="skills-grid">
      <div><strong>Languages:</strong> TypeScript, JavaScript, Python, Go</div>
      <div><strong>Frontend:</strong> React, Next.js, TailWind CSS, Redux</div>
      <div><strong>Backend:</strong> Node.js, GraphQL, PostgreSQL, Redis</div>
      <div><strong>Cloud:</strong> AWS (Lambda, S3, RDS), Docker, CI/CD</div>
    </div>
  </section>

  <section id="experience">
    <h2>Professional Experience</h2>
    <div class="job-item">
      <div class="job-header">
        <span>TechNova Solutions</span>
        <span>2020 – Present</span>
      </div>
      <div class="job-header">
        <span class="job-title">Lead Full Stack Engineer</span>
        <span>San Francisco, CA</span>
      </div>
      <ul>
        <li>Spearheaded the migration of a legacy monolithic architecture to microservices, reducing deployment time by 60%.</li>
        <li>Architected a real-time analytics dashboard using React and WebSockets, handling over 100k concurrent users.</li>
        <li>Mentored a team of 5 junior developers, conducting code reviews and implementing best practices for testing.</li>
      </ul>
    </div>
  </section>

  <section id="education">
    <h2>Education</h2>
    <div class="job-header">
      <span>University of California, Berkeley</span>
      <span>2012 – 2016</span>
    </div>
    <p>B.S. in Computer Science</p>
  </section>
</div>
`;
};

