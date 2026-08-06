const views = {
  home: document.getElementById('view-home'),
  decks: document.getElementById('view-decks'),
  detail: document.getElementById('view-detail'),
  search: document.getElementById('view-search'),
  glossary: document.getElementById('view-glossary'),
  game: document.getElementById('view-game'),
  codex: document.getElementById('view-codex'),
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function observeReveal(el) { revealObserver.observe(el); }
function observeRevealAll(root = document) {
  root.querySelectorAll('.reveal').forEach(observeReveal);
}

let selectedClan = null;

function showView(name) {
  if (typeof stopSpeaking === 'function') stopSpeaking();
  Object.values(views).forEach(v => v.classList.add('view--hidden'));
  views[name].classList.remove('view--hidden');
  document.querySelectorAll('.drawer__item').forEach(link => {
    link.classList.toggle('is-active', link.dataset.nav === name);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (name === 'search') {
    renderSearch();
    const input = document.getElementById('searchInput');
    if (input) setTimeout(() => input.focus(), 300);
  }
  if (name === 'game' && typeof startMemoryGame === 'function') {
    startMemoryGame();
  }
  if (name === 'codex' && typeof renderCodex === 'function') {
    renderCodex();
  }
}

document.querySelectorAll('[data-nav]').forEach(el => {
  el.addEventListener('click', () => {
    const target = el.dataset.nav;
    if (target === 'home' || target === 'decks' || target === 'search' || target === 'glossary' || target === 'game' || target === 'codex') showView(target);
    closeDrawer();
  });
});

const menuToggle = document.getElementById('menuToggle');
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerClose = document.getElementById('drawerClose');

function openDrawer() {
  drawer.classList.add('is-open');
  drawerOverlay.classList.add('is-open');
}
function closeDrawer() {
  drawer.classList.remove('is-open');
  drawerOverlay.classList.remove('is-open');
}

menuToggle.addEventListener('click', openDrawer);
drawerOverlay.addEventListener('click', closeDrawer);
drawerClose.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDrawer();
});

/* ===== Scroll-to-top button ===== */
const scrollTopBtn = document.getElementById('scrollTopBtn');
function updateScrollTopBtn() {
  scrollTopBtn.classList.toggle('is-visible', window.scrollY > 400);
}
window.addEventListener('scroll', updateScrollTopBtn, { passive: true });
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
updateScrollTopBtn();

function getClans() {
  const clans = [];
  DECKS.forEach(deck => {
    const clan = deck.clan || 'Lainnya';
    if (!clans.includes(clan)) clans.push(clan);
  });
  return clans;
}

function renderClanTabs() {
  const container = document.getElementById('clanTabs');
  const clans = getClans();

  if (clans.length <= 1) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = clans.map(clan => `
    <button class="clan-tab${clan === selectedClan ? ' is-active' : ''}" data-clan="${clan}">${clan}</button>
  `).join('');

  container.querySelectorAll('.clan-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedClan = btn.dataset.clan;
      renderClanTabs();
      renderDeckGrid();
    });
  });
}

function renderDeckGrid() {
  const grid = document.getElementById('deckGrid');
  const empty = document.getElementById('emptyState');
  grid.innerHTML = '';

  if (!DECKS.length) {
    empty.classList.add('is-visible');
    return;
  }
  empty.classList.remove('is-visible');

  const filtered = DECKS.filter(deck => (deck.clan || 'Lainnya') === selectedClan);

  filtered.forEach((deck, i) => {
    const card = document.createElement('button');
    card.className = 'deck-card reveal';
    card.style.transitionDelay = `${Math.min(i, 6) * 0.06}s`;
    card.innerHTML = `
      ${deck.image ? `<div class="deck-card__image-wrap"><img class="deck-card__image" src="${deck.image}" alt="${deck.name}" loading="lazy"></div>` : ''}
      <div class="deck-card__body">
        <div class="deck-card__name">${deck.name}</div>
        <div class="deck-card__meta">${deck.clan ? deck.clan + ' · ' : ''}${deck.cards.length} cards</div>
      </div>
    `;
    card.addEventListener('click', () => showDeckDetail(deck.id));
    grid.appendChild(card);
    observeReveal(card);
  });
}

const SPEECH_SUPPORTED = typeof window !== 'undefined' && 'speechSynthesis' in window;

function renderCardItem(card, i = 0) {
  return `
    <div class="card-item reveal" data-card-name="${card.name}" style="transition-delay:${Math.min(i, 8) * 0.05}s">
      ${card.image ? `<div class="card-item__image-wrap"><img class="card-item__image" src="${card.image}" alt="${card.name}" loading="lazy"></div>` : ''}
      <div class="card-item__body">
        ${SPEECH_SUPPORTED ? `<button class="card-item__speak" data-speak aria-label="Read effect aloud"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg></button>` : ''}
        <div class="card-item__name">${card.name}</div>
        ${card.nameJp ? `<div class="card-item__name-jp">${card.nameJp}</div>` : ''}
        ${card.grade ? `<span class="card-item__grade">${card.grade}</span>` : ''}
        <div class="card-item__effect">${card.effect || ''}</div>
      </div>
    </div>
  `;
}

function renderSearchResultItem(entry, i = 0) {
  const { deck, card } = entry;
  return `
    <button class="card-item search-result-item reveal" data-deck-id="${deck.id}" data-card-name="${card.name}" data-card-section="${card.section || ''}" style="transition-delay:${Math.min(i, 8) * 0.05}s">
      ${card.image ? `<div class="card-item__image-wrap"><img class="card-item__image" src="${card.image}" alt="${card.name}" loading="lazy"></div>` : ''}
      <div class="card-item__body">
        <span class="search-result-deck">${deck.name}</span>
        <div class="card-item__name">${card.name}</div>
        ${card.nameJp ? `<div class="card-item__name-jp">${card.nameJp}</div>` : ''}
        ${card.grade ? `<span class="card-item__grade">${card.grade}</span>` : ''}
        <div class="card-item__effect">${card.effect || ''}</div>
      </div>
    </button>
  `;
}

const SECTION_ORDER = ['Ride Line', 'Main Deck', 'Stride'];

let currentDeck = null;
let selectedSection = null;

function renderCardListForSection() {
  const list = document.getElementById('cardList');
  const cards = selectedSection
    ? currentDeck.cards.filter(c => c.section === selectedSection)
    : currentDeck.cards;
  list.innerHTML = `<div class="card-list">${cards.map(renderCardItem).join('')}</div>`;
  observeRevealAll(list);
  wireCardImageZoom(list);
  wireCardSpeak(list);
}

function renderSectionTabs(sections) {
  const container = document.getElementById('sectionTabs');

  if (!sections.length) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = sections.map(sectionName => `
    <button class="section-tab${sectionName === selectedSection ? ' is-active' : ''}" data-section="${sectionName}">${sectionName}</button>
  `).join('');

  container.querySelectorAll('.section-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedSection = btn.dataset.section;
      renderSectionTabs(sections);
      renderCardListForSection();
    });
  });
}

const DECK_ACCENTS = {
  'chronojet-deck': '#3b82f6',
  'nightrose-deck': '#2b3a8f',
  'heartluru-deck': '#db2777',
};

function showDeckDetail(deckId, opts = {}) {
  const deck = DECKS.find(d => d.id === deckId);
  if (!deck) return;

  currentDeck = deck;
  const detailView = document.getElementById('view-detail');
  const accent = DECK_ACCENTS[deck.id];
  if (accent) detailView.style.setProperty('--deck-accent', accent);
  else detailView.style.removeProperty('--deck-accent');

  document.getElementById('detailDeckName').textContent = deck.name;
  document.getElementById('detailDeckMeta').textContent = `${deck.clan ? deck.clan + ' · ' : ''}${deck.cards.length} cards`;
  renderDeckStats(deck);

  const hasSections = deck.cards.some(card => card.section);

  if (!hasSections) {
    selectedSection = null;
    renderSectionTabs([]);
    renderCardListForSection();
  } else {
    const sections = SECTION_ORDER.filter(name => deck.cards.some(c => c.section === name));
    deck.cards.forEach(c => {
      if (c.section && !sections.includes(c.section)) sections.push(c.section);
    });
    selectedSection = (opts.section && sections.includes(opts.section)) ? opts.section : sections[0];
    renderSectionTabs(sections);
    renderCardListForSection();
  }

  showView('detail');
  if (opts.highlightName) highlightCardByName(opts.highlightName);
}

const GRADE_ORDER = ['G0', 'G1', 'G2', 'G3', 'G (Stride/G unit)'];
const GRADE_LABELS = { 'G0': 'G0', 'G1': 'G1', 'G2': 'G2', 'G3': 'G3', 'G (Stride/G unit)': 'Stride' };
const GRADE_COLORS = { 'G0': '#ffd9b8', 'G1': '#ffb073', 'G2': '#ff8a3d', 'G3': '#ff5b1a', 'G (Stride/G unit)': '#b3390f' };

function renderDeckStats(deck) {
  const container = document.getElementById('deckStats');
  const counts = {};
  deck.cards.forEach(c => {
    const g = c.grade || 'Unknown';
    counts[g] = (counts[g] || 0) + 1;
  });
  const total = deck.cards.length;
  const grades = Object.keys(counts).sort((a, b) => {
    const ai = GRADE_ORDER.indexOf(a);
    const bi = GRADE_ORDER.indexOf(b);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  container.innerHTML = `
    <div class="deck-stats__bar">
      ${grades.map(g => `<span class="deck-stats__segment" style="flex:0 0 ${(counts[g] / total * 100).toFixed(2)}%; background:${GRADE_COLORS[g] || 'var(--text-muted)'}"></span>`).join('')}
    </div>
    <div class="deck-stats__legend">
      ${grades.map(g => `
        <span class="deck-stats__item">
          <span class="deck-stats__dot" style="background:${GRADE_COLORS[g] || 'var(--text-muted)'}"></span>
          ${GRADE_LABELS[g] || g} <strong>${counts[g]}</strong>
        </span>
      `).join('')}
    </div>
  `;
}

function highlightCardByName(name) {
  setTimeout(() => {
    const target = document.querySelector(`#cardList .card-item[data-card-name="${CSS.escape(name)}"]`);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    target.classList.add('is-highlighted');
    setTimeout(() => target.classList.remove('is-highlighted'), 1800);
  }, 80);
}

function renderCodex() {
  const container = document.getElementById('codexContent');
  if (container.dataset.rendered) return;

  let html = '';

  DECKS.forEach(deck => {
    const codexDeck = CODEX_DECKS[deck.id];
    if (!codexDeck) return;
    const accent = DECK_ACCENTS[deck.id] || '';
    const entries = deck.cards.map(card => {
      const text = codexDeck.cards[card.name];
      if (!text || !card.image) return '';
      return `
        <div class="codex-entry">
          <img class="codex-entry__image" src="${card.image}" alt="${card.name}" loading="lazy">
          <div class="codex-entry__body">
            <h4 class="codex-entry__name">${card.name}</h4>
            <p class="codex-entry__text">${text}</p>
          </div>
        </div>
      `;
    }).join('');
    html += `
      <section class="codex-group" ${accent ? `style="--deck-accent:${accent}"` : ''}>
        <h3 class="codex-group__title">${deck.name}</h3>
        <p class="codex-group__intro">${codexDeck.intro}</p>
        ${entries}
      </section>
    `;
  });

  const idleEntries = IDLE_CARDS.map(card => {
    const text = CODEX_IDLE[card.name];
    if (!text) return '';
    return `
      <div class="codex-entry">
        <img class="codex-entry__image" src="${card.image}" alt="${card.name}" loading="lazy">
        <div class="codex-entry__body">
          <h4 class="codex-entry__name">${card.name}</h4>
          <p class="codex-entry__text">${text}</p>
        </div>
      </div>
    `;
  }).join('');
  html += `
    <section class="codex-group">
      <h3 class="codex-group__title">Legends (Idle Screen)</h3>
      <p class="codex-group__intro">The cast that drifts across the wallpaper once the site's been quiet a while — icons from across the game, not from Wicil's own decks.</p>
      ${idleEntries}
    </section>
  `;

  container.innerHTML = html;
  container.dataset.rendered = 'true';
}

function renderStats() {
  document.getElementById('deckCount').textContent = DECKS.length;
  document.getElementById('cardCount').textContent = DECKS.reduce((sum, d) => sum + d.cards.length, 0);
}

function getShowcaseCards(deck) {
  const rideLine = deck.cards.filter(c => c.section === 'Ride Line');
  if (rideLine.length) return rideLine;
  return deck.cards.slice(0, 5);
}

const dailyFanObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('is-revealed', entry.isIntersecting);
  });
}, { threshold: 0.35 });

function renderDailyCardFan(deck) {
  const fan = document.getElementById('dailyCardFan');
  fan.classList.remove('is-revealed');
  const showcase = getShowcaseCards(deck);
  fan.innerHTML = showcase.map((card, i) => {
    if (!card.image) return '';
    const opacity = Math.max(0.08, 1 - i * 0.22).toFixed(2);
    return `<img class="daily-card__fan-item" src="${card.image}" alt="${card.name}" style="--target-opacity:${opacity}; z-index:${showcase.length - i}; transition-delay:${i * 90}ms;" loading="lazy">`;
  }).join('');
  dailyFanObserver.observe(fan);
}

function renderDailyCard() {
  const allCards = [];
  DECKS.forEach(deck => deck.cards.forEach(card => allCards.push({ deck, card })));
  if (!allCards.length) return;

  const pick = allCards[Math.floor(Math.random() * allCards.length)];
  const img = document.getElementById('dailyCardImage');
  const nameEl = document.getElementById('dailyCardName');
  const jpEl = document.getElementById('dailyCardJp');
  const deckEl = document.getElementById('dailyCardDeck');
  const btn = document.getElementById('dailyCardBtn');

  if (pick.card.image) img.src = pick.card.image;
  img.alt = pick.card.name;
  nameEl.textContent = pick.card.name;
  jpEl.textContent = pick.card.nameJp || '';
  jpEl.style.display = pick.card.nameJp ? '' : 'none';
  deckEl.textContent = pick.deck.name;

  const goToCard = () => showDeckDetail(pick.deck.id, { section: pick.card.section || null, highlightName: pick.card.name });
  img.onclick = goToCard;
  btn.onclick = goToCard;

  renderDailyCardFan(pick.deck);
}

/* ===== Lightbox ===== */
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt || '';
  lightbox.classList.add('is-open');
}
function closeLightbox() {
  lightbox.classList.remove('is-open');
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

function wireCardImageZoom(container) {
  container.querySelectorAll('.card-item__image-wrap img').forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(img.src, img.alt);
    });
  });
}

/* ===== Text-to-speech ===== */
let speakingBtn = null;

function stopSpeaking() {
  if (!SPEECH_SUPPORTED) return;
  window.speechSynthesis.cancel();
  if (speakingBtn) speakingBtn.classList.remove('is-speaking');
  speakingBtn = null;
}

function wireCardSpeak(container) {
  if (!SPEECH_SUPPORTED) return;
  container.querySelectorAll('[data-speak]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasSpeaking = btn === speakingBtn;
      stopSpeaking();
      if (wasSpeaking) return;

      const item = btn.closest('.card-item');
      const name = item.dataset.cardName;
      const effect = item.querySelector('.card-item__effect').textContent;
      const utter = new SpeechSynthesisUtterance(`${name}. ${effect}`);
      utter.rate = 0.95;
      utter.onend = utter.onerror = () => {
        btn.classList.remove('is-speaking');
        if (speakingBtn === btn) speakingBtn = null;
      };
      speakingBtn = btn;
      btn.classList.add('is-speaking');
      window.speechSynthesis.speak(utter);
    });
  });
}

/* ===== Search ===== */
function searchCards(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const matches = [];
  DECKS.forEach(deck => {
    deck.cards.forEach(card => {
      const nameMatch = card.name && card.name.toLowerCase().includes(q);
      const jpMatch = card.nameJp && card.nameJp.toLowerCase().includes(q);
      if (nameMatch || jpMatch) matches.push({ deck, card });
    });
  });
  return matches;
}

function renderSearch() {
  const input = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('searchResults');
  const empty = document.getElementById('searchEmpty');
  const query = input.value;

  if (!query.trim()) {
    resultsContainer.innerHTML = '';
    empty.querySelector('h3').textContent = 'Start typing to search';
    empty.querySelector('p').textContent = 'Search by English or Japanese card name.';
    empty.classList.add('is-visible');
    return;
  }

  const matches = searchCards(query);

  if (!matches.length) {
    resultsContainer.innerHTML = '';
    empty.querySelector('h3').textContent = 'No cards found';
    empty.querySelector('p').textContent = `No cards match "${query.trim()}".`;
    empty.classList.add('is-visible');
    return;
  }

  empty.classList.remove('is-visible');
  resultsContainer.innerHTML = matches.map(renderSearchResultItem).join('');
  observeRevealAll(resultsContainer);

  resultsContainer.querySelectorAll('.search-result-item').forEach(btn => {
    btn.addEventListener('click', () => {
      showDeckDetail(btn.dataset.deckId, {
        section: btn.dataset.cardSection || null,
        highlightName: btn.dataset.cardName,
      });
    });
  });
}

/* ===== Header quick-search overlay ===== */
const searchOverlay = document.getElementById('searchOverlay');
const overlaySearchInput = document.getElementById('overlaySearchInput');
const overlaySearchResults = document.getElementById('overlaySearchResults');
const headerSearchBtn = document.getElementById('headerSearchBtn');
const searchOverlayClose = document.getElementById('searchOverlayClose');

function renderOverlaySearch() {
  const query = overlaySearchInput.value;

  if (!query.trim()) {
    overlaySearchResults.innerHTML = `<div class="search-overlay__empty">Type a card name to start searching.</div>`;
    return;
  }

  const matches = searchCards(query).slice(0, 20);

  if (!matches.length) {
    overlaySearchResults.innerHTML = `<div class="search-overlay__empty">No cards match "${query.trim()}".</div>`;
    return;
  }

  overlaySearchResults.innerHTML = matches.map(({ deck, card }) => `
    <button class="search-overlay__item" data-deck-id="${deck.id}" data-card-name="${card.name}" data-card-section="${card.section || ''}">
      ${card.image ? `<img src="${card.image}" alt="${card.name}" loading="lazy">` : ''}
      <div class="search-overlay__item-info">
        <div class="search-overlay__item-name">${card.name}</div>
        <div class="search-overlay__item-deck">${deck.name}</div>
      </div>
    </button>
  `).join('');

  overlaySearchResults.querySelectorAll('.search-overlay__item').forEach(btn => {
    btn.addEventListener('click', () => {
      closeSearchOverlay();
      showDeckDetail(btn.dataset.deckId, {
        section: btn.dataset.cardSection || null,
        highlightName: btn.dataset.cardName,
      });
    });
  });
}

function openSearchOverlay() {
  searchOverlay.classList.add('is-open');
  renderOverlaySearch();
  setTimeout(() => overlaySearchInput.focus(), 150);
}
function closeSearchOverlay() {
  searchOverlay.classList.remove('is-open');
}

headerSearchBtn.addEventListener('click', openSearchOverlay);
searchOverlayClose.addEventListener('click', closeSearchOverlay);
searchOverlay.addEventListener('click', (e) => { if (e.target === searchOverlay) closeSearchOverlay(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearchOverlay(); });
overlaySearchInput.addEventListener('input', renderOverlaySearch);

document.addEventListener('keydown', (e) => {
  if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
  const active = document.activeElement;
  const tag = active ? active.tagName : '';
  const isEditable = tag === 'INPUT' || tag === 'TEXTAREA' || (active && active.isContentEditable);
  if (isEditable) return;
  e.preventDefault();
  if (searchOverlay.classList.contains('is-open')) {
    overlaySearchInput.focus();
  } else {
    openSearchOverlay();
  }
});

document.getElementById('searchInput').addEventListener('input', renderSearch);

/* ===== Dark theme toggle ===== */
const themeToggle = document.getElementById('themeToggle');
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.classList.toggle('is-active', theme === 'dark');
  themeToggle.setAttribute('aria-checked', theme === 'dark');
  try { localStorage.setItem('wiciltcg-theme', theme); } catch (e) {}
}
applyTheme(document.documentElement.getAttribute('data-theme') || 'light');
themeToggle.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});

/* ===== Onboarding tour ===== */
const TOUR_STEPS = [
  {
    title: 'Welcome to WicilTCG 👋',
    body: "This is Wicil's personal Cardfight!! Vanguard reference — every card here already has its skill translated into English.",
  },
  {
    target: '#headerSearchBtn',
    title: 'Search anything, fast',
    body: 'Tap here — or press "/" on a keyboard — to search every card by name, English or Japanese, without opening a deck first.',
  },
  {
    target: '#menuToggle',
    title: 'Everything else lives here',
    body: 'Decklist, Search, the Glossary, and the dark mode switch are all one tap away in this menu.',
  },
  {
    target: '.btn--primary[data-nav="decks"]',
    title: 'Browse the decks',
    body: "Every deck is grouped by nation, then by card — grade, skill text, all of it, right where you'd expect.",
  },
  {
    target: '#dailyCardImage',
    title: 'A random pull, every visit',
    body: 'This card changes every time you open the site — just for a bit of nostalgia.',
  },
  {
    title: "That's it!",
    body: 'Have fun digging through the collection. You can replay this tour anytime from the menu.',
  },
];

let tourStepIndex = 0;
let tourSpotlightEl = null;
const tourBackdrop = document.getElementById('tourBackdrop');
const tourTooltip = document.getElementById('tourTooltip');
const tourStepCount = document.getElementById('tourStepCount');
const tourTitle = document.getElementById('tourTitle');
const tourBody = document.getElementById('tourBody');
const tourNext = document.getElementById('tourNext');
const tourSkip = document.getElementById('tourSkip');
const replayTourBtn = document.getElementById('replayTourBtn');

function clearTourSpotlight() {
  if (tourSpotlightEl) {
    tourSpotlightEl.classList.remove('tour-spotlight');
    tourSpotlightEl = null;
  }
}

function positionTourTooltip(target) {
  if (!target) {
    tourTooltip.classList.add('tour-tooltip--center');
    return;
  }
  tourTooltip.classList.remove('tour-tooltip--center');
  const rect = target.getBoundingClientRect();
  const tw = tourTooltip.offsetWidth;
  const th = tourTooltip.offsetHeight;
  const margin = 16;
  let top = rect.bottom + margin;
  if (top + th > window.innerHeight - margin) {
    top = Math.max(margin, rect.top - th - margin);
  }
  let left = rect.left + rect.width / 2 - tw / 2;
  left = Math.max(margin, Math.min(left, window.innerWidth - tw - margin));
  tourTooltip.style.top = `${top}px`;
  tourTooltip.style.left = `${left}px`;
}

function showTourStep(index) {
  clearTourSpotlight();
  const step = TOUR_STEPS[index];
  tourStepIndex = index;

  tourStepCount.textContent = `Step ${index + 1} of ${TOUR_STEPS.length}`;
  tourTitle.textContent = step.title;
  tourBody.textContent = step.body;
  tourNext.innerHTML = index === TOUR_STEPS.length - 1 ? 'Done' : 'Next<span class="btn__arrow">→</span>';

  const target = step.target ? document.querySelector(step.target) : null;
  if (target) {
    target.classList.add('tour-spotlight');
    tourSpotlightEl = target;
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  positionTourTooltip(target);
  tourTooltip.classList.add('is-open');
}

function startTour() {
  closeDrawer();
  closeLightbox();
  closeSearchOverlay();
  showView('home');
  try { localStorage.setItem('wiciltcg-tour-seen', 'true'); } catch (e) {}
  tourBackdrop.classList.add('is-open');
  showTourStep(0);
}

function endTour() {
  clearTourSpotlight();
  tourBackdrop.classList.remove('is-open');
  tourTooltip.classList.remove('is-open');
}

tourNext.addEventListener('click', () => {
  if (tourStepIndex >= TOUR_STEPS.length - 1) {
    endTour();
  } else {
    showTourStep(tourStepIndex + 1);
  }
});
tourSkip.addEventListener('click', endTour);
tourBackdrop.addEventListener('click', endTour);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && tourBackdrop.classList.contains('is-open')) endTour();
});
replayTourBtn.addEventListener('click', startTour);

window.addEventListener('resize', () => {
  if (tourTooltip.classList.contains('is-open')) {
    const step = TOUR_STEPS[tourStepIndex];
    positionTourTooltip(step.target ? document.querySelector(step.target) : null);
  }
});

try {
  if (!localStorage.getItem('wiciltcg-tour-seen')) {
    setTimeout(startTour, 900);
  }
} catch (e) {}

/* ===== First-load splash ===== */
(function() {
  const splash = document.getElementById('splash');
  if (!splash) return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(() => splash.classList.add('is-hidden'), prefersReducedMotion ? 200 : 1700);
})();

/* ===== Ambient homepage particles ===== */
(function() {
  const container = document.getElementById('homeParticles');
  if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const count = 24;
  let html = '';
  for (let i = 0; i < count; i++) {
    const left = (Math.random() * 100).toFixed(1);
    const size = (2 + Math.random() * 3).toFixed(1);
    const duration = (10 + Math.random() * 14).toFixed(1);
    const delay = (Math.random() * -20).toFixed(1);
    const drift = Math.round(Math.random() * 60 - 30);
    html += `<span class="particle" style="left:${left}%; width:${size}px; height:${size}px; animation-duration:${duration}s; animation-delay:${delay}s; --drift:${drift}px;"></span>`;
  }
  container.innerHTML = html;
})();

const initialClans = getClans();
selectedClan = initialClans[0] || null;
renderClanTabs();
renderDeckGrid();
renderStats();
renderDailyCard();
observeRevealAll();

/* ===== PWA: service worker registration ===== */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

const heroCarousel = document.getElementById('heroCarousel');
if (heroCarousel) {
  const heroTrack = document.getElementById('heroTrack');
  const heroSlides = Array.from(heroTrack.children);
  const heroDotsContainer = document.getElementById('heroDots');

  let heroIndex = 0;
  let heroDragStartX = 0;
  let heroDragDeltaX = 0;
  let heroIsDragging = false;
  let heroWasDragged = false;

  function resetHeroCardScroll(card) {
    const back = card.querySelector('.flip-card__face--back');
    if (back) back.scrollTop = 0;
  }

  function unflipAllHeroCards() {
    document.querySelectorAll('[data-flip-card]').forEach(card => {
      card.classList.remove('is-flipped');
      resetHeroCardScroll(card);
    });
  }

  function updateHeroCarousel() {
    const viewport = heroCarousel.querySelector('.hero-carousel__viewport');
    const activeSlide = heroSlides[heroIndex];
    const offset = activeSlide.offsetLeft - (viewport.clientWidth - activeSlide.offsetWidth) / 2;
    heroTrack.style.transform = `translateX(${-offset}px)`;

    heroSlides.forEach((slide, i) => slide.classList.toggle('is-active', i === heroIndex));
    heroDotsContainer.querySelectorAll('.hero-carousel__dot').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === heroIndex);
    });
  }

  window.addEventListener('resize', updateHeroCarousel);

  function goToHeroSlide(i) {
    const clamped = Math.max(0, Math.min(heroSlides.length - 1, i));
    if (clamped === heroIndex) return;
    heroIndex = clamped;
    unflipAllHeroCards();
    updateHeroCarousel();
  }

  heroSlides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero-carousel__dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goToHeroSlide(i));
    heroDotsContainer.appendChild(dot);
  });

  heroCarousel.addEventListener('pointerdown', (e) => {
    heroIsDragging = true;
    heroWasDragged = false;
    heroDragStartX = e.clientX;
    heroDragDeltaX = 0;
  });
  heroCarousel.addEventListener('pointermove', (e) => {
    if (!heroIsDragging) return;
    heroDragDeltaX = e.clientX - heroDragStartX;
  });
  heroCarousel.addEventListener('pointerup', () => {
    if (!heroIsDragging) return;
    heroIsDragging = false;
    if (Math.abs(heroDragDeltaX) > 40) {
      heroWasDragged = true;
      goToHeroSlide(heroIndex + (heroDragDeltaX < 0 ? 1 : -1));
    }
  });
  heroCarousel.addEventListener('pointerleave', () => { heroIsDragging = false; });

  document.querySelectorAll('[data-flip-card]').forEach(card => {
    card.addEventListener('click', () => {
      if (heroWasDragged) { heroWasDragged = false; return; }
      const slide = card.closest('.hero-carousel__slide');
      const slideIndex = heroSlides.indexOf(slide);
      if (slideIndex !== heroIndex) {
        goToHeroSlide(slideIndex);
        return;
      }
      card.classList.toggle('is-flipped');
      if (!card.classList.contains('is-flipped')) resetHeroCardScroll(card);
    });
  });

  updateHeroCarousel();
}

/* ===== Idle wallpaper ===== */
const IDLE_CARDS = [
  { name: 'Blaster Dark', clan: 'Shadow Paladin', image: 'assets/idle/blaster-dark.webp', color: '#8b5cf6', bgDark: '#150a29' },
  { name: 'Silver Thorn Dragon Tamer, Luquier', clan: 'Pale Moon', image: 'assets/idle/luquier.webp', color: '#14b8a6', bgDark: '#041613' },
  { name: 'Pure Heart Jewel Knight, Ashlei', clan: 'Royal Paladin', image: 'assets/idle/ashlei.webp', color: '#38bdf8', bgDark: '#071a2b' },
  { name: 'Chronojet Dragon', clan: 'Gear Chronicle', image: 'assets/idle/chronojet-dragon.webp', color: '#3b82f6', bgDark: '#05122b' },
  { name: 'Masked Magician, Harri', clan: 'Pale Moon', image: 'assets/idle/harri.webp', color: '#a855f7', bgDark: '#1c0a2b' },
  { name: 'Blue Sky Knight, Altmile', clan: 'Royal Paladin', image: 'assets/idle/altmile.webp', color: '#06b6d4', bgDark: '#04191d' },
  { name: 'Ranunculus Flower Maiden, Ahsha', clan: 'Neo Nectar', image: 'assets/idle/ahsha.webp', color: '#22c55e', bgDark: '#06180d' },
  { name: 'Vampire Princess of Night Fog, Nightrose', clan: 'Granblue', image: 'assets/idle/nightrose.webp', color: '#2b3a8f', bgDark: '#0a0f24' },
  { name: 'Blaster Blade', clan: 'Royal Paladin', image: 'assets/idle/blaster-blade.webp', color: '#60a5fa', bgDark: '#0a1730' },
  { name: 'Dragonic Overlord', clan: 'Kagero', image: 'assets/idle/dragonic-overlord.png', color: '#ef4444', bgDark: '#240707' },
];

const IDLE_DELAY = 30000;
const IDLE_CARD_DURATION = 4000;

const idleOverlay = document.getElementById('idleOverlay');
const idleCardImage = document.getElementById('idleCardImage');
const idleCardName = document.getElementById('idleCardName');
const idleCardClan = document.getElementById('idleCardClan');

let idleTimer = null;
let idleCycleInterval = null;
let idleCardIndex = 0;

function showIdleCard(index, immediate) {
  const card = IDLE_CARDS[index];

  const swapIn = () => {
    idleCardImage.src = card.image;
    idleCardImage.alt = card.name;
    idleCardName.textContent = card.name;
    idleCardClan.textContent = card.clan;
    idleOverlay.style.setProperty('--idle-color', card.color);
    idleOverlay.style.setProperty('--idle-bg-dark', card.bgDark);
    // Double rAF: guarantees the browser commits the opacity:0 state
    // in one frame before the is-visible transition starts in the next.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => idleCardImage.classList.add('is-visible'));
    });
  };

  if (immediate) {
    // First card on entering idle: show it right away, no fade-out to wait on.
    swapIn();
  } else {
    // Cycling to the next card: wait for the current one to fully fade out,
    // then preload the next image so the src swap is instant (no pop/flash).
    idleCardImage.classList.remove('is-visible');
    setTimeout(() => {
      const preload = new Image();
      preload.onload = swapIn;
      preload.onerror = swapIn;
      preload.src = card.image;
    }, 700);
  }
}

function enterIdle() {
  clearInterval(idleCycleInterval);
  idleCardIndex = 0;
  showIdleCard(idleCardIndex, true);
  idleOverlay.classList.add('is-active');
  idleCycleInterval = setInterval(() => {
    idleCardIndex = (idleCardIndex + 1) % IDLE_CARDS.length;
    showIdleCard(idleCardIndex, false);
  }, IDLE_CARD_DURATION);
}

function exitIdle() {
  if (!idleOverlay.classList.contains('is-active')) return;
  idleOverlay.classList.remove('is-active');
  clearInterval(idleCycleInterval);
  resetIdleTimer();
}

function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(enterIdle, IDLE_DELAY);
}

['mousemove', 'mousedown', 'touchstart', 'keydown', 'scroll', 'wheel'].forEach(evt => {
  document.addEventListener(evt, () => {
    if (idleOverlay.classList.contains('is-active')) {
      exitIdle();
    } else {
      resetIdleTimer();
    }
  }, { passive: true });
});
resetIdleTimer();

/* ===== Skill match minigame ===== */
const MEMORY_PAIR_COUNT = 8;
let memoryState = { flipped: [], matchedCount: 0, moves: 0, locked: false };

function getAllCardsWithImages() {
  const all = [];
  DECKS.forEach(deck => deck.cards.forEach(card => { if (card.image) all.push(card); }));
  return all;
}

function getCardsForSkillGame() {
  return getAllCardsWithImages().filter(card =>
    card.grade !== 'G (Stride/G unit)' &&
    card.effect &&
    card.effect.length > 15 &&
    !card.effect.includes('Terjemahan belum ditemukan')
  );
}

function getEffectSnippet(effect) {
  const lines = effect.split('\n').map(l => l.trim()).filter(Boolean);
  const isGenericReminder = (l) => /^\(.*\)$/.test(l) || /^\[[^\]]+\]\s*\(.*\)$/.test(l);
  const abilityLine = lines.find(l => /\[(AUTO|CONT|ACT)\]/.test(l) || /Trigger:/.test(l));
  const candidate = abilityLine || lines.find(l => !isGenericReminder(l)) || lines[0] || '';
  const sentence = candidate.split(/(?<=[.!?])\s/)[0] || candidate;
  return sentence.length > 110 ? sentence.slice(0, 108) + '…' : sentence;
}

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startMemoryGame() {
  const pool = shuffleArray(getCardsForSkillGame()).slice(0, MEMORY_PAIR_COUNT);
  const tiles = [];
  pool.forEach((card, idx) => {
    tiles.push({ uid: idx * 2, name: card.name, type: 'image', image: card.image });
    tiles.push({ uid: idx * 2 + 1, name: card.name, type: 'effect', text: getEffectSnippet(card.effect) });
  });
  const shuffled = shuffleArray(tiles);

  memoryState = { flipped: [], matchedCount: 0, moves: 0, locked: false };
  document.getElementById('memoryWinMessage').classList.remove('is-visible');
  updateMemoryMoves();
  renderMemoryBoard(shuffled);
}

function renderMemoryBoard(tiles) {
  const grid = document.getElementById('memoryGrid');
  grid.innerHTML = tiles.map(tile => `
    <button class="memory-card" data-uid="${tile.uid}" data-name="${tile.name}">
      <div class="memory-card__inner">
        <div class="memory-card__face memory-card__face--front">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <polygon points="50,3 90,25 90,75 50,97 10,75 10,25" fill="none" stroke="var(--orange)" stroke-width="5"/>
            <text x="50" y="68" text-anchor="middle" font-family="'Russo One', Arial, sans-serif" font-size="46" fill="var(--orange)">W</text>
          </svg>
        </div>
        <div class="memory-card__face memory-card__face--back">
          ${tile.type === 'image'
            ? `<img src="${tile.image}" alt="${tile.name}" loading="lazy">`
            : `<p class="memory-card__effect-text">${tile.text}</p>`}
        </div>
      </div>
    </button>
  `).join('');
  grid.querySelectorAll('.memory-card').forEach(btn => btn.addEventListener('click', onMemoryCardClick));
}

function onMemoryCardClick(e) {
  const btn = e.currentTarget;
  if (memoryState.locked || btn.classList.contains('is-flipped') || btn.classList.contains('is-matched')) return;

  btn.classList.add('is-flipped');
  memoryState.flipped.push(btn);

  if (memoryState.flipped.length === 2) {
    memoryState.moves++;
    updateMemoryMoves();
    const [a, b] = memoryState.flipped;
    if (a.dataset.name === b.dataset.name) {
      a.classList.add('is-matched');
      b.classList.add('is-matched');
      memoryState.flipped = [];
      memoryState.matchedCount++;
      checkMemoryWin();
    } else {
      memoryState.locked = true;
      setTimeout(() => {
        a.classList.remove('is-flipped');
        b.classList.remove('is-flipped');
        memoryState.flipped = [];
        memoryState.locked = false;
      }, 900);
    }
  }
}

function updateMemoryMoves() {
  document.getElementById('memoryMoves').textContent = memoryState.moves;
}

function checkMemoryWin() {
  if (memoryState.matchedCount === MEMORY_PAIR_COUNT) {
    document.getElementById('memoryFinalMoves').textContent = memoryState.moves;
    document.getElementById('memoryWinMessage').classList.add('is-visible');
  }
}

document.getElementById('memoryRestart').addEventListener('click', startMemoryGame);
document.getElementById('memoryPlayAgain').addEventListener('click', startMemoryGame);
