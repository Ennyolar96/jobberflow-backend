export const creativeTemplate = () => {
  return `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&family=Karla:wght@400;600&display=swap');
  
  .resume-wrapper {
    font-family: 'Karla', sans-serif;
    color: #2D3436;
    line-height: 1.5;
    max-width: 900px;
    margin: 0 auto;
    background: #fff;
    display: flex;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  }

  .sidebar {
    background: #6C5CE7;
    color: #fff;
    width: 35%;
    padding: 60px 40px;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    width: 65%;
    padding: 60px 50px;
  }

  h1 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    font-size: 52px;
    line-height: 1;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #FF7675, #6C5CE7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .intro {
    font-size: 18px;
    font-weight: 600;
    color: #3182ce;
    margin-bottom: 30px;
  }

  h2 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 8px;
  }

  .main-content h2 {
    color: #2D3436;
    border-bottom: 4px solid #fab1a0;
    display: inline-block;
  }

  .sidebar h2 {
    color: #fab1a0;
    border-bottom: 2px solid rgba(255,255,255,0.2);
    display: block;
  }

  .experience-item {
    margin-bottom: 30px;
  }

  .item-title {
    font-weight: 800;
    font-size: 18px;
    margin-bottom: 5px;
  }

  .item-meta {
    font-weight: 600;
    color: #636E72;
    margin-bottom: 15px;
    font-size: 14px;
  }

  .sidebar-section {
    margin-bottom: 45px;
  }

  .contact-info p {
    font-size: 13px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
  }

  .sidebar li {
    margin-bottom: 10px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .skill-dot {
    width: 60px;
    height: 8px;
    background: rgba(255,255,255,0.2);
    border-radius: 4px;
    position: relative;
  }

  .skill-progress {
    position: absolute;
    height: 100%;
    border-radius: 4px;
    background: #FAB1A0;
  }

  ul {
    padding-left: 20px;
  }

  li {
    margin-bottom: 8px;
  }
</style>

<div class="resume-wrapper">
  <div class="sidebar">
    <div class="sidebar-section">
      <h2>Contact</h2>
      <div class="contact-info">
        <p>Los Angeles, CA</p>
        <p>m.chen.design@email.com</p>
        <p>+1 310-555-0812</p>
        <p>behance.net/mayachen</p>
        <p>mayachen.design</p>
      </div>
    </div>

    <div class="sidebar-section">
      <h2>Expertise</h2>
      <ul>
        <li>UI Design <div class="skill-dot"><div class="skill-progress" style="width: 95%;"></div></div></li>
        <li>UX Strategy <div class="skill-dot"><div class="skill-progress" style="width: 90%;"></div></div></li>
        <li>Prototyping <div class="skill-dot"><div class="skill-progress" style="width: 85%;"></div></div></li>
        <li>Motion Graphics <div class="skill-dot"><div class="skill-progress" style="width: 70%;"></div></div></li>
        <li>Visual Styling <div class="skill-dot"><div class="skill-progress" style="width: 95%;"></div></div></li>
      </ul>
    </div>

    <div class="sidebar-section">
      <h2>Stack</h2>
      <p style="font-size: 14px; line-height: 1.8;">Figma, Adobe Creative Suite (Ps, Ai, Ae), Sketch, Webflow, Zeplin, InVision, HTML/CSS.</p>
    </div>

    <div class="sidebar-section">
      <h2>Education</h2>
      <p style="margin: 0; font-weight: 700;">Bachelor of Fine Arts (BFA)</p>
      <p style="margin: 0; font-size: 14px; opacity: 0.8;">In Graphic Design</p>
      <p style="margin: 0; font-size: 14px; opacity: 0.8;">RISD | 2012–2016</p>
    </div>
  </div>

  <div class="main-content">
    <h1>MAYA CHEN</h1>
    <p class="intro">Senior Visual & Experience Designer</p>
    
    <p style="margin-bottom: 40px; font-size: 15px;">Award-winning Creative Lead with 7+ years of experience crafting digital products for global brands. Obsessed with the intersection of aesthetics and functionality, I help companies tell their stories through intuitive interfaces and delightful user journeys.</p>

    <div class="sidebar-section">
      <h2>Experience</h2>
      <div class="experience-item">
        <div class="item-title">Senior UX Designer</div>
        <div class="item-meta">CreativePulse Studios | 2019 – Present</div>
        <ul>
          <li>Led the redesign of a national eCommerce platform, resulting in a 35% increase in mobile conversion rates.</li>
          <li>Developed a comprehensive design system adopted by 15+ product teams, saving over 400 design hours monthly.</li>
          <li>Facilitated weekly stakeholder workshops to align product vision with user research findings.</li>
        </ul>
      </div>

      <div class="experience-item">
        <div class="item-title">Visual Designer</div>
        <div class="item-meta">Pixel Perfect Agency | 2016 – 2019</div>
        <ul>
          <li>Crafted visual identities and brand guidelines for 20+ startups, from logo design to multi-channel marketing assets.</li>
          <li>Collaborated with frontend developers to ensure 100% fidelity in design implementations.</li>
          <li>Awarded "Agency MVP" in 2018 for work on the award-winning "Green Earth" campaign.</li>
        </ul>
      </div>
    </div>

    <div class="sidebar-section">
      <h2>Recognition</h2>
      <div class="experience-item" style="margin-bottom: 10px;">
        <div class="item-title" style="font-size: 15px;">Awwwards Site of the Day (2021)</div>
        <div class="item-meta">For the "Voyager" Immersive Experience</div>
      </div>
      <div class="experience-item" style="margin-bottom: 10px;">
        <div class="item-title" style="font-size: 15px;">Clio Award Silver Participant (2018)</div>
        <div class="item-meta">Excellence in Brand Identity</div>
      </div>
    </div>
  </div>
</div>
`;
};
