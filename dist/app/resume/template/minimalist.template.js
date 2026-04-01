"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minimalistTemplate = void 0;
const minimalistTemplate = () => {
    return `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@300;400;700&display=swap');
  
  .resume-wrapper {
    font-family: 'Gothic A1', sans-serif;
    color: #000;
    line-height: 1.8;
    max-width: 800px;
    margin: 0 auto;
    padding: 80px 60px;
    background: #fff;
    letter-spacing: 0.05em;
  }

  header {
    margin-bottom: 80px;
  }

  h1 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 5px;
    text-transform: uppercase;
  }

  .title {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #888;
  }

  .contact {
    margin-top: 30px;
    font-size: 12px;
    color: #888;
  }

  section {
    margin-bottom: 50px;
  }

  h2 {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    margin-bottom: 30px;
    color: #000;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }

  .item {
    margin-bottom: 30px;
    display: flex;
  }

  .item-date {
    width: 150px;
    font-size: 12px;
    color: #888;
  }

  .item-content {
    flex: 1;
  }

  .item-title {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 5px;
  }

  .item-org {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 15px;
  }

  .summary {
    font-size: 15px;
    color: #333;
    max-width: 600px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-top: 10px;
  }

  li {
    font-size: 13px;
    margin-bottom: 10px;
    position: relative;
    padding-left: 20px;
  }

  li::before {
    content: "—";
    position: absolute;
    left: 0;
    color: #ccc;
  }

  .skill-list {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }

  .skill-item {
    font-size: 13px;
  }
</style>

<div class="resume-wrapper">
  <header>
    <h1>ARTHUR VOSS</h1>
    <div class="title">Architectural Designer</div>
    <div class="contact">
      Berlin, DE • arthurvoss@email.com • +49 30 5550212 • arthurvoss.studio
    </div>
  </header>

  <section>
    <h2>Introduction</h2>
    <p class="summary">Focusing on the intersection of urbanism and sustainable design, I create spaces that harmonize with their environment. 10 years of international practice in Berlin and Tokyo, specializing in high-performance building envelopes and minimalist residential interiors.</p>
  </section>

  <section id="experience">
    <h2>Select Projects</h2>
    <div class="item">
      <div class="item-date">2018 — PRESENT</div>
      <div class="item-content">
        <div class="item-title">Senior Project Lead</div>
        <div class="item-org">Studio Bauhaus, Berlin</div>
        <ul>
          <li>Led the schematic design and detailing of the "Green Horizon" mixed-use development, a 20,000 sqm net-zero project.</li>
          <li>Supervised a team of 8 architects through all phases of delivery, from initial competition to construction administration.</li>
          <li>Pioneered the use of mass timber structural systems in urban residential contexts.</li>
        </ul>
      </div>
    </div>

    <div class="item">
      <div class="item-date">2014 — 2018</div>
      <div class="item-content">
        <div class="item-title">Junior Architect</div>
        <div class="item-org">Yamazaki Associates, Tokyo</div>
        <ul>
          <li>Collaborated on the award-winning "Cedar House" project, focusing on seamless indoor-outdoor transitions.</li>
          <li>Detailed complex joinery systems for high-end boutique retail spaces in Ginza.</li>
        </ul>
      </div>
    </div>
  </section>

  <section id="education">
    <h2>academic</h2>
    <div class="item">
      <div class="item-date">2012 — 2014</div>
      <div class="item-content">
        <div class="item-title">Master of Architecture (M.Arch)</div>
        <div class="item-org">ETH Zurich</div>
      </div>
    </div>
  </section>

  <section id="skills">
    <h2>Proficiencies</h2>
    <div class="skill-list">
      <div class="skill-item">Revit / BIM</div>
      <div class="skill-item">Rhino / Grasshopper</div>
      <div class="skill-item">V-Ray Render</div>
      <div class="skill-item">Sustainable Tech</div>
      <div class="skill-item">Project Management</div>
    </div>
  </section>
</div>
`;
};
exports.minimalistTemplate = minimalistTemplate;
//# sourceMappingURL=minimalist.template.js.map