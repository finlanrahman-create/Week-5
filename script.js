// ==========================================
// META CONNECTION — INTERACTIVE SCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initPrincipleAccordion();
  initImageFallbackHandlers();
});

/* ------------------------------------------
   1. Dark / Light Theme Toggle Functionality
   ------------------------------------------ */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  
  // Check stored theme or system preference
  const savedTheme = localStorage.getItem('meta_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('meta_theme', newTheme);
    });
  }
}

/* ------------------------------------------
   2. Principle List Accordion & Interactive + Button
   ------------------------------------------ */
function initPrincipleAccordion() {
  const principleCards = document.querySelectorAll('.principle-card');
  const activeNote = document.getElementById('activePrincipleNote');
  
  // Custom notes corresponding to each principle
  const principleNotes = {
    'a': '<strong>Give people a voice:</strong> Expressing diverse perspectives builds empathy and drives global progress.',
    'b': '<strong>Build connection and community:</strong> Creating digital spaces where people build real-world relationships.',
    'c': '<strong>Serve everyone:</strong> Designing inclusive AI and mobile experiences for 3+ billion people worldwide.',
    'd': '<strong>Keep people safe and protect privacy:</strong> Deploying end-to-end encryption and safety filters.',
    'e': '<strong>Promote economic opportunity:</strong> Supporting creators, SMEs, and digital commerce ecosystems.'
  };

  principleCards.forEach(card => {
    const header = card.querySelector('.principle-card-header');
    const expandBtn = card.querySelector('.expand-btn');
    const cardIndex = card.getAttribute('data-index');

    const toggleCard = (e) => {
      // Prevent double triggers if clicked on expandBtn vs header
      e.stopPropagation();

      const isActive = card.classList.contains('active');

      // Close all other cards for accordion effect
      principleCards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove('active');
          const btn = otherCard.querySelector('.expand-btn');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current card
      if (isActive) {
        card.classList.remove('active');
        if (expandBtn) expandBtn.setAttribute('aria-expanded', 'false');
        if (activeNote) {
          activeNote.innerHTML = 'Click any of the <strong>+</strong> buttons on the left to inspect how each principle shapes our technology stack and user experience.';
        }
      } else {
        card.classList.add('active');
        if (expandBtn) expandBtn.setAttribute('aria-expanded', 'true');
        if (activeNote && principleNotes[cardIndex]) {
          activeNote.innerHTML = principleNotes[cardIndex];
        }
      }
    };

    if (header) {
      header.addEventListener('click', toggleCard);
    }
  });

  // Open first card by default for engaging experience
  if (principleCards.length > 0) {
    principleCards[0].classList.add('active');
    const firstBtn = principleCards[0].querySelector('.expand-btn');
    if (firstBtn) firstBtn.setAttribute('aria-expanded', 'true');
    if (activeNote && principleNotes['a']) {
      activeNote.innerHTML = principleNotes['a'];
    }
  }
}

/* ------------------------------------------
   3. Image Fallbacks (Canvas Generated Graphic fallback)
   ------------------------------------------ */
function initImageFallbackHandlers() {
  const heroImg = document.getElementById('heroImage');
  const studentsImg = document.getElementById('studentsImage');

  // Fallback for hero image (Male with partial face & blue eyes visual fallback if network fails)
  if (heroImg) {
    heroImg.onerror = () => {
      console.warn('Hero image offline fallback activated');
      heroImg.src = createHeroFallbackSVG();
    };
  }

  // Fallback for students image (4 students fallback graphic)
  if (studentsImg) {
    studentsImg.onerror = () => {
      console.warn('Students image offline fallback activated');
      studentsImg.src = createStudentsFallbackSVG();
    };
  }
}

function createHeroFallbackSVG() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0b132b"/>
          <stop offset="50%" stop-color="#1c2541"/>
          <stop offset="100%" stop-color="#3a506b"/>
        </linearGradient>
        <radialGradient id="eyeBlue" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#00f0ff"/>
          <stop offset="60%" stop-color="#0064e0"/>
          <stop offset="100%" stop-color="#001845"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bgGrad)"/>
      <path d="M600,200 Q800,100 1000,200 Q1100,500 800,800 Q500,500 600,200 Z" fill="#1e293b" opacity="0.4"/>
      <!-- Eye Left -->
      <ellipse cx="680" cy="420" rx="90" ry="48" fill="#ffffff" opacity="0.9"/>
      <circle cx="680" cy="420" r="42" fill="url(#eyeBlue)"/>
      <circle cx="680" cy="420" r="18" fill="#030712"/>
      <circle cx="695" cy="408" r="8" fill="#ffffff"/>
      
      <!-- Eye Right -->
      <ellipse cx="920" cy="420" rx="90" ry="48" fill="#ffffff" opacity="0.9"/>
      <circle cx="920" cy="420" r="42" fill="url(#eyeBlue)"/>
      <circle cx="920" cy="420" r="18" fill="#030712"/>
      <circle cx="935" cy="408" r="8" fill="#ffffff"/>

      <text x="800" y="720" font-family="sans-serif" font-size="32" font-weight="bold" fill="#38bdf8" text-anchor="middle">Vision & Human Intelligence</text>
    </svg>
  `;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function createStudentsFallbackSVG() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <defs>
        <linearGradient id="stGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0064e0"/>
          <stop offset="100%" stop-color="#00c6ff"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#0f172a"/>
      <g fill="url(#stGrad)" opacity="0.8">
        <!-- 4 Student Avatars (2 Female, 2 Male) -->
        <circle cx="300" cy="400" r="110"/>
        <circle cx="500" cy="360" r="110"/>
        <circle cx="700" cy="400" r="110"/>
        <circle cx="900" cy="360" r="110"/>
      </g>
      <text x="600" y="660" font-family="sans-serif" font-size="36" font-weight="bold" fill="#ffffff" text-anchor="middle">4 University Students (2 Female &amp; 2 Male)</text>
      <text x="600" y="720" font-family="sans-serif" font-size="24" fill="#94a3b8" text-anchor="middle">Collaborating and building future technologies together</text>
    </svg>
  `;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
