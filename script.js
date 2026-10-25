/**
 * RAINA VASHISHTH PORTFOLIO — INTERACTIVE ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

  // Initialize features
  initMouseGlow();
  initStatsCounter();
  initMobileMenu();
  initRoleSwitcher();
  initResumeModal();
});

/* -------------------------------------------------------------
 * MOUSE GLOW FOLLOWER
 * ------------------------------------------------------------- */
function initMouseGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.innerWidth < 768) return;

  window.addEventListener('mousemove', (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });
}

/* -------------------------------------------------------------
 * STATS COUNTERS (Intersection Observer)
 * ------------------------------------------------------------- */
function initStatsCounter() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const decimals = parseInt(counter.getAttribute('data-decimal') || '0', 10);
          const duration = 1800; // ms
          const start = 0;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = start + (target - start) * easeOut;

            counter.textContent = currentVal.toFixed(decimals);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toFixed(decimals);
            }
          }

          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsStrip = document.querySelector('.stats-strip');
  if (statsStrip) observer.observe(statsStrip);
}

/* -------------------------------------------------------------
 * MOBILE NAVIGATION MENU
 * ------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

/* -------------------------------------------------------------
 * DYNAMIC ROLE TITLE CYCLER
 * ------------------------------------------------------------- */
function initRoleSwitcher() {
  const roleEl = document.getElementById('dynamicRole');
  if (!roleEl) return;

  const roles = ["DATA ANALYST", "AI / ML SPECIALIST", "BUSINESS ANALYST", "CREATIVE TECH"];
  let index = 0;

  setInterval(() => {
    index = (index + 1) % roles.length;
    roleEl.style.opacity = '0';
    roleEl.style.transform = 'translateY(10px)';
    roleEl.style.transition = 'all 0.3s ease';

    setTimeout(() => {
      roleEl.textContent = roles[index];
      roleEl.style.opacity = '1';
      roleEl.style.transform = 'translateY(0)';
    }, 300);
  }, 4000);
}

/* -------------------------------------------------------------
 * PROJECT MODAL DETAILS
 * ------------------------------------------------------------- */
const projectsData = {
  moodify: {
    title: "Moodify — AI-Powered Music Recommendation Platform",
    year: "2024",
    category: "AI, NLP & Full-Stack Web Development",
    img: "assets/project-moodify.png",
    overview: "Moodify is an intelligent music discovery platform that reads a user's emotional state through natural language and automatically generates personalized Spotify playlists.",
    highlights: [
      "Integrated Spotify Web API with OAuth authorization to retrieve user listening history, top genres, and acoustic attributes (valence, danceability, energy).",
      "Built an NLP-based sentiment and mood classification pipeline that interprets complex free-text descriptions (e.g., 'chill rainy evening thoughts') and maps them into audio feature clusters.",
      "Designed an aesthetic, dark-mode mood-board UI in Figma and engineered a responsive, high-performance React frontend.",
      "Included dynamic playback previews, audio wave visualizers, and direct playlist export to users' personal Spotify accounts."
    ],
    techStack: ["Python", "NLP", "Spotify Web API", "React.js", "Figma", "Tailwind CSS"],
    githubUrl: "https://github.com/RainaVashishth"
  },
  flight: {
    title: "Weather & Flight Delay Prediction System",
    year: "2024",
    category: "Data Analytics, Machine Learning & Feature Engineering",
    img: "assets/project-flight.png",
    overview: "A comprehensive machine learning and exploratory data analysis initiative that analyzes the correlation between severe weather phenomena and commercial aviation delays.",
    highlights: [
      "Aggregated and scrubbed large datasets encompassing historical flight logs, airport hubs, and NOAA weather measurements (precipitation, crosswinds, visibility, pressure).",
      "Conducted extensive Exploratory Data Analysis (EDA) in Python using Pandas, NumPy, and Matplotlib to isolate high-variance delay triggers.",
      "Engineered delay probability indices and trained supervised classification models (Logistic Regression, Random Forest) to predict delay risks.",
      "Visualized delay distributions across peak hours, seasonal storms, and high-traffic airports with clear diagnostic plots."
    ],
    techStack: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-Learn", "Jupyter Notebook"],
    githubUrl: "https://github.com/RainaVashishth"
  },
  sales: {
    title: "Sales Analytics & Business Intelligence Dashboard",
    year: "2024",
    category: "Business Intelligence, SQL & Data Visualization",
    img: "assets/project-sales.png",
    overview: "An enterprise-grade interactive Business Intelligence dashboard designed to deliver actionable revenue intelligence and customer trend analytics for executive decision-makers.",
    highlights: [
      "Extracted, sanitized, and modeled multi-thousand transaction datasets from Excel and relational SQL databases.",
      "Designed dynamic Power BI dashboard pages with custom DAX calculations, profit margin tracking, and revenue growth benchmarks.",
      "Implemented multi-dimensional slicers, drill-downs by region, product categories, and customer cohorts.",
      "Streamlined data reporting workflows to identify high-margin SKUs and regional revenue drop-offs."
    ],
    techStack: ["Power BI", "SQL", "DAX", "Microsoft Excel", "Data Warehousing"],
    githubUrl: "https://github.com/RainaVashishth"
  }
};

function openProjectModal(key) {
  const p = projectsData[key];
  if (!p) return;

  const modal = document.getElementById('projectModal');
  const content = document.getElementById('modalContent');

  content.innerHTML = `
    <div style="margin-bottom: 1.5rem;">
      <span class="project-year-badge">${p.year} • ${p.category}</span>
      <h2 style="font-family: var(--font-display); font-size: 2.2rem; color: #fff; margin-top: 0.5rem; letter-spacing: 0.04em;">${p.title}</h2>
    </div>

    <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.5rem; border: 1px solid var(--border-subtle); max-height: 280px;">
      <img src="${p.img}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>

    <p style="color: var(--purple-pastel); font-size: 1rem; margin-bottom: 1.25rem; font-weight: 500; line-height: 1.6;">${p.overview}</p>

    <h4 style="font-family: var(--font-display); font-size: 1.3rem; color: #fff; letter-spacing: 0.04em; margin-bottom: 0.75rem;">KEY CONTRIBUTIONS & METHODOLOGY</h4>
    <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1.75rem;">
      ${p.highlights.map(h => `<li style="font-size: 0.92rem; color: var(--text-muted); position: relative; padding-left: 1.25rem;"><span style="position: absolute; left: 0; color: var(--purple-light);">▹</span> ${h}</li>`).join('')}
    </ul>

    <h4 style="font-family: var(--font-display); font-size: 1.3rem; color: #fff; letter-spacing: 0.04em; margin-bottom: 0.75rem;">TECHNOLOGY STACK</h4>
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
      ${p.techStack.map(t => `<span class="tech-tag" style="background: rgba(168, 85, 247, 0.15); border-color: rgba(168, 85, 247, 0.3); color: #fff;">${t}</span>`).join('')}
    </div>

    <div style="display: flex; gap: 1rem; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 1.25rem;">
      <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-purple">
        <i data-lucide="github"></i>
        <span>View on GitHub</span>
      </a>
      <button class="btn btn-outline" onclick="closeProjectModalDirect()">Close</button>
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
 * RESUME MODAL
 * ------------------------------------------------------------- */
function initResumeModal() {
  const openBtn = document.getElementById('openResumeBtn');
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      const modal = document.getElementById('resumeModal');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      lucide.createIcons();
    });
  }
}

function closeResumeModal(event) {
  if (event.target === document.getElementById('resumeModal')) {
    closeResumeModalDirect();
  }
}

function closeResumeModalDirect() {
  const modal = document.getElementById('resumeModal');
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
    const copyPill = document.getElementById('copyEmailBtn');
    
    if (btnText && copyPill) {
      const originalText = btnText.textContent;
      btnText.textContent = "Copied! ✨";
      copyPill.style.background = "#a855f7";
      copyPill.style.color = "#0b0b12";

      setTimeout(() => {
        btnText.textContent = originalText;
        copyPill.style.background = "";
        copyPill.style.color = "";
      }, 2500);
    }
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

/* -------------------------------------------------------------
 * CONTACT FORM SUBMISSION
 * ------------------------------------------------------------- */
function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('senderName').value;
  const email = document.getElementById('senderEmail').value;
  const subject = document.getElementById('msgSubject').value;
  const content = document.getElementById('msgContent').value;
  const feedback = document.getElementById('formFeedback');

  // Trigger mailto link for direct sending
  const mailtoUrl = `mailto:rainavash92@gmail.com?subject=${encodeURIComponent(subject + " — from " + name)}&body=${encodeURIComponent(content + "\n\nFrom: " + name + " (" + email + ")")}`;
  
  feedback.classList.remove('hidden');
  feedback.className = 'form-feedback success';
  feedback.innerHTML = `
    <strong>✨ Thank you, ${name}!</strong><br>
    Your email draft has been generated. Opening your mail client now...
  `;

  setTimeout(() => {
    window.location.href = mailtoUrl;
  }, 800);
}
