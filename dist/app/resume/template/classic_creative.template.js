"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classicCreativeTemplate = void 0;
const classicCreativeTemplate = () => {
    return `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Work+Sans:wght@300;400;600&display=swap');
  
  .resume-wrapper {
    font-family: 'Work Sans', sans-serif;
    color: #2D3436;
    line-height: 1.6;
    max-width: 850px;
    margin: 0 auto;
    padding: 60px;
    background: #fff;
    border-top: 15px solid #2d3436;
  }

  header {
    text-align: center;
    margin-bottom: 60px;
  }

  h1 {
    font-family: 'Libre Baskerville', serif;
    font-size: 42px;
    font-weight: 700;
    margin: 0;
    letter-spacing: -2px;
  }

  .subtitle {
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 5px;
    color: #636e72;
    margin-top: 5px;
  }

  .contact {
    margin-top: 25px;
    font-size: 13px;
    color: #b2bec3;
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  section {
    margin-bottom: 50px;
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 30px;
  }

  h2 {
    font-family: 'Libre Baskerville', serif;
    font-size: 15px;
    font-weight: 700;
    text-transform: uppercase;
    color: #2D3436;
    border-left: 2px solid #fdcb6e;
    padding-left: 15px;
    margin: 0;
  }

  .content-item {
    margin-bottom: 30px;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 5px;
  }

  .company {
    font-size: 16px;
    color: #636e72;
    font-weight: 400;
    margin-bottom: 12px;
  }

  .date {
    font-size: 14px;
    color: #b2bec3;
  }

  ul {
    padding-left: 20px;
    margin-top: 10px;
  }

  li {
    margin-bottom: 8px;
    font-size: 15px;
  }

  .narrative {
    font-family: 'Libre Baskerville', serif;
    font-size: 18px;
    line-height: 1.8;
    font-style: italic;
    color: #2D3436;
    margin-top: 0;
  }

  .tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .tag {
    background: #f1f2f6;
    padding: 5px 12px;
    border-radius: 4px;
    font-size: 13px;
    color: #2D3436;
  }
</style>

<div class="resume-wrapper">
  <header>
    <h1>ELIZA R. MOREAU</h1>
    <div class="subtitle">Content Strategist & Editorial Director</div>
    <div class="contact">
      New York, NY | eliza.moreau@email.com | +1 646-555-0129 | elizamoreau.com
    </div>
  </header>

  <section>
    <h2>the philosophy</h2>
    <p class="narrative">"I believe that storytelling is the most powerful tool in a brand's arsenal. In a world of fleeting attention, depth and narrative resonance are what build enduring relationships."</p>
  </section>

  <section>
    <h2>the experience</h2>
    <div class="content">
      <div class="content-item">
        <div class="item-header">
          <span>Editorial Director</span>
          <span class="date">2019 – Present</span>
        </div>
        <div class="company">LUMEN MEDIA PARTNERS | New York, NY</div>
        <ul>
          <li>Orchestrated the content strategy for a portfolio of 5 high-end lifestyle publications, reaching a combined audience of 1.2M monthly readers.</li>
          <li>Transformed the company's digital distribution model, increasing organic traffic by 65% and improving time-on-site by 40%.</li>
          <li>Managed a global network of 40+ freelance contributors, ensuring high editorial standards and diverse perspectives.</li>
        </ul>
      </div>

      <div class="content-item">
        <div class="item-header">
          <span>Senior Content Strategist</span>
          <span class="date">2014 – 2019</span>
        </div>
        <div class="company">SAGE & STONE AGENCY | Brooklyn, NY</div>
        <ul>
          <li>Developed multi-channel content roadmaps for Fortune 500 beauty and wellness brands, focusing on authentic brand storytelling and user engagement.</li>
          <li>Led the creative direction for social-first campaigns that achieved record-breaking engagement metrics for the agency.</li>
        </ul>
      </div>
    </div>
  </section>

  <section>
    <h2>the toolkit</h2>
    <div class="tag-cloud">
      <span class="tag">Editorial Planning</span>
      <span class="tag">Brand Voice Development</span>
      <span class="tag">SEO Strategy</span>
      <span class="tag">Digital Content Lifecycle</span>
      <span class="tag">Audience Analytics</span>
      <span class="tag">Cross-Platform Delivery</span>
      <span class="tag">Narrative Design</span>
      <span class="tag">CMS Architecture</span>
    </div>
  </section>

  <section>
    <h2>the background</h2>
    <div class="content">
      <div class="content-item" style="margin-bottom: 0;">
        <div class="item-header">
          <span>M.A. in Journalism & Digital Media</span>
          <span class="date">2012 – 2014</span>
        </div>
        <div class="company">COLUMBIA UNIVERSITY | New York, NY</div>
      </div>
    </div>
  </section>
</div>
`;
};
exports.classicCreativeTemplate = classicCreativeTemplate;
//# sourceMappingURL=classic_creative.template.js.map