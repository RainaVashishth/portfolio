/**
 * RAINA VASHISHTH PORTFOLIO — MINIMAL INTERACTIVE ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
});

/* -------------------------------------------------------------
 * MOBILE NAVIGATION MENU
 * ------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isVisible = navMenu.style.display === 'flex';
    navMenu.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) {
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '64px';
      navMenu.style.left = '0';
      navMenu.style.width = '100%';
      navMenu.style.background = '#0d0f17';
      navMenu.style.padding = '1.5rem';
      navMenu.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
      navMenu.style.gap = '1rem';
    }
  });

  navMenu.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navMenu.style.display = 'none';
      }
    });
  });
}

/* -------------------------------------------------------------
 * PROJECT MODAL DETAILS
 * ------------------------------------------------------------- */
const projectsData = {
  moodify: {
    title: "Moodify — AI-Powered Music Discovery",
    year: "2024",
    category: "Natural Language Processing & Web Development",
    img: "assets/project-moodify.png",
    overview: "Moodify connects free-form user mood descriptions with the Spotify catalog through an NLP classification pipeline, producing tailored playlist recommendations.",
    highlights: [
      "Integrated Spotify Web API with OAuth 2.0 authorization to access user listening history and track audio features (valence, tempo, acousticness, energy).",
      "Engineered an NLP text-processing pipeline that parses subjective mood descriptions and clusters them into acoustic attribute targets.",
      "Built a responsive React interface with interactive audio preview players, album artwork displays, and 1-click Spotify playlist export.",
      "Prototyped the end-to-end design system and user flows in Figma."
    ],
    techStack: ["Python", "NLP", "Spotify Web API", "React.js", "Figma", "REST API"],
    githubUrl: "https://github.com/RainaVashishth"
  },
  flight: {
    title: "Weather & Flight Delay Prediction Pipeline",
    year: "2024",
    category: "Machine Learning, Analytics & EDA",
    img: "assets/project-flight.png",
    overview: "A machine learning and data science investigation analyzing the statistical impact of adverse weather events on commercial flight delays.",
    highlights: [
      "Aggregated and cleaned large-scale historical flight records and meteorological measurements (visibility, precipitation, wind speed, pressure).",
      "Conducted extensive Exploratory Data Analysis (EDA) in Python using Pandas, NumPy, and Matplotlib to identify high-variance delay triggers.",
      "Engineered delay probability indices and trained supervised classification models to predict delay likelihood across hub airports and carriers.",
      "Generated analytical distribution plots illustrating delay risk across seasonal storm patterns and peak flight hours."
    ],
    techStack: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-Learn", "Jupyter Notebook"],
    githubUrl: "https://github.com/RainaVashishth"
  },
  sales: {
    title: "Sales Analytics & Business Intelligence Dashboard",
    year: "2024",
    category: "Business Intelligence, SQL & Data Modeling",
    img: "assets/project-sales.png",
    overview: "An enterprise-grade interactive Business Intelligence suite built to provide commercial visibility into revenue growth, product margins, and customer purchasing behaviors.",
    highlights: [
      "Extracted, sanitized, and transformed multi-thousand transaction datasets using Excel and relational SQL queries.",
      "Modeled relational schemas and wrote custom DAX measures for profit margin tracking, monthly growth rates, and regional revenue benchmarks.",
      "Built interactive Power BI dashboards with multi-level drill-downs by region, product category, and customer cohorts.",
      "Identified key regional revenue drops and top-performing SKU clusters to support data-backed business decisions."
    ],
    techStack: ["Power BI", "SQL", "Microsoft Excel", "DAX", "Data Modeling"],
    githubUrl: "https://github.com/RainaVashishth"
  }
};

function openProjectModal(key) {
  const p = projectsData[key];
  if (!p) return;

  const modal = document.getElementById('projectModal');
  const content = document.getElementById('modalContent');

  content.innerHTML = `
    <div style="margin-bottom: 1.25rem;">
      <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-purple-light); background: var(--accent-purple-dim); padding: 0.2rem 0.6rem; border-radius: 4px;">${p.year} · ${p.category}</span>
      <h2 style="font-size: 1.5rem; font-weight: 700; color: #fff; margin-top: 0.5rem; letter-spacing: -0.01em;">${p.title}</h2>
    </div>

    <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.25rem; border: 1px solid var(--border-light); max-height: 250px;">
      <img src="${p.img}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>

    <p style="color: var(--text-body); font-size: 0.92rem; margin-bottom: 1.25rem; line-height: 1.6;">${p.overview}</p>

    <h4 style="font-size: 0.85rem; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.6rem;">Key Highlights & Methodology</h4>
    <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.45rem; margin-bottom: 1.25rem;">
      ${p.highlights.map(h => `<li style="font-size: 0.85rem; color: var(--text-body); position: relative; padding-left: 1rem; line-height: 1.5;"><span style="position: absolute; left: 0; color: var(--accent-purple-light);">•</span> ${h}</li>`).join('')}
    </ul>

    <h4 style="font-size: 0.85rem; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">Tools & Libraries</h4>
    <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem;">
      ${p.techStack.map(t => `<span style="font-family: var(--font-mono); font-size: 0.72rem; background: var(--bg-subtle); border: 1px solid var(--border-light); color: #cbd5e1; padding: 0.2rem 0.55rem; border-radius: 4px;">${t}</span>`).join('')}
    </div>

    <div style="display: flex; gap: 0.75rem; align-items: center; border-top: 1px solid var(--border-light); padding-top: 1.25rem;">
      <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
        <i data-lucide="github"></i>
        <span>View on GitHub</span>
      </a>
      <button class="btn btn-sm btn-secondary" onclick="closeProjectModalDirect()">Close</button>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

function closeProjectModal(event) {
  if (event.target === document.getElementById('projectModal')) {
    closeProjectModalDirect();
  }
}

function closeProjectModalDirect() {
  const modal = document.getElementById('projectModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

/* -------------------------------------------------------------
 * COPY EMAIL TO CLIPBOARD
 * ------------------------------------------------------------- */
function copyEmailToClipboard() {
  const email = "rainavash92@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    const btnText = document.getElementById('copyBtnText');
    const copyBtn = document.getElementById('copyEmailBtn');
    
    if (btnText && copyBtn) {
      const originalText = btnText.textContent;
      btnText.textContent = "Copied!";
      copyBtn.style.background = "#8b5cf6";
      copyBtn.style.color = "#ffffff";

      setTimeout(() => {
        btnText.textContent = originalText;
        copyBtn.style.background = "";
        copyBtn.style.color = "";
      }, 2000);
    }
  });
}
