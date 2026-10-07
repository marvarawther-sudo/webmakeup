/**
 * FISAT Redesign - Interactive Core Engine & AI Systems
 * Federal Institute of Science And Technology (Autonomous)
 */

// Global Back to Navigation / Top function
window.scrollToNav = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

document.addEventListener('DOMContentLoaded', () => {
  initFisatAI();
  initCourseFinder();
  initSearchPalette();
  initStatsCounter();
  initNewsTabs();
  initMobileNav();
  initVideoModal();
  initFacilityTabs();
  initFacNavLinks();
  initResearchNav();
  initCampusLifeParentToggle();
  initDeptMegamenu();
  initAcadNavLinks();
});

// Global BTech Quota Chooser
window.openBtechQuotaChooser = function() {
  const modal = document.getElementById('btechQuotaModal');
  if (modal) modal.classList.add('active');
};

/* ==========================================================================
   1. AUDIENCE PERSONA SWITCHER
   ========================================================================== */
function initPersonaSwitcher() {
  const personaButtons = document.querySelectorAll('.persona-btn');
  const drawer = document.getElementById('personaActionDrawer');
  const drawerTitle = document.getElementById('personaDrawerTitle');
  const shortcutsContainer = document.getElementById('personaShortcuts');

  const personaData = {
    all: {
      title: '🌟 Campus Quick Portals',
      shortcuts: [
        { text: 'BTech Quota Selection', icon: 'fa-split', link: 'javascript:openBtechQuotaChooser()' },
        { text: 'MCA Admission Form', icon: 'fa-laptop-code', link: 'https://fisat.ac.in/admission/' },
        { text: 'MBA (FBS) Portal', icon: 'fa-chart-pie', link: 'https://fbs.ac.in/' },
        { text: 'Hostel Allotment', icon: 'fa-bed', link: 'https://intranet.fisat.ac.in/Hostel/' },
        { text: 'The Institution', icon: 'fa-landmark', link: 'about.html#institution' },
        { text: 'Vision & Mission', icon: 'fa-bullseye', link: 'about.html#vision' },
        { text: 'ERP Intranet Login', icon: 'fa-key', link: 'https://intranet.fisat.ac.in/' }
      ]
    },
    prospective: {
      title: '🎓 Prospective Students & Parents Portal',
      shortcuts: [
        { text: 'BTech Govt Quota (KEAM)', icon: 'fa-landmark', link: 'https://fisat.ac.in/news/b-tech-govt-quota-counselling-schedule/' },
        { text: 'BTech Management Application', icon: 'fa-file-signature', link: 'https://btech-admission.fisat.ac.in/admission/' },
        { text: 'MCA & iMCA Forms', icon: 'fa-laptop-code', link: 'https://fisat.ac.in/admission/' },
        { text: 'MBA Admission', icon: 'fa-briefcase', link: 'https://fbs.ac.in/' },
        { text: 'Hostel Room Booking', icon: 'fa-bed', link: 'https://intranet.fisat.ac.in/Hostel/' },
        { text: 'About FISAT & Vision', icon: 'fa-landmark', link: 'about.html#institution' }
      ]
    },
    current: {
      title: '🎒 Current Students Portal',
      shortcuts: [
        { text: 'Intranet ERP Login', icon: 'fa-user-lock', link: 'https://intranet.fisat.ac.in/' },
        { text: 'KTU Exam Timetable', icon: 'fa-calendar-days', link: 'https://fisat.ac.in/' },
        { text: 'Hostel Portal', icon: 'fa-bed', link: 'https://intranet.fisat.ac.in/Hostel/' },
        { text: 'Digital Library & IEEE', icon: 'fa-book-bookmark', link: 'https://fisat.ac.in/library/' },
        { text: 'Anti-Ragging Helpline', icon: 'fa-shield-halved', link: 'https://fisat.ac.in/anti-ragging/' }
      ]
    },
    recruiters: {
      title: '💼 Corporate Recruiters & Industry Portal',
      shortcuts: [
        { text: 'Official Placements', icon: 'fa-file-arrow-down', link: 'https://fisat.ac.in/placements/' },
        { text: '602+ Offers Record', icon: 'fa-chart-line', link: 'index.html#placements' },
        { text: 'IDEA Lab & Supercomputing', icon: 'fa-handshake', link: 'index.html#research' }
      ]
    },
    faculty: {
      title: '👨‍🏫 Faculty & Research Scholars Portal',
      shortcuts: [
        { text: 'Faculty Intranet Portal', icon: 'fa-id-badge', link: 'https://intranet.fisat.ac.in/' },
        { text: 'Research Cell', icon: 'fa-flask', link: 'https://fisat.ac.in/college-research-cell/' },
        { text: 'IQAC & NAAC', icon: 'fa-award', link: 'https://fisat.ac.in/iqac' }
      ]
    },
    alumni: {
      title: '🤝 FISTAA Alumni & Global Network',
      shortcuts: [
        { text: 'FISTAA Alumni Portal', icon: 'fa-graduation-cap', link: 'https://fisat.ac.in/' },
        { text: 'Transcripts Request', icon: 'fa-certificate', link: 'https://fisat.ac.in/' }
      ]
    }
  };

  personaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      personaButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const persona = btn.getAttribute('data-persona');
      const data = personaData[persona] || personaData.all;

      drawerTitle.innerHTML = `<i class="fa-solid fa-sparkles"></i> ${data.title}`;
      shortcutsContainer.innerHTML = data.shortcuts.map(s => `
        <a href="${s.link}" ${s.link.startsWith('http') ? 'target="_blank"' : ''} class="persona-shortcut-link">
          <i class="fa-solid ${s.icon}"></i> ${s.text}
        </a>
      `).join('');

      drawer.classList.add('visible');
    });
  });

  if (personaButtons.length > 0) {
    personaButtons[0].click();
  }
}

/* ==========================================================================
   2. FISAT SMART AI CAMPUS ASSISTANT ("FisatGPT")
   ========================================================================== */
function initFisatAI() {
  const launcherBtn = document.getElementById('aiLauncherBtn');
  const modalBox = document.getElementById('aiModalBox');
  const closeBtn = document.getElementById('aiCloseBtn');
  const chatBody = document.getElementById('aiChatBody');
  const chatForm = document.getElementById('aiChatForm');
  const inputField = document.getElementById('aiInputField');
  const promptChips = document.querySelectorAll('.ai-prompt-chip');

  if (!launcherBtn || !modalBox) return;

  launcherBtn.addEventListener('click', () => {
    modalBox.classList.toggle('active');
    if (modalBox.classList.contains('active')) {
      inputField.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    modalBox.classList.remove('active');
  });

  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      inputField.value = query;
      submitUserQuery(query);
    });
  });

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = inputField.value.trim();
    if (!query) return;
    submitUserQuery(query);
  });

  function submitUserQuery(text) {
    appendMessage(text, 'user');
    inputField.value = '';

    const typingId = appendTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator(typingId);
      const answer = generateFisatAIResponse(text);
      appendMessage(answer, 'bot');
    }, 600);
  }

  function appendMessage(content, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-msg ${sender}`;

    const bubble = document.createElement('div');
    bubble.className = 'ai-msg-bubble';
    bubble.innerHTML = content;

    msgDiv.appendChild(bubble);
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function appendTypingIndicator() {
    const id = 'typing-' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-msg bot';
    typingDiv.id = id;
    typingDiv.innerHTML = `
      <div class="ai-msg-bubble" style="display:flex; gap:5px; align-items:center; padding:10px 16px;">
        <span style="width:6px; height:6px; background:#004E95; border-radius:50%; animation: pulse 1s infinite;"></span>
        <span style="width:6px; height:6px; background:#004E95; border-radius:50%; animation: pulse 1s infinite 0.2s;"></span>
        <span style="width:6px; height:6px; background:#004E95; border-radius:50%; animation: pulse 1s infinite 0.4s;"></span>
      </div>
    `;
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    return id;
  }

  function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  function generateFisatAIResponse(query) {
    const q = query.toLowerCase();

    // Vision and Mission queries
    if (q.includes('vision') || q.includes('mission') || q.includes('motto') || q.includes('values') || q.includes('about')) {
      return `
        <strong>📜 FISAT Vision, Mission & Motto:</strong><br>
        • <strong>Motto:</strong> <em>"Focus on Excellence"</em><br>
        • <strong>Vision:</strong> To evolve into a world-class professional institute committed to excellence in education, fostering holistic development, and empowering socially responsible global technocrats.<br>
        • <strong>Core Values (INSPIRE):</strong> Inclusiveness, Nurturing, Social Commitment, Professionalism, Integrity, Respect, Excellence.<br>
        <div style="margin-top:8px;">
          <a href="about.html#vision" class="btn btn-primary btn-sm" style="font-size:0.75rem; padding:4px 10px;">Read Vision & Mission Page</a>
          <a href="about.html#institution" class="btn btn-secondary btn-sm" style="font-size:0.75rem; padding:4px 10px;">The Institution History</a>
        </div>
      `;
    }

    // BTech Govt Quota
    if (q.includes('govt') || q.includes('government') || q.includes('keam')) {
      return `
        <strong>🏛️ BTech Government Quota (KEAM 2026):</strong><br>
        • Conducted by Commissioner for Entrance Examinations (CEE), Kerala.<br>
        • Constitutes <strong>50% of Total Seats</strong> in all engineering branches.<br>
        <div style="margin-top:8px;">
          <a href="https://fisat.ac.in/news/b-tech-govt-quota-counselling-schedule/" target="_blank" class="btn btn-secondary btn-sm" style="font-size:0.75rem; padding:4px 10px;">Counselling Schedule</a>
          <a href="https://fisat.ac.in/wp-content/uploads/2024/08/List-of-Documents-to-be-submitted-for-Government-Quota-admission.pdf" target="_blank" class="btn btn-primary btn-sm" style="font-size:0.75rem; padding:4px 10px;">Required Documents (PDF)</a>
        </div>
      `;
    }

    // BTech Management Quota
    if (q.includes('management') || q.includes('mgmt') || q.includes('nri')) {
      return `
        <strong>🎓 BTech Management & NRI Quotas:</strong><br>
        • 35% Management Merit + 15% NRI Quota conducted directly by FISAT Autonomous.<br>
        • Scholarships up to 100% fee waiver for top meritorious students.<br>
        <div style="margin-top:8px;">
          <a href="https://btech-admission.fisat.ac.in/admission/" target="_blank" class="btn btn-primary btn-sm" style="font-size:0.75rem; padding:4px 10px;">Open Official Application Form</a>
          <a href="https://btech-adm-profile.fisat.ac.in/" target="_blank" class="btn btn-secondary btn-sm" style="font-size:0.75rem; padding:4px 10px;">Fee Payment Portal</a>
        </div>
      `;
    }

    // General BTech
    if (q.includes('btech') || q.includes('b.tech') || q.includes('engineering admission')) {
      return `
        <strong>🎓 BTech Admission 2026-27:</strong><br>
        You can choose between:
        <ul style="margin:6px 0 8px 18px; font-size:0.83rem;">
          <li><strong>Government Quota:</strong> Centralized allotment via KEAM (50% seats).</li>
          <li><strong>Management Quota:</strong> Direct online merit & NRI applications.</li>
        </ul>
        <button class="btn btn-gold btn-sm" style="font-size:0.75rem; padding:4px 10px;" onclick="openBtechQuotaChooser()">Choose Quota Now</button>
      `;
    }

    // MCA & iMCA
    if (q.includes('mca') || q.includes('imca')) {
      return `
        <strong>💻 MCA & iMCA Admissions:</strong><br>
        • <strong>MCA (2-Year):</strong> For BCA, B.Sc CS, or degree with Maths (50% marks).<br>
        • <strong>iMCA (5-Year Integrated):</strong> Directly after Plus Two / 12th with Maths/Stats.<br>
        <div style="margin-top:8px;">
          <a href="https://fisat.ac.in/admission/" target="_blank" class="btn btn-primary btn-sm" style="font-size:0.75rem; padding:4px 10px;">Open Official MCA Form</a>
        </div>
      `;
    }

    // MBA
    if (q.includes('mba') || q.includes('fbs')) {
      return `
        <strong>📊 MBA Admission (FISAT Business School):</strong><br>
        • 2-Year Dual Specializations in Finance, Marketing, HR, Operations, Analytics.<br>
        • Valid score in CAT / CMAT / KMAT required for GD & PI rounds.<br>
        <div style="margin-top:8px;">
          <a href="https://fbs.ac.in/" target="_blank" class="btn btn-primary btn-sm" style="font-size:0.75rem; padding:4px 10px;">Open FBS MBA Portal</a>
        </div>
      `;
    }

    // Hostel
    if (q.includes('hostel') || q.includes('room') || q.includes('stay')) {
      return `
        <strong>🏠 Hostel Admission & Room Allotment:</strong><br>
        • Separate on-campus residence halls for boys and girls with high-speed Wi-Fi, dining, and gym.<br>
        <div style="margin-top:8px;">
          <a href="https://intranet.fisat.ac.in/Hostel/" target="_blank" class="btn btn-primary btn-sm" style="font-size:0.75rem; padding:4px 10px;">Hostel Online Portal</a>
          <a href="https://fisat.ac.in/wp-content/uploads/2024/08/Hostel-Fee.pdf" target="_blank" class="btn btn-secondary btn-sm" style="font-size:0.75rem; padding:4px 10px;">Hostel Fee PDF</a>
        </div>
      `;
    }

    // Fallback
    return `
      I am the <strong>FISAT Campus AI</strong>. I can assist you directly with authentic forms & college details:
      <ul style="margin:6px 0 8px 18px; font-size:0.83rem;">
        <li><a href="javascript:openBtechQuotaChooser()">BTech Quota Selection</a> (Government vs Management)</li>
        <li><a href="about.html#vision">Vision & Mission</a> and <a href="about.html#institution">The Institution</a></li>
        <li><a href="https://fisat.ac.in/admission/" target="_blank">MCA & iMCA Admission Form</a></li>
        <li><a href="https://fbs.ac.in/" target="_blank">MBA Admission (FBS Portal)</a></li>
        <li><a href="https://intranet.fisat.ac.in/Hostel/" target="_blank">Hostel Online Room Allotment</a></li>
      </ul>
      Or reach our Admissions Office at <strong>0484-2725272</strong>.
    `;
  }
}

/* ==========================================================================
   3. AI COURSE & CAREER NAVIGATOR
   ========================================================================== */
function initCourseFinder() {
  const levelPills = document.querySelectorAll('[data-filter-level]');
  const domainPills = document.querySelectorAll('[data-filter-domain]');
  const courseCards = document.querySelectorAll('.course-card');
  const countBadge = document.getElementById('matchingCoursesCount');

  let activeLevel = 'all';
  let activeDomain = 'all';

  function filterCourses() {
    let visibleCount = 0;

    courseCards.forEach(card => {
      const level = card.getAttribute('data-level');
      const domains = card.getAttribute('data-domain').split(' ');

      const matchesLevel = (activeLevel === 'all' || level === activeLevel);
      const matchesDomain = (activeDomain === 'all' || domains.includes(activeDomain));

      if (matchesLevel && matchesDomain) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countBadge) {
      countBadge.textContent = `${visibleCount} Program${visibleCount !== 1 ? 's' : ''} Matched`;
    }
  }

  levelPills.forEach(pill => {
    pill.addEventListener('click', () => {
      levelPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeLevel = pill.getAttribute('data-filter-level');
      filterCourses();
    });
  });

  domainPills.forEach(pill => {
    pill.addEventListener('click', () => {
      domainPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeDomain = pill.getAttribute('data-filter-domain');
      filterCourses();
    });
  });
}

/* ==========================================================================
   4. COMMAND SEARCH PALETTE (Ctrl + K)
   ========================================================================== */
function initSearchPalette() {
  const triggerBtn = document.getElementById('searchTriggerBtn');
  const backdrop = document.getElementById('searchPaletteBackdrop');
  const searchInput = document.getElementById('paletteSearchInput');
  const resultsList = document.getElementById('paletteResultsList');

  const searchableItems = [
    { title: 'BTech - Government Quota (KEAM Counselling)', category: 'Admissions', link: 'https://fisat.ac.in/news/b-tech-govt-quota-counselling-schedule/', icon: 'fa-landmark' },
    { title: 'BTech - Management Quota (Official Application Portal)', category: 'Admissions', link: 'https://btech-admission.fisat.ac.in/admission/', icon: 'fa-file-signature' },
    { title: 'MCA & iMCA Admission Form (Official)', category: 'Admissions', link: 'https://fisat.ac.in/admission/', icon: 'fa-laptop-code' },
    { title: 'MBA Admission - FISAT Business School (FBS)', category: 'Admissions', link: 'https://fbs.ac.in/', icon: 'fa-chart-pie' },
    { title: 'MTech Spot Admission 2026', category: 'Admissions', link: 'https://fisat.ac.in/news/m-tech-2026-spot-admission/', icon: 'fa-atom' },
    { title: 'Hostel Room Allotment Portal', category: 'Campus', link: 'https://intranet.fisat.ac.in/Hostel/', icon: 'fa-bed' },
    { title: 'The Institution (Legacy & Autonomous Status)', category: 'About', link: 'about.html#institution', icon: 'fa-building' },
    { title: 'Vision, Mission & Motto', category: 'About', link: 'about.html#vision', icon: 'fa-bullseye' },
    { title: 'Core Values (INSPIRE)', category: 'About', link: 'about.html#values', icon: 'fa-gem' },
    { title: 'Computer Science and Engineering (CSE)', category: 'Department', link: 'https://fisat.ac.in/department/computer-science-and-engineering/', icon: 'fa-laptop-code' },
    { title: 'Placement Records (602+ Offers)', category: 'Placements', link: 'https://fisat.ac.in/placements/', icon: 'fa-chart-line' },
    { title: 'Intranet ERP Portal', category: 'Portals', link: 'https://intranet.fisat.ac.in/', icon: 'fa-lock' }
  ];

  function openSearch() {
    if (!backdrop) return;
    backdrop.classList.add('active');
    searchInput.value = '';
    renderResults(searchableItems);
    setTimeout(() => searchInput.focus(), 100);
  }

  function closeSearch() {
    if (!backdrop) return;
    backdrop.classList.remove('active');
  }

  function renderResults(items) {
    if (items.length === 0) {
      resultsList.innerHTML = `<li style="padding:16px; text-align:center; color:#94A3B8;">No results found matching your query.</li>`;
      return;
    }

    resultsList.innerHTML = items.map(item => `
      <li class="search-result-item" onclick="window.open('${item.link}', '${item.link.startsWith('http') ? '_blank' : '_self'}'); document.getElementById('searchPaletteBackdrop').classList.remove('active');">
        <div class="search-result-title">
          <i class="fa-solid ${item.icon}" style="color:#004E95; width:20px;"></i>
          <span>${item.title}</span>
        </div>
        <span class="search-category-badge">${item.category}</span>
      </li>
    `).join('');
  }

  if (triggerBtn) triggerBtn.addEventListener('click', openSearch);

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeSearch();
    });
  }

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (backdrop && backdrop.classList.contains('active')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
    if (e.key === 'Escape' && backdrop && backdrop.classList.contains('active')) {
      closeSearch();
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      const filtered = searchableItems.filter(item => 
        item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
      );
      renderResults(filtered);
    });
  }
}

/* ==========================================================================
   5. ANIMATED STATS COUNTER
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('[data-counter]');
  let started = false;

  function countUp(el) {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 1800;
    const start = 0;
    const startTime = performance.now();

    function update(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * (target - start) + start);

      el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
      }
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        statNumbers.forEach(el => countUp(el));
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-banner');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   6. NEWS & EVENTS TABS
   ========================================================================== */
function initNewsTabs() {
  const tabs = document.querySelectorAll('.pulse-tab-btn');
  const cards = document.querySelectorAll('.news-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-news-tab');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. MOBILE NAVIGATION TOGGLE
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('mobileNavToggle');
  const menu = document.getElementById('navMenu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    if (item.querySelector('.dropdown-menu') || item.querySelector('.megamenu')) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          const href = link.getAttribute('href');
          if (href && !href.startsWith('#') && !href.startsWith('javascript')) {
            return;
          }
          e.preventDefault();
          item.classList.toggle('active');
        }
      });
    }
  });
}

/* ==========================================================================
   8. VIDEO MODAL (CAMPUS TOUR)
   ========================================================================== */
function initVideoModal() {
  const tourBtns = document.querySelectorAll('[data-open-video]');
  const modal = document.getElementById('videoModal');
  const closeBtn = document.getElementById('videoModalClose');
  const iframe = document.getElementById('tourVideoIframe');

  tourBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal && iframe) {
        modal.classList.add('active');
        iframe.src = 'https://www.youtube.com/embed/Bk5WVB3KRDE?autoplay=1';
      }
    });
  });

  if (closeBtn && modal && iframe) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      iframe.src = '';
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        if (iframe) iframe.src = '';
      }
    });
  }
}

/* ==========================================================================
   9. INTERACTIVE FACILITY FILTER & ALL-CARDS SHOWCASE
   ========================================================================== */
function initFacilityTabs() {
  const filterBtns = document.querySelectorAll('.fac-tab-btn[data-fac-filter]');
  const cards = document.querySelectorAll('.facility-card');

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      const filter = btn.getAttribute('data-fac-filter');

      cards.forEach(function(card) {
        if (filter === 'all' || card.getAttribute('data-fac-type') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const backBtn = document.getElementById('facBackNavBtn');
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      window.scrollToNav();
    });
  }
}

/* ==========================================================================
   10. CAMPUS LIFE NAV LINKS - Direct Scroll & Pulse Highlight
   ========================================================================== */
function initFacNavLinks() {
  const facNavLinks = document.querySelectorAll('.fac-nav-link');
  facNavLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var facilityKey = link.getAttribute('data-facility');
      var targetCard = document.getElementById('fac-' + facilityKey);
      
      // Ensure all cards are visible if previously filtered
      const filterAllBtn = document.querySelector('.fac-tab-btn[data-fac-filter="all"]');
      if (filterAllBtn) filterAllBtn.click();

      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        document.querySelectorAll('.facility-card').forEach(function(c) {
          c.classList.remove('highlight-pulse');
        });
        targetCard.classList.add('highlight-pulse');
        setTimeout(function() {
          targetCard.classList.remove('highlight-pulse');
        }, 2500);
      } else {
        var section = document.getElementById('facilities');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ==========================================================================
   11. RESEARCH & LABS NAV - Interactive Scroll, Card Highlighting & Toggle
   ========================================================================== */
function initResearchNav() {
  const resParentLink = document.querySelector('.res-nav-parent');
  const resNavLinks = document.querySelectorAll('.res-nav-link');
  const researchSection = document.getElementById('research');
  const navbar = document.getElementById('mainNavBar') || document.querySelector('.navbar');

  function scrollToNav() {
    if (navbar) {
      window.scrollToNav();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function isAtResearchSection() {
    if (!researchSection) return false;
    const rect = researchSection.getBoundingClientRect();
    return rect.top <= 250 && rect.bottom >= 150;
  }

  // Parent link toggle: if already at #research, drag back to navbar; otherwise scroll down to #research
  if (resParentLink) {
    resParentLink.addEventListener('click', function(e) {
      e.preventDefault();
      if (isAtResearchSection()) {
        scrollToNav();
      } else if (researchSection) {
        researchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Dropdown links: scroll to respective card and highlight it
  resNavLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = link.getAttribute('href') || '';
      const targetId = href.replace('#', '');
      const targetCard = document.getElementById(targetId);

      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        document.querySelectorAll('.research-card').forEach(function(c) {
          c.classList.remove('highlight-pulse');
        });
        targetCard.classList.add('highlight-pulse');
        setTimeout(function() {
          targetCard.classList.remove('highlight-pulse');
        }, 2500);
      } else if (researchSection) {
        researchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Section "Back to Navigation" button
  const resBackBtn = document.getElementById('resBackNavBtn');
  if (resBackBtn) {
    resBackBtn.addEventListener('click', scrollToNav);
  }
}

/* ==========================================================================
   12. CAMPUS LIFE PARENT NAV TOGGLE (Clicking again drags back to nav)
   ========================================================================== */
function initCampusLifeParentToggle() {
  const facParentLink = document.querySelector('a.nav-link[href="#facilities"]');
  const facSection = document.getElementById('facilities');
  const navbar = document.getElementById('mainNavBar') || document.querySelector('.navbar');

  if (facParentLink && facSection) {
    facParentLink.addEventListener('click', function(e) {
      const rect = facSection.getBoundingClientRect();
      if (rect.top <= 250 && rect.bottom >= 150) {
        e.preventDefault();
        if (navbar) {
          window.scrollToNav();
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    });
  }
}


/* ==========================================================================
   13. DEPARTMENTS MEGAMENU - Drag to Card & Pulse Highlight
   ========================================================================== */
function initDeptMegamenu() {
  const deptLinks = document.querySelectorAll('.megamenu-links a');
  deptLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#')) {
        const targetId = href.replace('#', '');
        const targetCard = document.getElementById(targetId);
        if (targetCard) {
          e.preventDefault();
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          document.querySelectorAll('.course-card').forEach(function(c) {
            c.classList.remove('highlight-pulse');
          });
          targetCard.classList.add('highlight-pulse');
          setTimeout(function() {
            targetCard.classList.remove('highlight-pulse');
          }, 2500);
        }
      }
    });
  });
}

/* ==========================================================================
   14. ACADEMICS NAV LINKS - Auto Filter & Scroll
   ========================================================================== */
function initAcadNavLinks() {
  const acadLinks = document.querySelectorAll('.acad-filter-link');
  acadLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const filterLevel = link.getAttribute('data-filter');
      const courseSection = document.getElementById('courseFinder');
      if (courseSection) {
        courseSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (filterLevel) {
        const filterBtn = document.querySelector('.filter-pill[data-filter-level="' + filterLevel + '"]');
        if (filterBtn) {
          filterBtn.click();
        }
      }
    });
  });
}

