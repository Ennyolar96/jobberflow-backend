"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creativeMinimalistTemplate = void 0;
const creativeMinimalistTemplate = () => {
    return `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;700&family=JetBrains+Mono&display=swap');
  
  .resume-wrapper {
    font-family: 'Space Grotesk', sans-serif;
    color: #1a1a1a;
    line-height: 1.4;
    max-width: 800px;
    margin: 0 auto;
    padding: 60px;
    background: #fff;
    border-top: 20px solid #ef4444;
  }

  header {
    margin-bottom: 60px;
  }

  h1 {
    font-size: 48px;
    font-weight: 700;
    margin: 0;
    letter-spacing: -2px;
    line-height: 0.9;
  }

  .title {
    font-size: 20px;
    font-weight: 300;
    color: #64748b;
    margin-top: 10px;
  }

  .meta {
    font-size: 14px;
    margin-top: 30px;
    display: flex;
    gap: 20px;
  }

  section {
    margin-bottom: 50px;
  }

  h2 {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 4px;
    color: #ef4444;
    margin-bottom: 25px;
  }

  .item {
    margin-bottom: 35px;
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 30px;
  }

  .item-date {
    font-size: 14px;
    color: #94a3b8;
    text-align: right;
    padding-top: 3px;
  }

  .item-role {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .item-org {
    font-size: 16px;
    color: #636e72;
    margin-bottom: 12px;
  }

  ul {
    padding: 0;
    list-style: none;
    margin-top: 12px;
  }

  li {
    margin-bottom: 10px;
    font-size: 15px;
    position: relative;
    padding-left: 20px;
  }

  li::before {
    content: "→";
    position: absolute;
    left: 0;
    color: #ef4444;
  }

  .tech-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    font-family: 'JetBrains Mono', monospace;
  }

  .tech-pill {
    font-size: 12px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 6px 12px;
    border-radius: 4px;
  }

  .hero-p {
    font-size: 18px;
    line-height: 1.6;
    max-width: 650px;
    margin-bottom: 50px;
  }
</style>

<div class="resume-wrapper">
  <header>
    <h1>ETHAN V. REED</h1>
    <div class="title">Senior Frontend Engineer & UI Designer</div>
    <div class="meta">
      <div>Brooklyn, NY</div>
      <div>ethan-reed.dev</div>
      <div>ethan.reed@email.com</div>
      <div>github.com/ereed-dev</div>
    </div>
  </header>

  <p class="hero-p">I build immersive, performant, and accessible digital experiences using modern web technologies. With 7+ years of experience bridging the gap between high-level design and scalable frontend code, I focus on system-level components, motion design, and user experience excellence.</p>

  <section>
    <h2>the journey</h2>
    <div class="item">
      <div class="item-date">2020 — PRESENT</div>
      <div class="item-content">
        <div class="item-role">Senior Frontend Lead</div>
        <div class="item-org">DesignSystems.io | Remote</div>
        <ul>
          <li>Leading the development of a highly modular, multi-brand design system used by over 30 external clients, improving frontend dev speed by 50%.</li>
          <li>Developing custom motion libraries using Framer Motion and Three.js for interactive landing pages and complex data visualizations.</li>
          <li>Spearheaded a performance-first initiative that reduced core web vitals (LCP) by 40% across existing client portfolios.</li>
        </ul>
      </div>
    </div>

    <div class="item">
      <div class="item-date">2016 — 2020</div>
      <div class="item-content">
        <div class="item-role">Frontend Engineer</div>
        <div class="item-org">Aether Apps | Brooklyn, NY</div>
        <ul>
          <li>Collaborated with design teams to translate complex Figma mockups into pixel-perfect React components.</li>
          <li>Optimized legacy React applications for accessibility (WCAG 2.1 compliance) and internationalization.</li>
        </ul>
      </div>
    </div>
  </section>

  <section>
    <h2>the stack</h2>
    <div class="tech-pills">
      <span class="tech-pill">React</span>
      <span class="tech-pill">Next.js</span>
      <span class="tech-pill">TypeScript</span>
      <span class="tech-pill">Framer Motion</span>
      <span class="tech-pill">Three.js</span>
      <span class="tech-pill">Tailwind CSS</span>
      <span class="tech-pill">GraphQL</span>
      <span class="tech-pill">Redux Toolkit</span>
      <span class="tech-pill">Jest / Vitest</span>
      <span class="tech-pill">Storybook</span>
    </div>
  </section>

  <section>
    <h2>background</h2>
    <div class="item" style="margin-bottom: 0;">
      <div class="item-date">2012 — 2016</div>
      <div class="item-content">
        <div class="item-role">BFA in Digital Media & Design</div>
        <div class="item-org">Pratt Institute | Brooklyn, NY</div>
      </div>
    </div>
  </section>
</div>
`;
};
exports.creativeMinimalistTemplate = creativeMinimalistTemplate;
//# sourceMappingURL=creative_minimalist.template.js.map