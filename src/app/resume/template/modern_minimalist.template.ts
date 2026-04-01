export const modernMinimalistTemplate = () => {
  return `
<style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Karla:wght@300;400;700&display=swap');
  
  .resume-wrapper {
    font-family: 'Karla', sans-serif;
    color: #2D3436;
    line-height: 1.4;
    max-width: 800px;
    margin: 0 auto;
    padding: 60px;
    background: #FAFAFA;
    border: 1px solid #E0E0E0;
  }

  header {
    margin-bottom: 50px;
  }

  h1 {
    font-size: 32px;
    font-weight: 700;
    margin: 0;
    color: #1a1a1a;
  }

  .title {
    font-size: 16px;
    font-weight: 300;
    color: #2b6cb0;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-top: 5px;
  }

  .meta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    margin-top: 15px;
    color: #636e72;
  }

  section {
    margin-bottom: 35px;
  }

  h2 {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: #a4b0be;
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 8px;
    margin-bottom: 20px;
  }

  .experience-grid {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 20px;
    margin-bottom: 25px;
  }

  .date {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: #636e72;
    padding-top: 4px;
  }

  .role {
    font-weight: 700;
    font-size: 17px;
    color: #1a1a1a;
    margin-bottom: 4px;
  }

  .org {
    font-weight: 400;
    font-size: 15px;
    color: #2b6cb0;
    margin-bottom: 12px;
  }

  ul {
    padding-left: 20px;
    margin-top: 8px;
  }

  li {
    margin-bottom: 6px;
    font-size: 14.5px;
    color: #2c3e50;
  }

  .tech-stack {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
  }

  .tech-item {
    background: #fff;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  .bold {
    font-weight: 700;
    color: #2b6cb0;
  }
</style>

<div class="resume-wrapper">
  <header>
    <h1>NINA SHAW</h1>
    <div class="title">Lead Data Scientist</div>
    <div class="meta">
      [location: Seattle, WA] [email: n.shaw.ds@email.com] [github: bit.ly/nshaw-ds] [scholar: Shaw_N_2024]
    </div>
  </header>

  <section>
    <h2>Core Objective</h2>
    <p style="font-size: 15px; max-width: 650px;">Applying advanced machine learning techniques to solve complex business challenges. Expertise in neural network optimization, predictive modeling, and data pipelines. 8+ years experience turning petabytes of data into actionable insights.</p>
  </section>

  <section>
    <h2>Experience</h2>
    <div class="experience-grid">
      <div class="date">2020 — PRESENT</div>
      <div class="experience-content">
        <div class="role">Principal Data Scientist</div>
        <div class="org">Datastream AI, Seattle</div>
        <ul>
          <li>Engineered a custom recommendation engine using Transformer models, boosting user engagement by 22% and improving conversion rates by 14%.</li>
          <li>Optimized distributed training pipelines on AWS SageMaker, reducing model training time by 45% and lowering cloud costs by $200k/year.</li>
          <li>Communicated complex insights to the executive team, directly influencing the product roadmap for the 2024 fiscal year.</li>
        </ul>
      </div>
    </div>

    <div class="experience-grid">
      <div class="date">2016 — 2020</div>
      <div class="experience-content">
        <div class="role">Senior ML Engineer</div>
        <div class="org">Pacific Cloud Systems, Bellevue</div>
        <ul>
          <li>Developed anomaly detection algorithms for cloud infrastructure, achieving a 98.5% precision rate in identifying security threats.</li>
          <li>Contributed to the company's internal open-source library for automated feature engineering.</li>
        </ul>
      </div>
    </div>
  </section>

  <section>
    <h2>Technical Matrix</h2>
    <div class="tech-stack">
      <div class="tech-item"><span class="bold">Languages:</span> Python, R, Scala, SQL</div>
      <div class="tech-item"><span class="bold">Frameworks:</span> PyTorch, TensorFlow, Scikit-learn, Spark</div>
      <div class="tech-item"><span class="bold">Cloud:</span> AWS, GCP, Docker, Kubernetes</div>
      <div class="tech-item"><span class="bold">NLP/CV:</span> BERT, ResNet, NLTK, OpenCV</div>
      <div class="tech-item"><span class="bold">Visualization:</span> Plotly, Tableau, Seaborn, Matplotlib</div>
      <div class="tech-item"><span class="bold">Statistics:</span> Bayesian Inf, A/B Testing, Time Series</div>
    </div>
  </section>

  <section>
    <h2>Academic Background</h2>
    <div class="experience-grid">
      <div class="date">2014 — 2016</div>
      <div class="experience-content">
        <div class="role">M.S. in Applied Mathematics</div>
        <div class="org">University of Washington</div>
      </div>
    </div>
  </section>
</div>
`;
};
