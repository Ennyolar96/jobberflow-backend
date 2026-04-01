export const classicMinimalistTemplate = () => {
  return `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,700;1,400&display=swap');
  
  .resume-wrapper {
    font-family: 'Crimson Pro', serif;
    color: #1a1a1a;
    line-height: 1.6;
    max-width: 750px;
    margin: 0 auto;
    padding: 80px 40px;
    background: #fff;
    letter-spacing: 0.02em;
  }

  header {
    text-align: center;
    margin-bottom: 80px;
  }

  h1 {
    font-size: 32px;
    font-weight: 700;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 4px;
    border-bottom: 1px solid #1a1a1a;
    display: inline-block;
    padding-bottom: 10px;
  }

  .meta {
    margin-top: 30px;
    font-size: 15px;
    font-style: italic;
    color: #555;
  }

  section {
    margin-bottom: 50px;
  }

  h2 {
    font-size: 13px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 3px;
    color: #888;
    margin-bottom: 30px;
    display: block;
    text-align: center;
  }

  h2::before, h2::after {
    content: " — ";
    color: #ccc;
  }

  .item {
    margin-bottom: 35px;
  }

  .item-title {
    font-size: 19px;
    font-weight: 700;
    margin-bottom: 5px;
  }

  .item-meta {
    font-size: 16px;
    font-style: italic;
    color: #555;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
  }

  .item-content {
    font-size: 16px;
    text-align: justify;
  }

  ul {
    padding-left: 20px;
    list-style: square;
    margin-top: 10px;
  }

  li {
    margin-bottom: 8px;
  }

  .skills {
    column-count: 2;
    column-gap: 40px;
    font-size: 15px;
  }

  .skill-group {
    margin-bottom: 20px;
  }

  .skill-group strong {
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 1px;
    display: block;
    margin-bottom: 5px;
  }
</style>

<div class="resume-wrapper">
  <header>
    <h1>SIMON T. CALDWELL</h1>
    <div class="meta">
      Investigative Journalist | London, UK | s.caldwell@email.com | +44 77 0090 0124 | Portfolio: bit.ly/caldwell-journalism
    </div>
  </header>

  <section>
    <h2>the summary</h2>
    <div class="item-content">
      Award-winning investigative reporter with 15 years of experience uncovering high-level corporate corruption and international policy failures. Expertise in data-driven storytelling, open-source intelligence (OSINT), and complex financial reporting. Committed to the public interest and the rigorous pursuit of truth.
    </div>
  </section>

  <section>
    <h2>the experience</h2>
    <div class="item">
      <div class="item-title">Investigative Lead, International Bureau</div>
      <div class="item-meta">
        <span>The Global Post | London, UK</span>
        <span>2016 – Present</span>
      </div>
      <div class="item-content">
        <ul>
          <li>Led a cross-border investigation into offshore tax havens, revealing over $40B in hidden assets held by political elites across 20 countries.</li>
          <li>Directed the "Shadow Supply Chain" series, which successfully exposed human rights violations in the global electronics industry, leading to two major policy reforms.</li>
          <li>Managed a team of 10 data journalists and researchers in the production of complex, long-form investigations.</li>
        </ul>
      </div>
    </div>

    <div class="item">
      <div class="item-title">Senior Political Reporter</div>
      <div class="item-meta">
        <span>City Morning News | City, UK</span>
        <span>2010 – 2016</span>
      </div>
      <div class="item-content">
        <ul>
          <li>Awarded "Political Journalist of the Year" in 2014 for uncovering a major infrastructure funding scandal.</li>
          <li>Established the newsroom's first dedicated investigative unit focused on local government accountability.</li>
        </ul>
      </div>
    </div>
  </section>

  <section>
    <h2>the toolkit</h2>
    <div class="skills">
      <div class="skill-group">
        <strong>Research</strong>
        OSINT Tools, Document Leaks, Financial Auditing, Advanced Fact-Checking.
      </div>
      <div class="skill-group">
        <strong>Digital</strong>
        Data Visualization (D3.js), Python (Scraping), Cryptographic Communication.
      </div>
      <div class="skill-group">
        <strong>Writing</strong>
        Long-form Narrative, Hard News, Opinion Pieces, White Papers.
      </div>
      <div class="skill-group">
        <strong>Languages</strong>
        English (Native), French (Fluent), Russian (Conversational).
      </div>
    </div>
  </section>

  <section>
    <h2>the background</h2>
    <div class="item" style="margin-bottom: 0;">
      <div class="item-title">Master of Arts in International Relations</div>
      <div class="item-meta">
        <span>University of Oxford | 2008 – 2010</span>
      </div>
    </div>
  </section>
</div>
`;
};
