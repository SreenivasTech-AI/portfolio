/**
 * MAIN CLIENT CONTROLLER
 * Sreenivasulu N — AI & ML Developer Portfolio
 * Handles DOM interactivity, 3D card tilt physics, theme switching,
 * sound triggers, project filtering, and architecture inspection modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize 3D WebGL Canvas Scene
  const scene3D = new Portfolio3DScene('webgl-canvas');

  // 2. Custom Cursor Controller
  initCursor();

  // 3. Theme Engine
  initThemeEngine(scene3D);

  // 4. Web Audio SFX Controls
  initSoundControls();

  // 5. Populate All Portfolio Sections
  populateHeroStats();
  populateEducationAndExperience();
  renderSkills();
  initIntersectionObservers();
  renderProjects('all');
  initProjectFilters();

  // 6. Modals & Forms
  initArchitectureModal();
  initContactForm();
  initCopyButtons();
  initMobileNav();
  initSmoothScrollButtons();
});

/* -------------------------------------------------------------------------- */
/* CUSTOM CURSOR TRACKING                                                     */
/* -------------------------------------------------------------------------- */
function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderRing);
  }
  requestAnimationFrame(renderRing);

  // Hover states on clickable items
  const clickables = document.querySelectorAll('a, button, input, textarea, .interactive-card, .filter-btn, .hud-btn, .direct-contact-item');
  clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
      if (window.soundEngine) window.soundEngine.playHover();
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
    el.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playClick();
    });
  });
}

/* -------------------------------------------------------------------------- */
/* THEME ENGINE                                                               */
/* -------------------------------------------------------------------------- */
function initThemeEngine(scene3D) {
  const themeBtn = document.getElementById('btn-theme-cycle');
  let currentThemeIdx = 0;

  function applyTheme(theme) {
    document.documentElement.style.setProperty('--color-primary', theme.primary);
    document.documentElement.style.setProperty('--color-accent', theme.accent);
    document.documentElement.style.setProperty('--color-bg', theme.bg);
    document.documentElement.style.setProperty('--color-surface', theme.cardBg);

    // Update 3D scene colors
    if (scene3D) {
      scene3D.setThemeColors(theme.primary, theme.accent);
    }
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      currentThemeIdx = (currentThemeIdx + 1) % PORTFOLIO_DATA.themes.length;
      const selected = PORTFOLIO_DATA.themes[currentThemeIdx];
      applyTheme(selected);
      showToast(`Switched Theme: ${selected.name}`);
    });
  }
}

/* -------------------------------------------------------------------------- */
/* SOUND CONTROLS                                                             */
/* -------------------------------------------------------------------------- */
function initSoundControls() {
  const soundBtn = document.getElementById('btn-sound-toggle');
  if (!soundBtn) return;

  function updateIcon() {
    const isMuted = window.soundEngine.isMuted;
    soundBtn.innerHTML = isMuted ? '🔇' : '🔊';
    soundBtn.title = isMuted ? 'Sound Muted (Click to enable)' : 'Sound Enabled (Click to mute)';
  }
  updateIcon();

  soundBtn.addEventListener('click', () => {
    const isMuted = window.soundEngine.toggleMute();
    updateIcon();
    showToast(isMuted ? 'Audio muted' : 'Audio enabled');
  });
}

/* -------------------------------------------------------------------------- */
/* POPULATE HERO STATS                                                        */
/* -------------------------------------------------------------------------- */
function populateHeroStats() {
  const statsContainer = document.getElementById('hero-stats-grid');
  if (!statsContainer) return;

  statsContainer.innerHTML = PORTFOLIO_DATA.profile.stats.map(stat => `
    <div class="stat-card">
      <div class="stat-number">${stat.prefix}${stat.value}${stat.suffix}</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');
}

/* -------------------------------------------------------------------------- */
/* POPULATE EDUCATION & EXPERIENCE                                            */
/* -------------------------------------------------------------------------- */
function populateEducationAndExperience() {
  // 1. Experience Container
  const expContainer = document.getElementById('experience-cards-container');
  if (expContainer && PORTFOLIO_DATA.experience) {
    expContainer.innerHTML = PORTFOLIO_DATA.experience.map(company => `
      <div class="exp-card">
        <div class="exp-company-banner">
          <div class="exp-company-name">${company.company}</div>
          <span class="exp-badge-current">${company.employmentType} · ${company.duration}</span>
        </div>
        <div class="exp-meta" style="margin-bottom: 20px;">📍 ${company.location}</div>

        ${company.roles.map(role => `
          <div style="margin-bottom: 24px; padding-left: 12px; border-left: 2px solid ${role.isCurrent ? 'var(--color-primary)' : 'var(--color-border)'};">
            <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 6px; margin-bottom: 4px;">
              <h4 class="exp-role-title">${role.title}</h4>
              <span style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--color-primary);">${role.period}</span>
            </div>
            <p style="font-size: 0.88rem; color: #94a3b8; margin-bottom: 12px;">${role.description}</p>
            <ul class="exp-bullets">
              ${role.bullets.map(b => `<li class="exp-bullet-item">${b}</li>`).join('')}
            </ul>
            <div class="tech-pills-row">
              ${role.technologies.map(t => `<span class="tech-tag" style="color: var(--color-primary); border-color: rgba(0, 240, 255, 0.25);">${t}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `).join('');
  }

  // 2. Education Container
  const eduContainer = document.getElementById('education-cards-container');
  if (eduContainer && PORTFOLIO_DATA.education) {
    eduContainer.innerHTML = PORTFOLIO_DATA.education.map(edu => `
      <div class="edu-card">
        <h4 class="edu-degree">${edu.degree}</h4>
        <div class="edu-institution">${edu.institution}</div>
        <div class="edu-period">📅 ${edu.period} · 📍 ${edu.location}</div>
        <div class="edu-score-pill">✦ ${edu.grade}</div>
        <div class="tech-pills-row" style="margin-top: 10px;">
          ${edu.highlights.map(h => `<span class="tech-tag">${h}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }
}

/* -------------------------------------------------------------------------- */
/* SKILLS MATRIX RENDER                                                       */
/* -------------------------------------------------------------------------- */
function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  const categories = Object.keys(PORTFOLIO_DATA.skills);
  container.innerHTML = categories.map(cat => {
    const list = PORTFOLIO_DATA.skills[cat];
    return `
      <div class="skill-category-card">
        <h3 class="category-title">✦ ${cat}</h3>
        <div class="skill-list">
          ${list.map(skill => `
            <div class="skill-item">
              <div class="skill-item-header">
                <span style="color: #fff; font-weight: 500;">${skill.name}</span>
                <span style="font-family: var(--font-mono); color: var(--color-primary); font-size: 0.8rem;">${skill.level}%</span>
              </div>
              <div class="skill-bar-track">
                <div class="skill-bar-fill" data-target-width="${skill.level}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function initIntersectionObservers() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.getAttribute('data-target-width');
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => observer.observe(bar));
}

/* -------------------------------------------------------------------------- */
/* PROJECT SHOWCASE & 3D TILT PHYSICS                                         */
/* -------------------------------------------------------------------------- */
function renderProjects(filterCategory = 'all') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const filtered = filterCategory === 'all'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === filterCategory);

  grid.innerHTML = filtered.map(p => `
    <div class="interactive-card" data-project-id="${p.id}">
      <span class="card-badge">${p.categoryLabel}</span>
      <h3 class="card-title">${p.title}</h3>
      <p class="card-desc">${p.description}</p>
      
      <div class="card-metrics">
        <span>⚡</span> ${p.metrics}
      </div>

      <div class="card-tags">
        ${p.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>

      <div class="card-actions">
        <button class="btn-outline btn-inspect" data-inspect="${p.id}" style="padding: 6px 14px; font-size: 0.8rem;">
          🔍 System Architecture
        </button>
        <a href="${p.githubUrl}" target="_blank" rel="noopener" class="action-link">
          GitHub Code ↗
        </a>
      </div>
    </div>
  `).join('');

  attachCardTiltPhysics();
  attachInspectModalTriggers();
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderProjects(cat);
    });
  });
}

function attachCardTiltPhysics() {
  const cards = document.querySelectorAll('.interactive-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
}

/* -------------------------------------------------------------------------- */
/* ARCHITECTURE INSPECTOR MODAL                                               */
/* -------------------------------------------------------------------------- */
function initArchitectureModal() {
  const overlay = document.getElementById('arch-modal-overlay');
  const closeBtn = document.getElementById('modal-close');
  if (!overlay || !closeBtn) return;

  function closeModal() {
    overlay.classList.remove('active');
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function attachInspectModalTriggers() {
  const inspectBtns = document.querySelectorAll('[data-inspect]');
  const overlay = document.getElementById('arch-modal-overlay');
  const titleEl = document.getElementById('modal-title');
  const bodyEl = document.getElementById('modal-body');

  inspectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-inspect');
      const project = PORTFOLIO_DATA.projects.find(p => p.id === projId);
      if (!project || !overlay) return;

      titleEl.innerHTML = `<span>⚡</span> ${project.title} — System Architecture`;
      bodyEl.innerHTML = `
        <div style="margin-bottom: 20px;">
          <h4 style="color: var(--color-primary); font-size: 0.9rem; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.05em;">Overview</h4>
          <p style="font-size: 0.95rem;">${project.architecture.summary}</p>
        </div>

        <div style="margin-bottom: 20px; background: rgba(255,255,255,0.03); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--color-border);">
          <h4 style="color: #fff; font-size: 0.85rem; margin-bottom: 6px;">🎨 Client & Inference Interface</h4>
          <p style="font-size: 0.9rem; color: var(--color-text-muted);">${project.architecture.frontend}</p>
        </div>

        <div style="margin-bottom: 20px; background: rgba(255,255,255,0.03); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--color-border);">
          <h4 style="color: #fff; font-size: 0.85rem; margin-bottom: 6px;">⚡ LangGraph & Backend Pipeline</h4>
          <p style="font-size: 0.9rem; color: var(--color-text-muted);">${project.architecture.backend}</p>
        </div>

        <div style="background: rgba(var(--color-primary-rgb), 0.08); padding: 16px; border-radius: var(--radius-md); border: 1px solid rgba(var(--color-primary-rgb), 0.25);">
          <h4 style="color: var(--color-primary); font-size: 0.85rem; margin-bottom: 6px;">🚀 Technical Benchmarks & Guardrails</h4>
          <p style="font-size: 0.9rem; color: #fff;">${project.architecture.innovations}</p>
        </div>
      `;

      overlay.classList.add('active');
    });
  });
}

/* -------------------------------------------------------------------------- */
/* CONTACT FORM & COPY BUTTONS                                                */
/* -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = `<span>⏳</span> Transmitting...`;

    setTimeout(() => {
      btn.innerHTML = `<span>✓</span> Transmission Received!`;
      if (window.soundEngine) window.soundEngine.playSuccess();
      showToast('🚀 Message transmitted! Thank you for reaching out.');
      form.reset();

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
      }, 3000);
    }, 1200);
  });
}

function initCopyButtons() {
  const copyEmailBtn = document.getElementById('btn-copy-email');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = PORTFOLIO_DATA.profile.email;
      navigator.clipboard.writeText(email).then(() => {
        copyEmailBtn.textContent = 'Copied! ✓';
        if (window.soundEngine) window.soundEngine.playSuccess();
        showToast(`Copied ${email} to clipboard!`);
        setTimeout(() => { copyEmailBtn.textContent = 'Copy'; }, 2000);
      });
    });
  }

  const copyPhoneBtn = document.getElementById('btn-copy-phone');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      const phone = PORTFOLIO_DATA.profile.phone;
      navigator.clipboard.writeText(phone).then(() => {
        copyPhoneBtn.textContent = 'Copied! ✓';
        if (window.soundEngine) window.soundEngine.playSuccess();
        showToast(`Copied ${phone} to clipboard!`);
        setTimeout(() => { copyPhoneBtn.textContent = 'Copy'; }, 2000);
      });
    });
  }
}

/* -------------------------------------------------------------------------- */
/* SMOOTH SCROLL FOR TALK BUTTONS                                             */
/* -------------------------------------------------------------------------- */
function initSmoothScrollButtons() {
  const talkButtons = document.querySelectorAll('a[href="#contact"]');
  talkButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Focus on name input for seamless interaction
        setTimeout(() => {
          const input = document.getElementById('form-name');
          if (input) input.focus();
        }, 600);
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* TOAST NOTIFICATION UTILITY                                                 */
/* -------------------------------------------------------------------------- */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✦</span> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* -------------------------------------------------------------------------- */
/* MOBILE NAV TOGGLE                                                          */
/* -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}
